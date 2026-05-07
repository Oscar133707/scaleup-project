<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1_Pw8gNLk2TkVE68mzYdmYSoG56w4qct2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (optional).
3. Run the app:
   `npm run dev`

## Growth Assessment & Supabase

The app includes a **multi-step business assessment** with login/signup and persistence in Supabase.

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and **anon public** key.
3. Create a `.env` file in the project root (see `.env.example`):
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. In the Supabase **SQL Editor**, run the migration:
   - Open `supabase/migrations/001_initial.sql` and execute its contents.
   This creates the `assessments` and `assessment_responses` tables.
5. In **Authentication → Providers**, enable **Email** and, if you prefer no confirmation during development, turn off "Confirm email".

### Flow

- **Log in / Sign up:** Name + email + password; account is stored in Supabase Auth.
- **Assessment:** After login, choose business type (New / Established), then complete 11 assessment areas. Responses are auto-saved to Supabase and persisted in `localStorage` for recovery.
- **Results:** A dashboard with a readiness radar chart, 3-year vision goals, and top priority areas.

## Deploy to Vercel

1. Push your code to GitHub (e.g. `Oscar133707/scaleup-project`).
2. Go to [vercel.com](https://vercel.com) and sign in (or use **Continue with GitHub**).
3. Click **Add New…** → **Project** and **Import** your GitHub repository.
4. Vercel will detect the Vite app. Keep:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key  
   (Same values as in your local `.env`.)
6. Click **Deploy**. Your site will be live at `https://your-project.vercel.app`.

Later: push to `main` to trigger automatic redeploys.
