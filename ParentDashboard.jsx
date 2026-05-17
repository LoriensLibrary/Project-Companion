import { useState } from "react";
import { CHILD } from "./data/sample.js";

const LOGO = "data:image/png;base64,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";
const THEMES = {
  amethyst: { name:"Amethyst", accent:"#a78bfa", bg:"#0b0a14", card:"rgba(26,20,50,0.9)", card2:"rgba(18,14,35,0.95)", border:"rgba(167,139,250,0.15)", glow1:"rgba(167,139,250,0.08)", glow2:"rgba(232,200,122,0.05)" },
  ember: { name:"Ember", accent:"#f0915a", bg:"#140d0a", card:"rgba(50,26,20,0.9)", card2:"rgba(35,18,14,0.95)", border:"rgba(240,145,90,0.15)", glow1:"rgba(240,145,90,0.08)", glow2:"rgba(240,198,116,0.05)" },
  ocean: { name:"Ocean", accent:"#38bdf8", bg:"#080f14", card:"rgba(16,30,45,0.9)", card2:"rgba(12,22,35,0.95)", border:"rgba(56,189,248,0.15)", glow1:"rgba(56,189,248,0.08)", glow2:"rgba(110,231,160,0.05)" },
  rose: { name:"Rose", accent:"#f472b6", bg:"#140a10", card:"rgba(50,20,35,0.9)", card2:"rgba(35,14,24,0.95)", border:"rgba(244,114,182,0.15)", glow1:"rgba(244,114,182,0.08)", glow2:"rgba(248,180,200,0.05)" },
  sunlit: { name:"Sunlit", accent:"#fbbf24", bg:"#14120a", card:"rgba(45,38,18,0.9)", card2:"rgba(32,28,14,0.95)", border:"rgba(251,191,36,0.15)", glow1:"rgba(251,191,36,0.08)", glow2:"rgba(251,220,100,0.05)" },
  sage: { name:"Sage", accent:"#86efac", bg:"#0a120d", card:"rgba(20,42,28,0.9)", card2:"rgba(14,32,20,0.95)", border:"rgba(134,239,172,0.15)", glow1:"rgba(134,239,172,0.08)", glow2:"rgba(232,200,122,0.05)" },
};
let T = THEMES.amethyst;
const accent = "#a78bfa";
const gc = (x={}) => ({ background:"linear-gradient(135deg,rgba(26,20,50,0.9),rgba(18,14,35,0.95))", border:"1px solid rgba(167,139,250,0.15)", borderRadius:20, padding:22, boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)", ...x });

// CHILD is fictional sample data — see data/sample.js

const ACTIVITY = [
  { date: "Today", subject: "Math", topic: "Multiplication practice", duration: "18 min", mood: "focused" },
  { date: "Yesterday", subject: "Science", topic: "How magnets work", duration: "12 min", mood: "curious" },
  { date: "Tuesday", subject: "Math", topic: "Fraction basics", duration: "15 min", mood: "frustrated → improved" },
  { date: "Monday", subject: "Reading", topic: "Vocabulary building", duration: "10 min", mood: "engaged" },
  { date: "Last Friday", subject: "Social Studies", topic: "Community helpers", duration: "14 min", mood: "interested" },
];

const moodColors = { focused: "#7cb3f0", curious: "#a78bfa", engaged: "#6ee7a0", interested: "#e8c87a", "frustrated → improved": "#f0915a" };

export default function ParentDashboard() {
  const [tab, setTab] = useState("overview");
  const [themeKey, setThemeKey] = useState("amethyst");
  const [showThemes, setShowThemes] = useState(false);
  T = THEMES[themeKey];
  const c = CHILD;
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "activity", label: "Activity", icon: "📅" },
    { id: "help", label: "Help at Home", icon: "🏠" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(ellipse at 25% 15%, ${T.glow1}, transparent 50%), radial-gradient(ellipse at 75% 65%, ${T.glow2}, transparent 45%), ${T.bg}`, fontFamily: "'Source Sans 3','Segoe UI',sans-serif", color: "#ede9f6" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "18px 24px", borderBottom: `1px solid ${T.border}`, background: `linear-gradient(180deg, ${T.card}, ${T.bg}ee)` }}>
        <img src={LOGO} alt="Logo" style={{ width: 36, height: 36, borderRadius: "50%", filter: `drop-shadow(0 0 12px ${T.accent}99)`, marginRight: 12 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: T.accent, fontWeight: 700 }}>Project Companion</div>
          <div style={{ fontSize: 11, color: "#8b83a8" }}>Parent View — {c.name}</div>
        </div>
        <div style={{position:"relative"}}>
          <button onClick={()=>setShowThemes(!showThemes)} style={{width:28,height:28,borderRadius:"50%",background:T.accent,border:"2px solid rgba(255,255,255,0.2)",cursor:"pointer",boxShadow:`0 0 12px ${T.accent}44`}} title="Theme"/>
          {showThemes&&<div style={{position:"absolute",right:0,top:36,background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:12,display:"flex",gap:8,zIndex:99,boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
            {Object.entries(THEMES).map(([k,th])=><button key={k} onClick={()=>{setThemeKey(k);setShowThemes(false);}} style={{width:32,height:32,borderRadius:"50%",background:th.accent,border:themeKey===k?"3px solid #fff":"3px solid transparent",cursor:"pointer",transition:"all 0.2s",transform:themeKey===k?"scale(1.15)":"scale(1)"}} title={th.name}/>)}
          </div>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, padding: "10px 24px", borderBottom: `1px solid ${T.border}`, background: `${T.bg}cc` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13,
            fontWeight: tab === t.id ? 700 : 400, background: tab === t.id ? `${T.accent}22` : "transparent", color: tab === t.id ? T.accent : "#8b83a8",
            transition: "all 0.2s", boxShadow: tab === t.id ? `inset 0 -2px 0 ${T.accent}88` : "none",
          }}><span style={{ fontSize: 15 }}>{t.icon}</span>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>

        {/* ===== OVERVIEW ===== */}
        {tab === "overview" && <>
          {/* Child card */}
          <div style={{ ...gc({ marginBottom: 16, background: "linear-gradient(135deg, rgba(167,139,250,0.1), rgba(232,200,122,0.05), rgba(18,14,35,0.95))", border: "1px solid rgba(167,139,250,0.25)" }) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${accent}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🧒</div>
              <div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 13, color: "#8b83a8" }}>{c.grade} • Companion: {c.companion} • Theme: {c.theme}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              {[
                { icon: "💬", val: c.sessions, lb: "Sessions", col: "#7cb3f0" },
                { icon: "🔥", val: `${c.streak} days`, lb: "Streak", col: "#f0c674" },
                { icon: "⭐", val: c.xp, lb: "XP", col: "#e8c87a" },
                { icon: "🏅", val: `Level ${c.level}`, lb: "Level", col: accent },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: 12, borderRadius: 12, background: "rgba(11,10,20,0.5)", border: "1px solid rgba(167,139,250,0.08)" }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 20, color: s.col, fontWeight: 700 }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: "#8b83a8", marginTop: 2 }}>{s.lb}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher's note */}
          <div style={{ ...gc({ marginBottom: 16 }) }}>
            <div style={{ fontSize: 10, color: "#e8c87a", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>💌</span> Note from Teacher
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "#ede9f6" }}>{c.teacherNote}</div>
          </div>

          {/* Week summary */}
          <div style={{ ...gc({ marginBottom: 16 }) }}>
            <div style={{ fontSize: 10, color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>📊</span> This Week's Summary
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "#ede9f6" }}>{c.weekSummary}</div>
          </div>

          {/* Strengths & struggles */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={gc()}>
              <div style={{ fontSize: 10, color: "#6ee7a0", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>🌟 What they're doing well</div>
              {c.strengths.map((s, i) => <div key={i} style={{ padding: "8px 0", fontSize: 14, lineHeight: 1.6, borderTop: i > 0 ? "1px solid rgba(167,139,250,0.08)" : "none" }}>• {s}</div>)}
            </div>
            <div style={gc()}>
              <div style={{ fontSize: 10, color: "#f0915a", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>🔧 What we're working on</div>
              {c.struggles.map((s, i) => <div key={i} style={{ padding: "8px 0", fontSize: 14, lineHeight: 1.6, borderTop: i > 0 ? "1px solid rgba(167,139,250,0.08)" : "none" }}>• {s}</div>)}
            </div>
          </div>
        </>}

        {/* ===== ACTIVITY ===== */}
        {tab === "activity" && <>
          <div style={{ ...gc({ padding: 0, overflow: "hidden" }) }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 2fr 1fr 1.2fr", padding: "14px 22px", borderBottom: "1px solid rgba(167,139,250,0.1)", fontSize: 10, color: "#8b83a8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>
              <div>When</div><div>Subject</div><div>Topic</div><div>Time</div><div>Mood</div>
            </div>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 2fr 1fr 1.2fr", padding: "14px 22px", borderTop: "1px solid rgba(167,139,250,0.06)", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: "#8b83a8" }}>{a.date}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{a.subject}</div>
                <div style={{ fontSize: 14 }}>{a.topic}</div>
                <div style={{ fontSize: 13, color: "#8b83a8" }}>{a.duration}</div>
                <div><span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 10, background: `${moodColors[a.mood] || accent}22`, color: moodColors[a.mood] || accent, fontWeight: 600 }}>{a.mood}</span></div>
              </div>
            ))}
          </div>
          <div style={{ ...gc({ marginTop: 16 }) }}>
            <div style={{ fontSize: 10, color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>📚 Topics Covered Recently</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {c.recentTopics.map((t, i) => <span key={i} style={{ padding: "6px 14px", borderRadius: 20, background: `${accent}15`, border: `1px solid ${accent}22`, fontSize: 13, color: "#ede9f6" }}>{t}</span>)}
            </div>
          </div>
        </>}

        {/* ===== HELP AT HOME ===== */}
        {tab === "help" && <>
          <div style={{ ...gc({ marginBottom: 16, background: "linear-gradient(135deg, rgba(110,231,160,0.08), rgba(18,14,35,0.95))", border: "1px solid rgba(110,231,160,0.2)" }) }}>
            <div style={{ fontSize: 10, color: "#6ee7a0", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>🏠</span> How You Can Help at Home
            </div>
            <div style={{ fontSize: 15, color: "#ede9f6", lineHeight: 1.8, marginBottom: 8 }}>
              Based on what {c.companion.split(" ")[0]} has been working on with {c.name.split(" ")[0]}, here are specific things you can do:
            </div>
          </div>
          {c.howToHelp.map((tip, i) => (
            <div key={i} style={{ ...gc({ marginBottom: 10, padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }) }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, color: accent, fontWeight: 700 }}>{i + 1}</div>
              <div style={{ fontSize: 15, lineHeight: 1.7 }}>{tip}</div>
            </div>
          ))}
          <div style={{ ...gc({ marginTop: 16 }) }}>
            <div style={{ fontSize: 10, color: "#e8c87a", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>💡 Remember</div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "#ede9f6" }}>
              The companion tracks what works and what doesn't — so the more {c.name.split(" ")[0]} uses it, the smarter it gets about how they learn best. Everything you do at home reinforces what happens in the classroom. You're part of the team.
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}
