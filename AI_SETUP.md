# AI Features Setup Guide

This LMS application now includes AI-powered features using Google Gemini (free tier).

## Features Included

1. **AI Course Recommendations** - Personalized course suggestions based on user interests
2. **AI Learning Assistant Chatbot** - Interactive chatbot to help students with course questions
3. **AI Course Description Generator** - Auto-generate course descriptions for admins
4. **AI Quiz Generator** - Generate quiz questions for any topic (API ready)

## Setup Instructions

### 1. Get Google Gemini API Key (FREE)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Add API Key to Environment Variables

Create or update `.env` file in the `server` directory:

```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Install Dependencies

The package is already installed, but if needed:

```bash
cd server
npm install @google/generative-ai
```

### 4. Restart Server

```bash
npm run dev
```

## Usage

### For Students

1. **AI Recommendations**: Click "AI Recommendations" in the navbar
   - Enter your interests (e.g., "Web Development, Data Science")
   - Get personalized course suggestions

2. **AI Chatbot**: 
   - Visit any course detail page
   - Click the floating AI button (bottom right)
   - Ask questions about the course

### For Admins

1. **Generate Course Description**:
   - Go to "Create Course" page
   - Enter course title and category
   - Click "Generate AI Description"
   - Check console for generated content

## API Endpoints

All endpoints require authentication:

- `POST /api/v1/ai/recommendations` - Get course recommendations
- `POST /api/v1/ai/chat` - Chat with AI assistant
- `POST /api/v1/ai/generate-description` - Generate course description
- `POST /api/v1/ai/generate-quiz` - Generate quiz questions

## Free Tier Limits

Google Gemini free tier includes:
- 60 requests per minute
- 1,500 requests per day
- Sufficient for development and small-scale production

## Troubleshooting

If AI features don't work:
1. Check that `GEMINI_API_KEY` is set in `.env`
2. Verify the API key is valid
3. Check server console for error messages
4. Ensure you're authenticated (all AI routes require login)

## Notes

- All AI features use the free Gemini Pro model
- Responses are generated in real-time
- No data is stored by Google (privacy-friendly)
- All features work offline once API key is configured

