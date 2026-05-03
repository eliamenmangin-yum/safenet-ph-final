// FILE: api/chat.ts — place at PROJECT ROOT /api/chat.ts
// Vercel serverless function: Groq AI + Supabase logging
//
// Env vars to add in Vercel Dashboard → Settings → Env Variables:
//   GROQ_API_KEY
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL   = "llama-3.3-70b-versatile";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function buildSystemPrompt(lang: string, mode: string): string {
  const langInstr =
    lang === "fil"
      ? "LANGUAGE RULES (SUNDIN ITO PALAGI):\n- Sumagot sa natural na Filipino na ginagamit ng mga totoong Pilipino sa araw-araw.\n- Huwag mag-translate ng salita sa salita mula sa Ingles — magsulat nang natural, parang nakikipag-usap ka sa isang kaibigan.\n- Huwag gumamit ng malalim o pormal na Filipino na hindi ginagamit sa totoong buhay.\n- Panatilihin ang mga karaniwang tech na salita sa Ingles: 'online', 'chat', 'account', 'password', 'settings', 'screenshot'.\n- Gumamit ng 'po/opo' kapag kausap ang magulang o guro. Sa bata, gamitin ang mas relaxed na tono.\n- MALI: 'Kontrola ang inyong karapatan sa pagbabahagi ng impormasyon sa digital na espasyo.'\n- TAMA: 'I-check ninyo kung sino ang nakakakita ng posts ng inyong anak sa settings.'"
      : "Respond in clear, simple English. Avoid jargon.";

  return `You are SafeNet PH Bot — the official AI safety assistant of SafeNet PH, an academic IT case study by North Eastern Mindanao State University (NEMSU). You help Filipino children, parents, and teachers with online safety.

${langInstr}

MODE: ${mode || "general"}

CORE RULES:
- Keep answers SHORT: 3–6 sentences max
- Be warm, calm, non-judgmental, supportive
- Give PRACTICAL steps, not lectures
- Never scare the user

APP SAFETY (when asked about an app):
- Risk level: LOW / MEDIUM / HIGH for children
- 2–3 specific risks
- 2–3 privacy settings to configure

PHILIPPINE LAWS (simple terms only):
- RA 11930 (2022): Anti-OSAEC — criminalizes online grooming, livestreamed abuse, sextortion
- RA 10173: Data Privacy Act — protects Filipinos' personal data including children
- RA 9775: Anti-Child Pornography Act
- RA 10175: Cybercrime Prevention Act

EMERGENCY RULE (HIGHEST PRIORITY):
If user mentions abuse, exploitation, threats, blackmail, or a child in danger, IMMEDIATELY respond with:
"Humingi ng tulong agad / Seek help immediately:
• PNP Anti-Cybercrime Group: #777
• MAKABATA Helpline: 1383
• PICACC: https://picacc.gov.ph
• DSWD: 931-8101"
Then give 1–2 calm next steps.

NEVER: invent statistics, give legal advice, write long essays.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, mode, lang, sessionId } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    // 1. Call Groq AI
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: buildSystemPrompt(lang || 'en', mode || 'general') },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error('Groq error:', err);
      return res.status(500).json({ error: 'AI service error' });
    }

    const groqData = await groqRes.json();
    const reply = groqData.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    // 2. Log to Supabase (optional — if table doesn't exist, it just skips)
    try {
      await supabase.from('chat_logs').insert({
        session_id: sessionId || 'anonymous',
        mode: mode || 'general',
        lang: lang || 'en',
        user_message: messages[messages.length - 1]?.content || '',
        bot_reply: reply,
        created_at: new Date().toISOString(),
      });
    } catch (logErr) {
      // Logging is optional — don't fail the request if Supabase is not set up
      console.warn('Supabase logging skipped:', logErr);
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
