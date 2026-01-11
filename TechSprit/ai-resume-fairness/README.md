# AI Resume Fairness System

A Cryptographically Verified AI Resume Fairness System that ensures fair and transparent AI-driven resume evaluations.

## 🚀 Features

1. **Firebase Authentication** - Secure user login/signup
2. **Resume Upload** - Upload PDF/DOC resumes
3. **SHA-256 Hashing** - Cryptographic hash for privacy
4. **OpenRouter AI Evaluation** - LLM-based resume analysis
5. **Fairness Verification** - Bias detection system
6. **Public Hash Verification** - Verify inclusion in audits

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
cd ai-resume-fairness

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies  
cd ../server
npm install
```

### 2. Configure Environment

The `.env` file in the server folder is already configured with your API keys.

### 3. Start the Application

**Option 1: Run both frontend and backend (from root folder)**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

## 🔗 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/models` | GET | Get all AI models |
| `/api/resume/upload` | POST | Upload & evaluate resume |
| `/api/verify` | POST | Verify hash inclusion |
| `/api/resume/history/:userId` | GET | Get user's history |

## 🔐 Workflow

1. **User Authentication** → Firebase Auth
2. **Resume Upload** → PDF/DOC files
3. **Hash Generation** → SHA-256 cryptographic hash
4. **AI Evaluation** → OpenRouter LLM analysis
5. **Fairness Check** → Bias detection
6. **Status Mapping**:
   - 🟢 Verified = Fair
   - 🔴 Biased = Unfair  
   - 🟡 Under Review = Pending

## 📁 Project Structure

```
ai-resume-fairness/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── config/        # Firebase config
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Login, Register, Dashboard
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js Backend
│   ├── uploads/           # Uploaded files
│   ├── index.js           # Express server
│   ├── .env               # Environment variables
│   └── package.json
└── package.json           # Root package.json
```

## 🔑 Environment Variables

Server `.env` (for local development):
```
PORT=5000
OPENROUTER_API_KEY=your_openrouter_key
FIREBASE_PROJECT_ID=cit-chennai
```

## 🚀 Vercel Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `TechSprit/ai-resume-fairness` (if not in root)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/build`

### 3. Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value | Description |
|----------|-------|-------------|
| `OPENROUTER_API_KEY` | `sk-or-...` | Your OpenRouter API key |

### 4. Redeploy

After adding environment variables, trigger a new deployment.

### Vercel Project Structure

```
ai-resume-fairness/
├── api/                    # Vercel Serverless Functions
│   ├── health.js          # Health check endpoint
│   ├── models.js          # AI models endpoint
│   ├── verify.js          # Hash verification
│   └── resume/
│       ├── upload.js      # Resume upload & evaluation
│       └── history/
│           └── [userId].js # User history (dynamic route)
├── client/                 # React Frontend
├── vercel.json            # Vercel configuration
└── package.json
```

## 📝 License

MIT License
