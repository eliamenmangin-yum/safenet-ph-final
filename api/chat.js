// FILE: api/chat.js — place at PROJECT ROOT /api/chat.js
// Vercel serverless function: Groq AI + Supabase logging
//
// Env vars to add in Vercel Dashboard → Settings → Env Variables:
//   GROQ_API_KEY
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import { createClient } from '@supabase/supabase-js';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL   = 'llama-3.3-70b-versatile';

function buildSystemPrompt(lang, mode) {
  const langInstr = lang === 'fil'
    ? `
LANGUAGE RULES (SUNDIN ITO PALAGI):
- Sumagot sa natural na Filipino na ginagamit ng mga totoong Pilipino sa araw-araw.
- Huwag mag-translate ng salita sa salita mula sa Ingles — magsulat nang natural, parang nakikipag-usap ka sa isang kaibigan o kamag-anak.
- Huwag gumamit ng malalim o pormal na Filipino na hindi ginagamit sa totoong buhay.
- Panatilihin ang mga karaniwang tech na salita sa Ingles: "online", "chat", "account", "password", "settings", "screenshot", "block", "report". Huwag puwersahang i-translate ito.
- Gumamit ng "po/opo" kapag kausap ang magulang o guro. Sa bata, gamitin ang mas relaxed na tono.
- MALI: "Kontrola ang inyong mga karapatan sa pagbabahagi ng impormasyon sa digital na espasyo."
- TAMA: "I-check ang iyong privacy settings para hindi makita ng lahat ang iyong profile."
`
    : lang === 'bis'
    ? `
LANGUAGE RULES (SUNDON KINI KANUNAY):
- Sumagbag sa natural nga Bisaya/Cebuano nga gigamit sa mga ordinaryong Pilipino sa adlaw-adlaw — dili ang formal o literary nga Bisaya.
- Ayaw i-translate sa literal gikan sa Ingles. Isulat nga natural, sama og makigsulti ka sa usa ka silingan o paryente.
- Ayaw gamiton ug malalim o arkaykong Bisaya. Gamiton ang pulong nga bata ang nasayod.
- Padayon gamiton ang kasagarang tech nga pulong sa Ingles: "online", "chat", "account", "password", "settings", "screenshot", "block", "report". Ayaw puwersahon og translate.
- Gamiton ang "po/opo" o "sir/ma'am" kung makigsulti sa ginikanan o magtutudlo. Sa bata, gamiton ang mas relax ug friendly nga tono.
- SAYOP: "Kontrola ang imong mga katungod sa pagpaambit sa impormasyon sa digital nga espasyo."
- HUSTO: "I-check ang imong privacy settings para dili makita sa tanan ang imong profile."
- SAYOP: "Ang pagdumala sa imong digital nga presensya..."
- HUSTO: "Buhata kini para luwas ka online..."
`
    : `Respond in clear, simple English. Use everyday words — avoid legal or academic language.`;

  const toneInstr = `
TONE & LENGTH RULES:
- Keep replies SHORT. 3 to 5 sentences for simple questions. Never write a long essay unless the user specifically asks for more detail.
- Use numbered steps ONLY when giving actual step-by-step instructions. Otherwise write in normal sentences.
- Do not bullet-point everything — it feels robotic and cold.
- Be warm and friendly, not stiff or formal.
- End with one short follow-up offer if helpful, but keep it brief.
`;

  const modeCtx = {
    child:     'You are speaking to a CHILD or TEEN. Use simple, kind words. Never shame them. Reassure them that they are safe and can always ask a trusted adult for help.',
    parent:    'You are speaking to a PARENT or GUARDIAN. Give practical advice they can act on right away. Mention Philippine resources when relevant: MAKABATA 1383, PNP-ACG #0998-598-8102, RA 9775, RA 10175.',
    teacher:   'You are speaking to a TEACHER or EDUCATOR. Provide DepEd K-12 aligned lesson ideas, classroom activities, and age-appropriate internet safety guides.',
    emergency: 'EMERGENCY MODE. Stay calm and direct. ALWAYS include these hotlines early in your reply: PNP-ACG #0998-598-8102 | MAKABATA 1383 | DSWD 0931-755-3702. User safety comes first.',
  };

  return `You are SafeNet PH Bot, the child online safety assistant of SafeNet PH — an academic IT case study by North Eastern Mindanao State University (NEMSU).

${modeCtx[mode] ?? modeCtx['child']}
${langInstr}
${toneInstr}

You can help with: online grooming, cyberbullying, phishing, sextortion, app safety (TikTok, Facebook, Roblox, Discord), privacy settings, Philippine laws (RA 11930, RA 10173, RA 9775, RA 10175), and emergency escalation.

Rules:
- Never blame the victim
- Cite specific Philippine laws only when directly relevant
- If someone is in immediate danger, lead with hotline numbers first
- Only answer online safety topics — redirect anything unrelated`.trim();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { messages, mode, lang, sessionId } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages[] is required' });
  }

  const userMessage = messages[messages.length - 1]?.content ?? '';

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model:       GROQ_MODEL,
        max_tokens:  400,
        temperature: 0.6,
        messages: [
          { role: 'system', content: buildSystemPrompt(lang ?? 'en', mode ?? 'child') },
          ...messages,
        ],
      }),
    });

    if (!groqRes.ok) {
      const groqErr = await groqRes.json();
      throw new Error(groqErr?.error?.message ?? 'Groq API error');
    }

    const groqData   = await groqRes.json();
    const reply      = groqData.choices?.[0]?.message?.content ?? 'Sorry, I could not get a response.';
    const tokensUsed = groqData.usage?.total_tokens ?? 0;

    // Log to Supabase
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        await supabase.from('chat_logs').insert({
          session_id:   sessionId ?? 'anonymous',
          mode:         mode      ?? 'child',
          lang:         lang      ?? 'en',
          user_message: userMessage,
          bot_reply:    reply,
          tokens_used:  tokensUsed,
          model:        GROQ_MODEL,
          created_at:   new Date().toISOString(),
        });
      } catch (logErr) {
        console.warn('[Supabase log error]', logErr.message);
      }
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[SafeNet API error]', err.message);
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}