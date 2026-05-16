// Reads VITE_ANTHROPIC_API_KEY from import.meta.env. NEVER hardcode a key here.
// For a real deployment to minors, this must move to a backend proxy — see README.
export async function callClaude({ model = "claude-sonnet-4-6", max_tokens = 1024, system, messages }) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("VITE_ANTHROPIC_API_KEY not set. See .env.example.");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
      "content-type": "application/json",
    },
    body: JSON.stringify({ model, max_tokens, system, messages }),
  });
  if (!res.ok) throw new Error(`Claude API ${res.status}: ${await res.text()}`);
  return res.json();
}
