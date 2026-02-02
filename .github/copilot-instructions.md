# Copilot Instructions - Gaeilge Tutor

## Project Overview
Gaeilge le Gwen is an Irish language learning application built with React (frontend) and Python (backend), leveraging OpenAI API for AI-powered language learning features. This project is in early development stages.

## Site Structure
The application has three main sections:
1. **Topicí (Topics)**: Browse vocabulary, grammar, and practice by theme
2. **Aiseanna (Lessons)**: Structured learning paths and resources
3. **Teagmháil (Contact)**: User profile, settings, and contact information

## Tech Stack
- **Frontend**: React
- **Backend**: Python
- **AI Integration**: OpenAI API
- **Language**: Irish (Gaeilge) language learning

## Development Setup

### Prerequisites
- Node.js and npm (for React frontend)
- Python 3.8+ (for backend)
- OpenAI API key

### Getting Started
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt

# Set up environment variables
# Create .env file with:
# OPENAI_API_KEY=your_api_key_here

# Run development servers
# Terminal 1 - Frontend:
cd frontend && npm start

# Terminal 2 - Backend:
cd backend && python app.py
```

## Code Conventions

### Language and Localization
- Use Irish (Gaeilge) for user-facing strings and content
- Store translations in a structured format (to be defined)
- Follow standard Irish orthography and grammar rules
- Consider both Munster, Connacht, and Ulster dialect variations where relevant

### Code Style
- Follow consistent naming conventions (to be established)
- Document language-specific functions clearly
- Include examples of Irish text in comments where helpful

## Architecture Patterns

### Frontend (React)
- Component-based architecture with three main sections: Topicí, Aiseanna, Teagmháil
- Use React Router for navigation between sections
- Store language learning content in structured JSON/state
- Use React hooks for state management
- Implement reusable components for exercises, vocabulary cards, and progress tracking
- Components should follow section-based organization:
  - `/components/Topics/` - Topic browsing and practice
  - `/components/Lessons/` - Structured learning paths
  - `/components/Contact/` - User profile and settings

### Backend (Python)
- RESTful API endpoints for lesson content and user progress
- OpenAI integration for:
  - Conversational practice (chatbot)
  - Pronunciation feedback
  - Personalized exercise generation
  - Translation assistance
- Separate concerns: routes, services, OpenAI utilities

### Data Models
- Lessons: structure, difficulty level, vocabulary, grammar points
- User progress: completed lessons, scores, practice history
- Vocabulary: word, translation, pronunciation, usage examples
- Exercise types: multiple choice, fill-in-blank, conversation practice

## Key Workflows

### Development
```bash
# Build frontend for production
cd frontend && npm run build

# Run tests
cd frontend && npm test              # React tests
cd backend && pytest                   # Python tests

# Lint code
cd frontend && npm run lint
cd backend && pylint **/*.py
```

### OpenAI Integration
- Store API key in environment variables (never commit)
- Implement retry logic for API calls
- Use appropriate models: GPT-4 for complex tasks, GPT-3.5-turbo for simple responses
- Cache common responses to reduce API costs
- Include Irish language context in prompts for better accuracy

### Content Management
- Store lessons as JSON files or in database
- Version control all learning content
- Validate Irish language accuracy before deploying
- Test AI-generated content for appropriateness and accuracy

## Important Considerations

### Educational Content
- Ensure accuracy of Irish language content
- Provide clear pronunciation guides (consider phonetic transcriptions)
- Include cultural context where appropriate
- Design for progressive difficulty levels
- Validate AI-generated Irish text with native speakers or reliable sources

### OpenAI Best Practices
- Use system prompts to establish Irish language context
- Implement prompt templates for consistency
- Handle API errors gracefully (rate limits, timeouts)
- Monitor token usage to control costs
- Store conversation history for contextual learning
- Example prompt structure:
  ```python
  system_prompt = "You are an Irish language tutor. Respond in both Irish and English."
  user_message = f"Explain the grammar concept: {topic}"
  ```

### User Experience
- Support both beginners and intermediate learners
- Provide immediate feedback on exercises
- Track and display learning progress
- Make content accessible and engaging
- Show loading states during AI responses
- Allow users to regenerate AI responses if unsatisfactory

## File Structure
```
/frontend          # React application
  /src
    /components    # Reusable UI components
    /pages         # Page-level components
    /services      # API calls to backend
    /utils         # Helpers, constants
/backend           # Python API
  /routes          # API endpoints
  /services        # Business logic
  /models          # Data models
  /openai_utils    # OpenAI integration
  app.py           # Main application entry
  requirements.txt # Python dependencies
/.env              # Environment variables (never commit)
```

## Security Notes
- Never commit `.env` files or API keys
- Add `.env` to `.gitignore`
- Use environment variables for all sensitive data
- Implement rate limiting on API endpoints
- Sanitize user inputs before sending to OpenAI
- Validate and sanitize AI responses before displaying to users
