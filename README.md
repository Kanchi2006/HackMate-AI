# HackMate AI — Discover. Build. Compete.

HackMate AI helps builders explore hackathons listed by Devpost and Unstop,
and search the web for additional opportunities. Web search results link to
their original sources and are not presented as verified event listings.

## Routes

- `/` — public landing page and user-initiated web search.
- `/explore` — existing Devpost and Unstop listings with search, filters, and sorting.
- `/login` and `/signup` — Google and GitHub OAuth entry points.
- `POST /api/serpapi` — server-side Google Search through SerpApi.
- `/api/hackathons` — existing platform-feed endpoint.

## Local development

1. Install dependencies with `npm install`.
2. Copy the safe variable names and placeholders from `.env.example` to
   `.env.local`. Replace placeholders locally; never commit `.env.local`.
3. Start Next.js on the OAuth callback port:

   ```sh
   npm run dev -- --port 3001
   ```

4. Register these callback URLs in the OAuth applications:

   - Google: `http://localhost:3001/api/auth/callback/google`
   - GitHub: `http://localhost:3001/api/auth/callback/github`

Auth.js uses JWT-backed sessions and does not require a database. Google and
GitHub client IDs, client secrets, and `AUTH_SECRET` are required for OAuth.
`SERPAPI_API_KEY` is required for web search. All secrets must remain
server-side.
