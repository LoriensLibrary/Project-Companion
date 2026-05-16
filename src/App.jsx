import { useState } from "react";
import StudentHub from "../StudentHub.jsx";
import TeacherDashboard from "../TeacherDashboard.jsx";
import ParentDashboard from "../ParentDashboard.jsx";

// Tiny chooser landing page. The three dashboards are independent
// single-file components; this just lets you flip between them locally.
const DASHBOARDS = [
  { id: "student", label: "Student Hub", emoji: "🎓", Comp: StudentHub, desc: "Tutoring UI with themed worlds, companions, and mini-games." },
  { id: "teacher", label: "Teacher Dashboard", emoji: "👩‍🏫", Comp: TeacherDashboard, desc: "Nine teacher-side feature surfaces populated by fictional sample data." },
  { id: "parent",  label: "Parent Dashboard",  emoji: "👪", Comp: ParentDashboard,  desc: "Parent-side overview, activity log, and Help-at-Home surfaces." },
];

const wrap = { minHeight: "100vh", padding: "48px 24px", maxWidth: 720, margin: "0 auto" };
const h1   = { fontFamily: "Georgia,serif", fontSize: 30, marginBottom: 6 };
const sub  = { color: "#9b97c0", fontSize: 14, marginBottom: 28, lineHeight: 1.6 };
const card = { display: "block", width: "100%", textAlign: "left", padding: "16px 18px", marginBottom: 12, borderRadius: 14, border: "1px solid rgba(167,139,250,0.18)", background: "rgba(26,20,50,0.55)", color: "#e8e6e1", cursor: "pointer", fontFamily: "inherit" };
const back = { padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(167,139,250,0.3)", background: "transparent", color: "#a78bfa", cursor: "pointer", fontFamily: "inherit", fontSize: 13 };

export default function App() {
  const [pick, setPick] = useState(null);
  if (pick) {
    const { Comp, label } = DASHBOARDS.find(d => d.id === pick);
    return (
      <div>
        <div style={{ position: "fixed", top: 12, left: 12, zIndex: 9999 }}>
          <button style={back} onClick={() => setPick(null)}>← {label} · back to chooser</button>
        </div>
        <Comp />
      </div>
    );
  }
  return (
    <div style={wrap}>
      <h1 style={h1}>Project Companion — prototype</h1>
      <p style={sub}>
        Design prototype (UI only). Three independent dashboards demonstrating the three sides
        of a CAMA-informed learning companion. State is in-memory; no backend, no persistence.
        See <code>README.md</code> for the gap between what is built and what would need to ship
        before any deployment to minors.
      </p>
      {DASHBOARDS.map(d => (
        <button key={d.id} style={card} onClick={() => setPick(d.id)}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
            <span style={{ marginRight: 8 }}>{d.emoji}</span>{d.label}
          </div>
          <div style={{ fontSize: 13, color: "#9b97c0", lineHeight: 1.5 }}>{d.desc}</div>
        </button>
      ))}
    </div>
  );
}
