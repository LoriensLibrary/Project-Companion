import { useEffect, useRef, useState } from "react";
import { callCama } from "./callCama.js";

// useCamaMemory(studentId, options) — fetches recent learning topics from a
// live CAMA backend if reachable, otherwise returns `fallbackTopics` so the
// demo still renders without a backend.
//
// Returns:
//   { topics, source, loading, error }
//     - topics: array of { subject, topic, time, icon }
//     - source: "cama" if the live call succeeded, "sample" if we fell back
//     - loading: true while the request is in flight
//     - error:   the Error object if the call failed, else null
//
// `studentId` is currently accepted but not used as a query filter — the
// CAMA dashboard API serves the single-participant corpus that doesn't yet
// have a multi-student schema. The argument is in the hook signature so the
// component contract is stable when per-student routing lands in CAMA
// (roadmap). Today it controls only the cache key.
//
// `fallbackTopics` is required: the calling component supplies its own demo
// data so the hook can never invent content. If CAMA is unreachable, the
// hook returns the fallback verbatim with source="sample".

const SUBJECT_TAG = {
  bake: "Math",     read: "Reading", garden: "Science",
  build: "Science", code:  "Science", site:  "Science",
  alex: "Social Studies",
};
const SUBJECT_ICON = {
  Math: "🔢", Science: "🔬", Reading: "📚", "Social Studies": "🌍", General: "💡",
};

function classifyTopic(text) {
  const t = (text || "").toLowerCase();
  for (const [keyword, subject] of Object.entries(SUBJECT_TAG)) {
    if (t.includes(keyword)) return subject;
  }
  return "General";
}

function toTopicCard(item) {
  const subject = classifyTopic(item.text);
  return {
    subject,
    topic: (item.text || "").split(/[.,—]/)[0].trim().slice(0, 60),
    time: item.age || "recent",
    icon: SUBJECT_ICON[subject] || SUBJECT_ICON.General,
  };
}

export function useCamaMemory(studentId, { fallbackTopics, limit = 4 } = {}) {
  if (!Array.isArray(fallbackTopics)) {
    throw new Error("useCamaMemory: `fallbackTopics` array is required.");
  }
  const [state, setState] = useState({
    topics: fallbackTopics,
    source: "sample",
    loading: true,
    error: null,
  });
  const abortRef = useRef(null);

  useEffect(() => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    (async () => {
      try {
        const payload = await callCama({ signal: ctrl.signal });
        const recent = Array.isArray(payload?.recent_activity)
          ? payload.recent_activity.slice(0, limit).map(toTopicCard)
          : [];
        if (recent.length === 0) {
          setState({ topics: fallbackTopics, source: "sample", loading: false, error: null });
          return;
        }
        setState({ topics: recent, source: "cama", loading: false, error: null });
      } catch (err) {
        if (err?.name === "AbortError") return;
        setState({ topics: fallbackTopics, source: "sample", loading: false, error: err });
      }
    })();

    return () => ctrl.abort();
  }, [studentId, limit]);

  return state;
}
