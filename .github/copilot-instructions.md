# Copilot Instructions - Gaeilge Tutor

## Project Overview
Gaeilge le Gwen is an Irish language learning application built with React (frontend) and Python (backend), using Anthropic's Claude API to help administrators draft and refine course content. Learners never interact with the AI; everything they see is pre-authored, reviewed content. This project is in early development stages.

## Site Structure
The application has three main sections:
1. **Topicí (Topics)**: Browse vocabulary, grammar, and practice by theme
2. **Aiseanna (Lessons)**: Structured learning paths and resources
3. **Teagmháil (Contact)**: User profile, settings, and contact information

## Tech Stack
- **Frontend**: React
- **Backend**: Python (Flask)
- **AI Integration**: Anthropic Claude API (admin-only content authoring)
- **Language**: Irish (Gaeilge) language learning

## Development Setup

### Prerequisites
- Node.js and npm (for React frontend)
- Python 3.10+ (for backend)
- Anthropic API key (admin content generation only)

### Getting Started
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt

# Set up environment variables
# cp .env.example .env, then set:
# ANTHROPIC_API_KEY=your_api_key_here
# ADMIN_PASSWORD=your_admin_password

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
- Claude integration (admin endpoints and generation scripts only) for:
  - Drafting new topics and exercises
  - Refining and correcting existing content
- Never expose AI endpoints to learners; all AI routes sit behind admin auth
- Separate concerns: routes, services, Claude utilities (`claude_client.py`)

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

### Claude Integration
- Store the API key in environment variables (never commit)
- Use the official `anthropic` Python SDK via the shared `claude_client.py` module
- Default model is `claude-opus-5`; override with the `CLAUDE_MODEL` environment variable
- Use structured outputs (the `Topic` Pydantic model) so generated content always matches the site's JSON format
- The SDK retries rate limits and server errors automatically
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

### Claude Best Practices
- Use system prompts to establish Irish language and curriculum context
- Implement prompt templates for consistency
- Handle API errors gracefully and show the admin a clear message
- Monitor token usage to control costs
- Example:
  ```python
  import claude_client

  topic = claude_client.generate_topic(
      "You are an expert Irish language teacher and curriculum designer.",
      "Create a beginner topic about the weather.",
  )
  ```

### User Experience
- Support both beginners and intermediate learners
- Provide immediate feedback on exercises
- Track and display learning progress
- Make content accessible and engaging
- In the admin panel, show loading states during AI responses and let admins regenerate unsatisfactory drafts

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
  claude_client.py # Claude integration (admin content authoring)
  app.py           # Main application entry
  requirements.txt # Python dependencies
/.env              # Environment variables (never commit)
```

## Security Notes
- Never commit `.env` files or API keys
- Add `.env` to `.gitignore`
- Use environment variables for all sensitive data
- Implement rate limiting on API endpoints
- Sanitize admin inputs before sending to Claude
- Validate and sanitize AI responses before displaying to users
