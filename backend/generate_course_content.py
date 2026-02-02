from openai import OpenAI
import os
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI client with API key from environment
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Read the course design document
with open('../COURSE_DESIGN.md', 'r') as f:
    course_design = f.read()

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

# Generate content for the first topic
user_prompt = f"""Based on this course design:

{course_design}

Generate complete lesson content for Topic 1: "Fuaimeanna & Litriú" (Sounds & Spelling).

Include:
1. Core phrases (6-10 chunks) with English translations
2. Vocabulary set (10-15 items) with translations and pronunciation guides
3. One grammar micro-rule about broad/slender consonants or fada
4. Pronunciation notes for beginners
5. A mini speaking task

Return the content as a JSON object with the following structure:
{{
  "topic_id": 1,
  "topic_name": "Fuaimeanna & Litriú",
  "topic_desc": "Sounds & Spelling",
  "core_phrases": [
    {{"irish": "phrase", "english": "translation", "pronunciation_tip": "tip"}}
  ],
  "vocabulary": [
    {{"irish": "word", "english": "meaning", "pronunciation": "guide"}}
  ],
  "grammar_rule": {{
    "title": "rule name",
    "explanation": "explanation",
    "examples": ["example1", "example2"]
  }},
  "pronunciation_notes": ["note1", "note2"],
  "mini_task": {{
    "instruction": "task description",
    "prompts": ["prompt1", "prompt2"]
  }}
}}"""

print("Generating course content for Topic 1: Fuaimeanna & Litriú...")
print("-" * 70)

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

# Parse and display the generated content
content = json.loads(response.choices[0].message.content)

# Pretty print the JSON
print(json.dumps(content, indent=2, ensure_ascii=False))

# Save to file
output_file = 'generated_content/topic_01_fuaimeanna_litriu.json'
os.makedirs('generated_content', exist_ok=True)

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(content, f, indent=2, ensure_ascii=False)

print(f"\n✅ Content saved to: {output_file}")
