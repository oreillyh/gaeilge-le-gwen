"""Shared Claude (Anthropic) client used for drafting and refining course content.

Used only by the admin API and the offline generation scripts - learners never
interact with the model.
"""
import os

import anthropic
from dotenv import load_dotenv
from pydantic import BaseModel

# Load environment variables (ANTHROPIC_API_KEY, optional CLAUDE_MODEL)
load_dotenv()

MODEL = os.getenv('CLAUDE_MODEL', 'claude-opus-5')

# Reads ANTHROPIC_API_KEY from the environment
client = anthropic.Anthropic()

# If Claude declines a request, the API retries it on a fallback model automatically
FALLBACK_OPTIONS = {
    'betas': ['server-side-fallback-2026-07-01'],
    'fallbacks': 'default',
}


# ============= TOPIC SCHEMA =============

class CorePhrase(BaseModel):
    irish: str
    english: str
    pronunciation_tip: str


class VocabularyItem(BaseModel):
    irish: str
    english: str
    pronunciation: str


class GrammarRule(BaseModel):
    title: str
    explanation: str
    examples: list[str]


class MiniTask(BaseModel):
    instruction: str
    prompts: list[str]


class Topic(BaseModel):
    topic_name: str
    topic_desc: str
    core_phrases: list[CorePhrase]
    vocabulary: list[VocabularyItem]
    grammar_rule: GrammarRule
    pronunciation_notes: list[str]
    mini_task: MiniTask


# ============= HELPERS =============

def _require_api_key():
    if not client.api_key and not client.auth_token:
        raise RuntimeError('ANTHROPIC_API_KEY is not set - add it to backend/.env')


def generate_topic(system_prompt, user_prompt):
    """Ask Claude for a complete topic; returns a dict matching the Topic schema."""
    _require_api_key()
    response = client.beta.messages.parse(
        model=MODEL,
        max_tokens=16000,
        system=system_prompt,
        messages=[{'role': 'user', 'content': user_prompt}],
        output_format=Topic,
        **FALLBACK_OPTIONS,
    )

    if response.stop_reason == 'refusal':
        raise RuntimeError('Claude declined to generate this topic')
    if response.parsed_output is None:
        raise RuntimeError(f'Claude did not return a complete topic (stop reason: {response.stop_reason})')

    return response.parsed_output.model_dump()


def chat(system_prompt, user_message):
    """Send one message to Claude; returns (reply_text, usage)."""
    _require_api_key()
    response = client.beta.messages.create(
        model=MODEL,
        max_tokens=16000,
        system=system_prompt,
        messages=[{'role': 'user', 'content': user_message}],
        **FALLBACK_OPTIONS,
    )

    if response.stop_reason == 'refusal':
        raise RuntimeError('Claude declined to respond to this message')

    reply = ''.join(block.text for block in response.content if block.type == 'text')
    return reply, response.usage
