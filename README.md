# Team Horizon

# *Trust Me Bro 😎*
***********************************************************************************************************************


## 🚀 Features

1. **Firebase Authentication** - Secure user login/signup
2. **Resume Upload** - Upload PDF/DOC resumes
3. **SHA-256 Hashing** - Cryptographic hash for privacy
4. **OpenRouter AI Evaluation** - LLM-based resume analysis
5. **Fairness Verification** - Bias detection system
6. **Public Hash Verification** - Verify inclusion in audits

## 📋 Prerequisites

- Node.js 
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

Server `.env`:
```
PORT=5000
OPENROUTER_API_KEY=your_openrouter_key
FIREBASE_PROJECT_ID=cit-chennai
```

## 📝 License

MIT License
