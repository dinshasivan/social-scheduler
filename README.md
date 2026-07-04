# Social Scheduler

A full-stack social media scheduling SaaS application. Connect your social accounts, compose posts with AI assistance, schedule them across platforms, and track activity — all from one dashboard.

## ✨ Features

- **Multi-platform account connections** — OAuth-based linking to Twitter, LinkedIn, Facebook, and Instagram via [Zernio](https://zernio.com)
- **Post scheduling** — compose posts manually or generate them with AI, schedule for a future date/time, with optional image/video attachments
- **Automatic publishing** — a background job checks for due posts every minute and publishes them via Zernio
- **AI Composer** — generate post content and (optionally) AI images from a prompt and tone, then schedule directly from a generation
- **Dashboard** — at-a-glance stats (scheduled/published posts, connected accounts) and a recent activity feed
- **In-app notifications** — publish success/failure alerts via a notification bell
- **Secure logout flow** — confirms logout and offers to disconnect all social accounts at the same time

## 🛠 Tech Stack

**Frontend**
- React + TypeScript (Vite)
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT authentication (with `bcrypt` password hashing)
- `node-cron` for scheduled post publishing
- [Zernio SDK](https://zernio.com) for social platform OAuth and publishing

## Project Structure

```
.
├── client/     # React + Vite app
└── server/      # Express API + cron jobs
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB instance)
- A [Zernio](https://zernio.com) account and API key

### 1. Clone the repo

```bash
git clone git@github.com:dinshasivan/social-scheduler.git
cd social-scheduler
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ZERNIO_API_KEY=your_zernio_api_key
```


Run the backend in dev mode:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd client
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend in dev mode:

```bash
npm run dev
```

## 🚀 Deployment

This project deploys as two separate services from one repo:

| Service | Platform | Root Directory |
|---|---|---|
| Frontend | Vercel / Netlify | `client` |
| Backend | Render (or similar) | `server` |
| Database | MongoDB Atlas | — |



