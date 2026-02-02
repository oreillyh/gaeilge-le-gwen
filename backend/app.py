from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
import json
from dotenv import load_dotenv
from functools import wraps

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Simple admin password (in production, use proper authentication)
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

# Path to content files
CONTENT_DIR = 'generated_content'
ALL_TOPICS_FILE = os.path.join(CONTENT_DIR, 'all_topics.json')

# Authentication decorator
def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or auth_header != f'Bearer {ADMIN_PASSWORD}':
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

# Load all topics
def load_all_topics():
    try:
        with open(ALL_TOPICS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"course_name": "Gaeilge le Gwen - Beginner Course", "total_topics": 0, "topics": []}

# Save all topics
def save_all_topics(data):
    with open(ALL_TOPICS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Also save to frontend
    frontend_path = '../frontend/src/data/all_topics.json'
    with open(frontend_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# ============= PUBLIC ENDPOINTS =============

@app.route('/api/topics', methods=['GET'])
def get_topics():
    """Get all topics"""
    data = load_all_topics()
    return jsonify(data)

@app.route('/api/topics/<int:topic_id>', methods=['GET'])
def get_topic(topic_id):
    """Get a specific topic"""
    data = load_all_topics()
    topic = next((t for t in data['topics'] if t['topic_id'] == topic_id), None)
    if topic:
        return jsonify(topic)
    return jsonify({'error': 'Topic not found'}), 404

# ============= ADMIN ENDPOINTS =============

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    """Admin login"""
    password = request.json.get('password')
    if password == ADMIN_PASSWORD:
        return jsonify({'success': True, 'token': ADMIN_PASSWORD})
    return jsonify({'error': 'Invalid password'}), 401

@app.route('/api/admin/topics', methods=['GET'])
@require_auth
def admin_get_topics():
    """Admin: Get all topics with full details"""
    data = load_all_topics()
    return jsonify(data)

@app.route('/api/admin/topics', methods=['POST'])
@require_auth
def admin_create_topic():
    """Admin: Create a new topic"""
    new_topic = request.json
    data = load_all_topics()
    
    # Assign new topic ID
    max_id = max([t['topic_id'] for t in data['topics']], default=0)
    new_topic['topic_id'] = max_id + 1
    
    data['topics'].append(new_topic)
    data['total_topics'] = len(data['topics'])
    
    save_all_topics(data)
    
    return jsonify({'success': True, 'topic': new_topic})

@app.route('/api/admin/topics/<int:topic_id>', methods=['PUT'])
@require_auth
def admin_update_topic(topic_id):
    """Admin: Update an existing topic"""
    updated_topic = request.json
    data = load_all_topics()
    
    # Find and update topic
    for i, topic in enumerate(data['topics']):
        if topic['topic_id'] == topic_id:
            data['topics'][i] = updated_topic
            save_all_topics(data)
            return jsonify({'success': True, 'topic': updated_topic})
    
    return jsonify({'error': 'Topic not found'}), 404

@app.route('/api/admin/topics/<int:topic_id>', methods=['DELETE'])
@require_auth
def admin_delete_topic(topic_id):
    """Admin: Delete a topic"""
    data = load_all_topics()
    
    # Filter out the topic
    data['topics'] = [t for t in data['topics'] if t['topic_id'] != topic_id]
    data['total_topics'] = len(data['topics'])
    
    save_all_topics(data)
    
    return jsonify({'success': True})

# ============= AI CHAT ENDPOINTS =============

@app.route('/api/admin/ai/chat', methods=['POST'])
@require_auth
def ai_chat():
    """Admin: Chat with AI for content generation"""
    user_message = request.json.get('message')
    context = request.json.get('context', '')
    
    system_prompt = """You are an expert Irish language teacher and curriculum designer.
You help create structured lesson content for beginner Irish learners.
When asked to create or modify content, respond with valid JSON that follows this structure:
{
  "topic_id": number,
  "topic_name": "Irish name",
  "topic_desc": "English description",
  "core_phrases": [{"irish": "", "english": "", "pronunciation_tip": ""}],
  "vocabulary": [{"irish": "", "english": "", "pronunciation": ""}],
  "grammar_rule": {"title": "", "explanation": "", "examples": []},
  "pronunciation_notes": [],
  "mini_task": {"instruction": "", "prompts": []}
}

Be helpful, accurate with Irish grammar, and provide structured responses."""

    messages = [
        {"role": "system", "content": system_prompt}
    ]
    
    if context:
        messages.append({"role": "assistant", "content": context})
    
    messages.append({"role": "user", "content": user_message})
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.7
    )
    
    ai_response = response.choices[0].message.content
    
    return jsonify({
        'response': ai_response,
        'usage': {
            'prompt_tokens': response.usage.prompt_tokens,
            'completion_tokens': response.usage.completion_tokens,
            'total_tokens': response.usage.total_tokens
        }
    })

@app.route('/api/admin/ai/generate-topic', methods=['POST'])
@require_auth
def ai_generate_topic():
    """Admin: Generate complete topic content using AI"""
    topic_request = request.json.get('request')
    
    system_prompt = """You are an expert Irish language teacher and curriculum designer.
Generate complete lesson content for beginner Irish learners in JSON format."""

    user_prompt = f"""Create a complete Irish language topic with the following details:

{topic_request}

Return a JSON object with this exact structure:
{{
  "topic_name": "Irish name for the topic",
  "topic_desc": "English description",
  "core_phrases": [
    {{"irish": "phrase", "english": "translation", "pronunciation_tip": "phonetic guide"}}
  ] (6-10 phrases),
  "vocabulary": [
    {{"irish": "word", "english": "meaning", "pronunciation": "guide"}}
  ] (10-15 words),
  "grammar_rule": {{
    "title": "Grammar rule name",
    "explanation": "Clear explanation",
    "examples": ["example1", "example2", "example3"]
  }},
  "pronunciation_notes": ["tip1", "tip2", "tip3"],
  "mini_task": {{
    "instruction": "Task description",
    "prompts": ["prompt1", "prompt2", "prompt3"]
  }}
}}"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3,
        response_format={"type": "json_object"}
    )
    
    topic_content = json.loads(response.choices[0].message.content)
    
    return jsonify({
        'success': True,
        'topic': topic_content
    })

# ============= HEALTH CHECK =============

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'Gaeilge le Gwen API'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
