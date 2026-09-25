# Gaeilge le Gwen

An Irish language learning application with AI-assisted content authoring.

## About

Gaeilge le Gwen is an interactive platform for learning Irish (Gaeilge) through structured topics and lessons.

AI is used only behind the scenes: administrators use Anthropic's Claude models to draft and refine course content, which is reviewed before publication. Learners do not interact with the LLM; everything they see is pre-authored content.

## Site Structure

The application consists of three main sections:

### 1. Topicí (Topics)
Browse and study Irish language topics organized by theme and difficulty level:
- Vocabulary lessons by category
- Grammar concepts and rules
- Common phrases and expressions
- Interactive exercises and quizzes

### 2. Aiseanna (Lessons/Resources)
Structured learning resources and tools:
- Guided lesson plans
- Progressive learning paths
- Practice exercises
- Pronunciation guides
- Cultural context and background

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
- **AI**: Anthropic Claude API (Claude Opus 5 by default), used only in the admin panel and content generation scripts for drafting and refining course content (not exposed to learners)
- **Language**: Irish (Gaeilge) with English translations

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.10+
- Anthropic API key (from the [Claude Console](https://console.anthropic.com/)), needed only for admin content generation

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
# Add your ANTHROPIC_API_KEY and ADMIN_PASSWORD to .env
# Optionally set CLAUDE_MODEL to use a different Claude model
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

- 📚 **Structured Topics**: Learn vocabulary and grammar by theme
- 🌍 **Cultural Context**: Learn about Irish culture alongside the language
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🛠️ **AI-Assisted Authoring (admin only)**: Administrators draft and edit topic content with AI; learners never interact with the LLM directly

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
