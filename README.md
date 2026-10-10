# 🚀 HackMate AI — AI-Powered Hackathon Discovery & Strategy Platform

<p align="center">
  <strong>Discover opportunities. Build smarter. Compete strategically.</strong>
</p>

<p align="center">
  <a href="https://hackmate-ai-two.vercel.app/">🌐 Live Demo</a> •
  <a href="https://github.com/kamakshi232006/HackMate_AI">📂 GitHub Repository</a>
</p>

---

## 📌 Overview

**HackMate AI** is an AI-powered hackathon discovery and competition strategy platform designed to help developers and aspiring innovators discover relevant hackathons, explore project ideas, and organize their participation more effectively.

The platform combines live search capabilities with AI-assisted planning to help participants identify opportunities aligned with their technical skills, interests, and career goals.

Instead of manually searching across multiple platforms, users can explore hackathon opportunities and organize their competition journey through a centralized interface.

## 🌐 Live Deployment

**Live Website:** https://hackmate-ai-two.vercel.app/

**Source Code:** https://github.com/kamakshi232006/HackMate_AI

The application is deployed on Vercel. Availability of live search and authentication features depends on the configuration of the required API credentials and external services.

## ✨ Key Features

### 🔍 Hackathon Discovery
- Search and discover hackathons using live search capabilities powered by SerpApi.
- Explore opportunities based on relevant interests and technical skills.
- View available hackathon information retrieved from supported sources.

### 🤖 AI-Assisted Project Ideas
- Explore project concepts aligned with technical interests.
- Use AI-assisted ideation to identify potential solutions and development directions.
- Support early-stage brainstorming for hackathons and innovation challenges.

### 🎯 Personalized Competition Strategy
- Organize hackathon opportunities around individual skills and goals.
- Explore potential team compatibility and competition preparation strategies.
- Plan participation more systematically.

### 📋 Personal Workspace
- **My Plan:** Organize competition preparation.
- **Saved:** Keep track of selected opportunities.
- **Profile:** Manage profile and skill-related information.

### ⚡ Live Search Visibility
- Display search activity and results as opportunities are retrieved.
- Connect discovery workflows with external search capabilities.

> Feature availability may depend on the current deployment configuration and connected services.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Application framework |
| React 19 | User interface |
| TypeScript | Type-safe development |
| Auth.js v5 | Authentication |
| SerpApi | Web search and hackathon discovery |
| Google OAuth | Google sign-in |
| GitHub OAuth | GitHub sign-in |
| Vercel | Application deployment |
| Gemini API (optional) | AI-assisted capabilities, where configured |

## 🏗️ Application Architecture

HackMate AI follows a web application architecture that combines the frontend, server-side application logic, authentication, and external API integrations.

1. **Frontend:** Displays the dashboard, discovery interface, project ideas, saved items, and profile.
2. **Application layer:** Processes application requests and coordinates the available features.
3. **Search integration:** Uses SerpApi to retrieve relevant information from supported search sources.
4. **AI integration:** Connects to the configured AI service for supported AI-assisted workflows.
5. **Authentication:** Uses Auth.js with configured OAuth providers.
6. **Deployment:** Hosts the application on Vercel.

## ⚙️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js compatible with the project dependencies
- npm
- Git
- A SerpApi API key
- OAuth credentials for Google and/or GitHub sign-in
- A Gemini API key if the relevant AI features are enabled

### 1. Clone the repository

```bash
git clone https://github.com/kamakshi232006/HackMate_AI.git
```

### 2. Navigate to the project directory

```bash
cd HackMate_AI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root.

```env
AUTH_SECRET=your_generated_auth_secret

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

SERPAPI_API_KEY=your_serpapi_api_key

GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder values with your own credentials. The Gemini variable is optional if your configuration does not use it.

Generate a secure authentication secret using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Security:** Never commit `.env.local`, OAuth client secrets, API keys, or production authentication secrets to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open the following URL in your browser:

```text
http://localhost:3000
```

## 🔐 OAuth Configuration

Configure OAuth credentials in the respective developer consoles.

### Google OAuth

In Google Cloud Console, configure the following authorized redirect URI for local development:

```text
http://localhost:3000/api/auth/callback/google
```

For production, use:

```text
https://hackmate-ai-two.vercel.app/api/auth/callback/google
```

### GitHub OAuth

Configure the following callback URL in your GitHub OAuth App:

```text
http://localhost:3000/api/auth/callback/github
```

For production, use:

```text
https://hackmate-ai-two.vercel.app/api/auth/callback/github
```

The registered callback URLs must match the application URLs exactly. Set the required environment variables separately in the Vercel project settings for production deployment.

## 🚢 Deployment

HackMate AI is deployed using Vercel.

To deploy your own instance:

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Configure the required environment variables in the project settings.
4. Configure production OAuth callback URLs for the assigned domain.
5. Deploy the application and test the required features.

**Production URL:** https://hackmate-ai-two.vercel.app/

## 🔮 Future Enhancements

Potential improvements include:

- Advanced hackathon filtering and personalized recommendations.
- Smarter team formation based on complementary skills.
- AI-assisted project planning and development roadmaps.
- Deadline reminders and competition notifications.
- Enhanced opportunity tracking and analytics.
- Expanded integrations with hackathon platforms and event providers.

## 🎯 Project Goal

HackMate AI aims to simplify hackathon discovery and preparation by bringing search, AI-assisted ideation, and competition planning into one platform.

The goal is to help developers spend less time finding opportunities and more time building meaningful projects.

## 👩‍💻 Author

**Kamakshi C**

GitHub: [@kamakshi232006](https://github.com/kamakshi232006)

Project: [HackMate AI](https://github.com/kamakshi232006/HackMate_AI)

---

<p align="center">
  <strong>Built to help innovators discover, plan, and compete smarter. 🚀</strong>
</p>
