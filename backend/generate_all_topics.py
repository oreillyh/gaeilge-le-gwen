from openai import OpenAI
import os
import json
import time
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI client with API key from environment
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Read the course design document
with open('../COURSE_DESIGN.md', 'r') as f:
    course_design = f.read()

# Define all 20 topics from the course design
topics = [
    # Topic Set A: Bunús (Foundations)
    {"id": 1, "name": "Fuaimeanna & Litriú", "desc": "Sounds & Spelling", "focus": "broad/slender, fada, common letter combos"},
    {"id": 2, "name": "Beannachtaí & Béasaíocht", "desc": "Greetings & Manners", "focus": "hello, please/thanks, 'abair arís'"},
    {"id": 3, "name": "Mise & tusa", "desc": "Me & You", "focus": "names, where from, basic identity"},
    {"id": 4, "name": "Uimhreacha & Am", "desc": "Numbers & Time", "focus": "numbers, days, telling time (basic)"},
    
    # Topic Set B: Croí-abairtí (Core sentence patterns)
    {"id": 5, "name": "Tá / Níl / An bhfuil?", "desc": "To be (states, feelings, location)", "focus": "states, feelings, location"},
    {"id": 6, "name": "Is / Ní / An?", "desc": "To be (identity/classification)", "focus": "identity/classification"},
    {"id": 7, "name": "Agam/Agat/Aige…", "desc": "Possession", "focus": "having/possession forms"},
    {"id": 8, "name": "Ba mhaith liom…", "desc": "Wants & Requests", "focus": "wants/requests"},
    {"id": 9, "name": "Is maith liom / Ní maith liom…", "desc": "Likes & Dislikes", "focus": "likes/dislikes"},
    
    # Topic Set C: Gníomhartha (High-frequency verbs)
    {"id": 10, "name": "Briathra láithreacha", "desc": "Present tense starter pack", "focus": "regular verbs in present tense"},
    {"id": 11, "name": "Briathra neamhrialta", "desc": "Essential irregular verbs", "focus": "small curated list of irregular verbs"},
    {"id": 12, "name": "Ceisteanna", "desc": "Question words", "focus": "cad, cén, cá, conas, cathain, cén fáth"},
    
    # Topic Set D: Saol laethúil (Life themes for beginners)
    {"id": 13, "name": "Sa bhaile", "desc": "At Home", "focus": "home/rooms"},
    {"id": 14, "name": "Bia & deoch", "desc": "Food & Drink", "focus": "food/drink vocabulary"},
    {"id": 15, "name": "Ag siopadóireacht", "desc": "Shopping", "focus": "shopping phrases and vocabulary"},
    {"id": 16, "name": "Aimsir", "desc": "Weather", "focus": "weather vocabulary and expressions"},
    {"id": 17, "name": "Taisteal simplí", "desc": "Simple Travel", "focus": "directions/transport"},
    
    # Topic Set E (later-beginner): Time & narrative basics
    {"id": 18, "name": "Aimsir chaite", "desc": "Past Tense", "focus": "limited, 'story of yesterday'"},
    {"id": 19, "name": "Aimsir fháistineach", "desc": "Future Tense", "focus": "plans"},
    {"id": 20, "name": "Nascfhocail", "desc": "Connecting Words", "focus": "and/but/because (just enough to extend speech)"}
]

# System prompt for course content generation
system_prompt = """You are an expert Irish language teacher and curriculum designer. 
You create structured, pedagogically sound lesson content for beginner Irish learners.
Your content should be:
- Accurate in Irish grammar and spelling
- Progressive in difficulty
- Practical and immediately useful
- Audio-first (phrase-based learning)
- Culturally appropriate

Generate content in JSON format for easy integration into the web application."""

def generate_topic_content(topic):
    """Generate content for a single topic"""
    
    user_prompt = f"""Based on this course design:

{course_design}

Generate complete lesson content for Topic {topic['id']}: "{topic['name']}" ({topic['desc']}).

Focus on: {topic['focus']}

Include:
1. Core phrases (6-10 chunks) with English translations and pronunciation tips
2. Vocabulary set (10-15 items) with translations and pronunciation guides
3. One grammar micro-rule relevant to this topic
4. Pronunciation notes for beginners (2-4 tips)
5. A mini speaking/writing task with 3-5 prompts

Return the content as a JSON object with the following structure:
{{
  "topic_id": {topic['id']},
  "topic_name": "{topic['name']}",
  "topic_desc": "{topic['desc']}",
  "core_phrases": [
    {{"irish": "phrase", "english": "translation", "pronunciation_tip": "tip"}}
  ],
  "vocabulary": [
    {{"irish": "word", "english": "meaning", "pronunciation": "guide"}}
  ],
  "grammar_rule": {{
    "title": "rule name",
    "explanation": "explanation",
    "examples": ["example1", "example2", "example3"]
  }},
  "pronunciation_notes": ["note1", "note2", "note3"],
  "mini_task": {{
    "instruction": "task description",
    "prompts": ["prompt1", "prompt2", "prompt3"]
  }}
}}"""
    
    # Make API call with lower temperature for logical, structured content
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3,  # Lower temperature for more logical/consistent output
        response_format={"type": "json_object"}  # Ensure JSON response
    )
    
    # Parse the generated content
    content = json.loads(response.choices[0].message.content)
    return content

# Create output directory
os.makedirs('generated_content', exist_ok=True)

# Generate content for all topics
print("=" * 70)
print("GENERATING COURSE CONTENT FOR ALL 20 TOPICS")
print("=" * 70)
print()

all_topics_content = []

for i, topic in enumerate(topics, 1):
    print(f"[{i}/20] Generating: {topic['name']} ({topic['desc']})...")
    
    try:
        content = generate_topic_content(topic)
        
        # Save individual topic file
        filename = f"topic_{topic['id']:02d}_{topic['name'].lower().replace(' ', '_').replace('/', '_')}.json"
        filepath = os.path.join('generated_content', filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(content, f, indent=2, ensure_ascii=False)
        
        all_topics_content.append(content)
        
        print(f"    ✅ Saved to: {filename}")
        
        # Add a small delay to avoid rate limits
        if i < len(topics):
            time.sleep(1)
        
    except Exception as e:
        print(f"    ❌ Error: {str(e)}")
    
    print()

# Save all topics in one file for easy import
all_topics_file = 'generated_content/all_topics.json'
with open(all_topics_file, 'w', encoding='utf-8') as f:
    json.dump({
        "course_name": "Gaeilge le Gwen - Beginner Course",
        "total_topics": len(all_topics_content),
        "topics": all_topics_content
    }, f, indent=2, ensure_ascii=False)

print("=" * 70)
print(f"✅ ALL DONE! Generated {len(all_topics_content)} topics")
print(f"✅ Combined file: {all_topics_file}")
print("=" * 70)
