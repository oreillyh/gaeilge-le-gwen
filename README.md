# Gaeilge le Gwen

An Irish language learning application powered by AI.

## About

Gaeilge le Gwen is an interactive platform for learning Irish (Gaeilge), combining structured lessons with AI-powered conversational practice using OpenAI's GPT models.

## Site Structure

The application consists of three main sections:

### 1. Topicí (Topics)
Browse and study Irish language topics organized by theme and difficulty level:
- Vocabulary lessons by category
- Grammar concepts and rules
- Common phrases and expressions
- Interactive exercises and quizzes
- AI-powered conversation practice on each topic

### 2. Aiseanna (Lessons/Resources)
Structured learning resources and tools:
- Guided lesson plans
- Progressive learning paths
- Practice exercises
- Pronunciation guides
- Cultural context and background
- Progress tracking and achievements

### 3. Teagmháil (Contact)
Get in touch and manage your learning:
- Contact details
- User profile settings
- Support and feedback
- Learning preferences
- Account management

## Tech Stack

- **Frontend**: React
- **Backend**: Python (Flask/FastAPI)
- **AI**: OpenAI API for conversational practice and personalized learning
- **Language**: Irish (Gaeilge) with English translations

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Gaeilge Tutor"
```

2. Set up the backend:
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your OPENAI_API_KEY to .env
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

### Running the Application

Start the backend server:
```bash
cd backend
python app.py
```

Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Features

- 🗣️ **AI Conversation Practice**: Chat with an AI tutor in Irish
- 📚 **Structured Topics**: Learn vocabulary and grammar by theme
- 🎯 **Progressive Learning**: Track your progress through lessons
- 🔊 **Pronunciation Help**: Get feedback on Irish pronunciation
- 🌍 **Cultural Context**: Learn about Irish culture alongside the language
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Development Status

This project is in early development. Core features are being implemented.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

[Add your license here]

## Contact

For questions or feedback, use the Teagmháil (Contact) section of the application.

---

**Go n-éirí an t-ádh leat!** (Good luck with your learning!)
