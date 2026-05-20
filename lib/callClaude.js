// Project-Companion AI call wrapper.
//
// SAFETY POSTURE: defaults to MOCK TUTOR MODE.
//
// This is a child-facing prototype. The previous shape — "make a real
// Anthropic API call from the browser, warn in the README not to deploy" —
// relied on developer discipline. The current shape is structural: live
// API calls are DISABLED unless a developer explicitly opts in via
// VITE_TUTOR_ALLOW_LIVE_CLAUDE=true.
//
// In MOCK TUTOR MODE (default):
//   - No network call. No API key required. No risk of accidental
//     deployment-to-minors with a working key in the client bundle.
//   - Returns a deterministic, clearly-marked stub response in the
//     Anthropic API shape so the UI keeps working for demos.
//   - Every mock response starts with "[MOCK TUTOR MODE]" so developers
//     can see at a glance which mode the app is in.
//
// In LIVE mode (developer must explicitly opt in):
//   - Requires both VITE_TUTOR_ALLOW_LIVE_CLAUDE=true AND a valid
//     VITE_ANTHROPIC_API_KEY in the environment.
//   - Logs a prominent console warning every first-call so it's
//     impossible to forget live mode is active.
//   - Still ships under the do-not-deploy-to-minors banner; live mode
//     exists for developer testing of the Anthropic integration, NOT
//     for production deployment.
//
// PRODUCTION path: replace this module with a backend proxy that holds
// the key server-side, applies per-user rate limiting, audit logging,
// and content moderation. See README Roadmap.

const LIVE_MODE_ENABLED =
  String(import.meta.env.VITE_TUTOR_ALLOW_LIVE_CLAUDE || "").toLowerCase() === "true";

let _liveModeWarned = false;

function _mockResponse({ system, messages }) {
  // Pick a stub based on system-prompt content so different surfaces
  // get different mock text. Stays deterministic — same input, same output.
  const sysLower = (system || "").toLowerCase();
  let stub;
  if (sysLower.includes("parent") || sysLower.includes("family")) {
    stub =
      "[MOCK TUTOR MODE] (Drafted parent message stub.) " +
      "In live mode, this surface drafts a message based on actual session data " +
      "for the teacher to review and edit before sending.";
  } else if (sysLower.includes("teacher") || sysLower.includes("copilot")) {
    stub =
      "[MOCK TUTOR MODE] (Teacher copilot stub.) " +
      "In live mode, this surface answers the teacher's questions about a " +
      "specific student using the persistent-memory record.";
  } else if (sysLower.includes("socratic") || sysLower.includes("student")) {
    stub =
      "[MOCK TUTOR MODE] What do you already know about this? " +
      "Let's think it through together — I won't give you the answer, but I'll ask " +
      "the questions that help you find it.";
  } else {
    stub =
      "[MOCK TUTOR MODE] Stub response. Live AI calls are disabled by default for " +
      "child-facing safety. See lib/callClaude.js to enable live mode " +
      "during developer testing.";
  }
  return {
    id: "mock-response",
    type: "message",
    role: "assistant",
    model: "mock-tutor-mode",
    content: [{ type: "text", text: stub }],
    stop_reason: "end_turn",
    usage: { input_tokens: 0, output_tokens: 0 },
  };
}

export async function callClaude({ model, max_tokens = 1024, system, messages }) {
  if (!model) {
    throw new Error("callClaude: `model` is required (no default).");
  }

  // Default safe path: mock tutor mode. No network, no key needed.
  if (!LIVE_MODE_ENABLED) {
    // Tiny latency so UIs that rely on a Promise still feel realistic.
    await new Promise((r) => setTimeout(r, 50));
    return _mockResponse({ system, messages });
  }

  // Live mode — developer explicitly opted in. Warn loudly + once per session.
  if (!_liveModeWarned) {
    // eslint-disable-next-line no-console
    console.warn(
      "%c[Project-Companion] LIVE Anthropic API mode is ENABLED.\n" +
        "Every call from this build goes to api.anthropic.com from the browser.\n" +
        "API key is in the client bundle. DO NOT deploy this build to minors.\n" +
        "Disable by removing VITE_TUTOR_ALLOW_LIVE_CLAUDE from your .env.local.",
      "color:#ff5555;font-weight:bold;font-size:13px",
    );
    _liveModeWarned = true;
  }

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "VITE_TUTOR_ALLOW_LIVE_CLAUDE=true requires VITE_ANTHROPIC_API_KEY. " +
        "See .env.example.",
    );
  }

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
  if (!res.ok) {
    throw new Error(`Claude API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}
