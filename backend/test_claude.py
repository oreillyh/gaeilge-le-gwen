import claude_client

# Test API call
reply, usage = claude_client.chat(
    "You are a helpful assistant.",
    "Write a one-sentence bedtime story about a unicorn."
)

print(reply)
