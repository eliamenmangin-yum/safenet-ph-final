# SafeNet PH
**Children's Online Safety Platform — NEMSU Academic Research Project**

---

## 🚀 Full Deployment Guide

You need 4 free accounts: **GitHub**, **Groq**, **Supabase**, **Vercel**

---

### STEP 1 — Get your FREE Groq API Key
1. Go to https://console.groq.com
2. Sign up / log in with Google
3. Click **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_`)

---

### STEP 2 — Set up Supabase (for chat logging)
1. Go to https://supabase.com → **New Project**
2. Name it `safenet-ph`, choose a password, pick a region
3. Wait for it to start (~1 min)
4. Go to **SQL Editor** → paste the contents of `supabase-setup.sql` → click **Run**
5. Go to **Settings → API** and copy:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **service_role** secret key (under "Project API keys")

---

### STEP 3 — Push to GitHub
1. Go to https://github.com → **New Repository**
2. Name it `safenet-ph`, set it to **Public**, click **Create**
3. Upload all files from this folder to the repo
   - Easiest: click **uploading an existing file** and drag the whole folder

---

### STEP 4 — Deploy on Vercel
1. Go to https://vercel.com → **Add New Project**
2. Click **Import** next to your `safenet-ph` GitHub repo
3. Before clicking Deploy, click **Environment Variables** and add all 3:

   | Name | Value |
   |------|-------|
   | `GROQ_API_KEY` | your key from Step 1 |
   | `SUPABASE_URL` | your URL from Step 2 |
   | `SUPABASE_SERVICE_ROLE_KEY` | your service key from Step 2 |

4. Click **Deploy** — wait ~2 minutes
5. Your site is live! ✅

---

### ✅ How to verify the chatbot works
1. Open your Vercel URL
2. Click the **SafeNet Bot** button (bottom right)
3. Select a mode (Parent / Child / Teacher)
4. Send a message — you should get a reply within 2–3 seconds
5. In Supabase → **Table Editor** → `chat_logs` — you should see the logged conversation

---

### 💻 Local Development
```bash
npm install
npx vercel dev
```
Then open http://localhost:3000
(You need the Vercel CLI: `npm i -g vercel`, then `vercel login`)

---

### 🔧 Troubleshooting
| Problem | Fix |
|---------|-----|
| Chatbot says "Could not connect" | Check GROQ_API_KEY is correct in Vercel env vars |
| Chat logs not showing in Supabase | Run the SQL in `supabase-setup.sql` |
| Build fails on Vercel | Check the build log; usually a missing import |
| Page shows 404 on refresh | `vercel.json` rewrites handle this — make sure it's in the root |
