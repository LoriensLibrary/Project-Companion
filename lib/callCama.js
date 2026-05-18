// First real CAMA integration in this prototype. Read-only. Calls CAMA's
// dashboard HTTP API (the `/api/data` endpoint that `cama_dashboard.py`
// exposes). This is NOT the MCP-over-HTTP `cama_query_memories` tool —
// implementing the MCP wire protocol from a browser is on the roadmap, not
// MVP. Both paths read from the same SQLite corpus; the dashboard endpoint
// is the one CAMA already documents in its public Quickstart, so this is
// the lowest-friction way to demonstrate the integration is live.
//
// Configurable via VITE_CAMA_ENDPOINT. The default path `/api/cama/data`
// is intentionally relative — vite.config.js proxies `/api/cama/*` to the
// CAMA dashboard at http://localhost:5555 in dev. A production deployment
// would point VITE_CAMA_ENDPOINT at a per-tenant CAMA backend (roadmap).

const DEFAULT_ENDPOINT = "/api/cama/data";

export async function callCama({ signal } = {}) {
  const endpoint = import.meta.env?.VITE_CAMA_ENDPOINT || DEFAULT_ENDPOINT;
  const res = await fetch(endpoint, { signal });
  if (!res.ok) {
    throw new Error(`CAMA ${res.status} from ${endpoint}: ${await res.text()}`);
  }
  return res.json();
}
