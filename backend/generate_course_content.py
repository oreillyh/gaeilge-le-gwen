import os
import json

import claude_client

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
- Culturally appropriate"""

# Generate content for the first topic
user_prompt = f"""Based on this course design:

{course_design}

Generate complete lesson content for Topic 1: "Fuaimeanna & Litriú" (Sounds & Spelling).

Include:
1. Core phrases (6-10 chunks) with English translations
2. Vocabulary set (10-15 items) with translations and pronunciation guides
3. One grammar micro-rule about broad/slender consonants or fada
4. Pronunciation notes for beginners
5. A mini speaking task"""

print("Generating course content for Topic 1: Fuaimeanna & Litriú...")
print("-" * 70)

content = {"topic_id": 1, **claude_client.generate_topic(system_prompt, user_prompt)}

# Pretty print the JSON
print(json.dumps(content, indent=2, ensure_ascii=False))

# Save to file
output_file = 'generated_content/topic_01_fuaimeanna_litriu.json'
os.makedirs('generated_content', exist_ok=True)

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(content, f, indent=2, ensure_ascii=False)

print(f"\n✅ Content saved to: {output_file}")
