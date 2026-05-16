import { useState, useRef, useEffect } from "react";
import { callClaude } from "./lib/callClaude.js";
import { STUDENTS } from "./data/sample.js";

const TEACHER_THEMES = {
  amethyst: { name:"Amethyst", accent:"#a78bfa", bg:"#0b0a14", card:"rgba(26,20,50,0.9)", card2:"rgba(18,14,35,0.95)", border:"rgba(167,139,250,0.15)", bHover:"rgba(167,139,250,0.4)", glow1:"rgba(167,139,250,0.08)", glow2:"rgba(232,200,122,0.05)", dot:"#a78bfa" },
  ember: { name:"Ember", accent:"#f0915a", bg:"#140d0a", card:"rgba(50,26,20,0.9)", card2:"rgba(35,18,14,0.95)", border:"rgba(240,145,90,0.15)", bHover:"rgba(240,145,90,0.4)", glow1:"rgba(240,145,90,0.08)", glow2:"rgba(240,198,116,0.05)", dot:"#f0915a" },
  ocean: { name:"Ocean", accent:"#38bdf8", bg:"#080f14", card:"rgba(16,30,45,0.9)", card2:"rgba(12,22,35,0.95)", border:"rgba(56,189,248,0.15)", bHover:"rgba(56,189,248,0.4)", glow1:"rgba(56,189,248,0.08)", glow2:"rgba(110,231,160,0.05)", dot:"#38bdf8" },
  rose: { name:"Rose", accent:"#f472b6", bg:"#140a10", card:"rgba(50,20,35,0.9)", card2:"rgba(35,14,24,0.95)", border:"rgba(244,114,182,0.15)", bHover:"rgba(244,114,182,0.4)", glow1:"rgba(244,114,182,0.08)", glow2:"rgba(248,180,200,0.05)", dot:"#f472b6" },
  sunlit: { name:"Sunlit", accent:"#fbbf24", bg:"#14120a", card:"rgba(45,38,18,0.9)", card2:"rgba(32,28,14,0.95)", border:"rgba(251,191,36,0.15)", bHover:"rgba(251,191,36,0.4)", glow1:"rgba(251,191,36,0.08)", glow2:"rgba(251,220,100,0.05)", dot:"#fbbf24" },
  sage: { name:"Sage", accent:"#86efac", bg:"#0a120d", card:"rgba(20,42,28,0.9)", card2:"rgba(14,32,20,0.95)", border:"rgba(134,239,172,0.15)", bHover:"rgba(134,239,172,0.4)", glow1:"rgba(134,239,172,0.08)", glow2:"rgba(232,200,122,0.05)", dot:"#86efac" },
};
let TC = TEACHER_THEMES.amethyst;
const getGC = () => `linear-gradient(135deg,${TC.card},${TC.card2})`;
const getBorder = () => `1px solid ${TC.border}`;
const C = { bg:"#0b0a14", accent:"#a78bfa", gold:"#e8c87a", text:"#ede9f6", dim:"#8b83a8", green:"#6ee7a0", red:"#f87171", blue:"#7cb3f0", warm:"#f0c674", peach:"#f0a895" };
const LOGO = "data:image/png;base64,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";
const gc = (x={}) => ({ background:"linear-gradient(135deg,rgba(26,20,50,0.9),rgba(18,14,35,0.95))", border:"1px solid rgba(167,139,250,0.15)", borderRadius:20, padding:22, boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)", transition:"all 0.3s", ...x });
const lb = (icon, text, color=C.accent) => <div style={{fontSize:10,color,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:14,display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>{icon}</span>{text}</div>;
const ibtn = (on) => ({ padding:"10px 24px", borderRadius:12, border:"none", background:on?"linear-gradient(135deg,#a78bfa,#8b6fd4)":"rgba(167,139,250,0.1)", color:on?"#fff":C.dim, fontSize:14, fontWeight:700, cursor:on?"pointer":"default", boxShadow:on?"0 4px 20px rgba(167,139,250,0.25)":"none" });
const ipt = { width:"100%", padding:"12px 16px", borderRadius:12, border:"1px solid rgba(167,139,250,0.15)", background:"rgba(11,10,20,0.8)", color:C.text, fontSize:14, outline:"none", marginBottom:10 };

// STUDENTS is fictional sample data — see data/sample.js
const SM = { urgent:{color:"#f87171",bg:"rgba(248,113,113,0.1)",label:"Needs attention",icon:"🔴"}, "check-in":{color:"#f0c674",bg:"rgba(240,198,116,0.1)",label:"Check in",icon:"🟡"}, support:{color:"#7cb3f0",bg:"rgba(124,179,240,0.1)",label:"Needs support",icon:"🔵"}, "on-track":{color:"#6ee7a0",bg:"rgba(110,231,160,0.1)",label:"On track",icon:"🟢"}, thriving:{color:"#a78bfa",bg:"rgba(167,139,250,0.1)",label:"Thriving",icon:"✨"} };
const SUBJECTS = ["Math","Science","Reading","Social Studies"];
const NAV = [
  {id:"brief",icon:"☀️",label:"Today"}, {id:"students",icon:"👩‍🎓",label:"Students"}, {id:"heatmap",icon:"🗺️",label:"Class Map"},
  {id:"questions",icon:"📝",label:"Questions"}, {id:"docs",icon:"📋",label:"Docs"}, {id:"family",icon:"👪",label:"Family"},
  {id:"notes",icon:"📒",label:"Notes"}, {id:"insights",icon:"📈",label:"Insights"}, {id:"assistant",icon:"🔥",label:"Copilot"},
];

// ===== DAILY BRIEF =====
function DailyBrief({onStudent}) {
  const urgent=STUDENTS.filter(s=>s.status==="urgent"), checkIn=STUDENTS.filter(s=>s.status==="check-in"), growth=STUDENTS.filter(s=>s.status==="thriving");
  const my3=[...urgent,...checkIn].slice(0,3);
  const pending = [{type:"parent",text:"Reply pending from Sofia's mom (sent Tuesday)"},{type:"grade",text:"3 ungraded reading assignments"},{type:"loop",text:"Zeke's fraction intervention — follow up needed"}];
  return <div>
    <div style={{...gc({marginBottom:16,background:"linear-gradient(135deg,rgba(167,139,250,0.12),rgba(232,200,122,0.06),rgba(18,14,35,0.95))",border:"1px solid rgba(167,139,250,0.25)"})}}>
      <div style={{fontSize:15,color:C.dim,marginBottom:6}}>Good afternoon</div>
      <div style={{fontFamily:"Georgia,serif",fontSize:22,color:C.text,lineHeight:1.5,marginBottom:10}}>{urgent.length>0?`${urgent.length} student${urgent.length>1?"s":""} need${urgent.length===1?"s":""} your attention today.`:"Your class is doing well today."} {growth.length>0&&`${growth.length} showed growth.`}</div>
      <div style={{fontSize:13,color:C.accent,marginBottom:12}}>Today's class-wide support: visual scaffolding for multi-step problems</div>
      {pending.length>0&&<div style={{borderTop:"1px solid rgba(167,139,250,0.12)",paddingTop:12}}>
        <div style={{fontSize:10,color:C.warm,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>⏳ Pending</div>
        {pending.map((p,i)=><div key={i} style={{fontSize:13,color:C.dim,padding:"4px 0",display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:10}}>{p.type==="parent"?"📧":p.type==="grade"?"📝":"🔄"}</span>{p.text}
        </div>)}
      </div>}
    </div>
    {lb("👤","Your students today",C.gold)}
    <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
      {my3.map((s,i)=>{const st=SM[s.status];return <div key={i} onClick={()=>onStudent(s.name)} style={{...gc({cursor:"pointer",padding:18,background:`linear-gradient(135deg,${st.bg},rgba(18,14,35,0.95))`,border:`1px solid ${st.color}22`})}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div><span style={{fontSize:14,fontWeight:700,color:C.text}}>{s.name}</span><span style={{fontSize:11,color:st.color,marginLeft:10,background:st.bg,padding:"2px 10px",borderRadius:10}}>{st.icon} {st.label}</span></div></div>
        <div style={{fontSize:14,color:C.text,lineHeight:1.6,marginBottom:6}}>{s.intervention}</div>
        <div style={{fontSize:12,color:C.dim,fontStyle:"italic"}}>Changed: {s.changed}</div>
      </div>;})}
    </div>
    {growth.length>0&&<div style={{...gc({marginBottom:16})}}>{lb("🎉","Growth this week",C.green)}{growth.map((s,i)=><div key={i} style={{fontSize:14,color:C.text,padding:"8px 0",borderTop:i>0?"1px solid rgba(167,139,250,0.08)":"none"}}><span style={{fontWeight:600}}>{s.name}</span> — <span style={{color:C.green}}>{s.pattern}</span></div>)}</div>}
    <div style={gc()}>{lb("📊","What changed since yesterday",C.peach)}{STUDENTS.filter(s=>!s.changed.includes("No significant")).map((s,i)=><div key={i} style={{padding:"10px 0",borderTop:i>0?"1px solid rgba(167,139,250,0.08)":"none"}}><div style={{fontSize:14}}><span style={{fontWeight:600}}>{s.name}:</span> {s.changed}</div></div>)}</div>
  </div>;
}

// ===== STUDENTS TABLE =====
function StudentsTable({onStudent}) {
  return <div>
    <p style={{color:C.dim,fontSize:14,marginBottom:16,lineHeight:1.6}}>All students at a glance. Tap any row for their full profile.</p>
    <div style={{...gc({padding:0,overflow:"hidden"})}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1.5fr",padding:"14px 22px",borderBottom:"1px solid rgba(167,139,250,0.1)",fontSize:10,color:C.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>
        <div>Student</div><div>Sessions</div><div>Streak</div><div>XP</div><div>Status</div>
      </div>
      {STUDENTS.map((s,i)=>{const st=SM[s.status];return <div key={i} onClick={()=>onStudent(s.name)} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1.5fr",padding:"14px 22px",borderTop:"1px solid rgba(167,139,250,0.06)",cursor:"pointer",transition:"background 0.2s",alignItems:"center"}}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(167,139,250,0.06)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
        <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{s.name}</div><div style={{fontSize:11,color:C.dim,marginTop:2}}>{s.struggles.length>0?s.struggles[0].split("→")[0].trim():"All good"}</div></div>
        <div style={{fontSize:14,color:C.text}}>{s.sessions}</div>
        <div style={{fontSize:14,color:C.warm}}>🔥 {s.streak}</div>
        <div style={{fontSize:14,color:C.gold}}>⭐ {s.xp}</div>
        <div><span style={{fontSize:11,padding:"3px 10px",borderRadius:10,background:st.bg,color:st.color,fontWeight:600}}>{st.icon} {st.label}</span></div>
      </div>;})}
    </div>
  </div>;
}

// ===== HEAT MAP =====
function HeatMap({onStudent}) {
  const groups={urgent:[],["check-in"]:[],support:[],["on-track"]:[],thriving:[]};
  STUDENTS.forEach(s=>{if(groups[s.status])groups[s.status].push(s);});
  return <div><p style={{color:C.dim,fontSize:14,marginBottom:20,lineHeight:1.6}}>Tap any student for their full profile.</p>
    {Object.entries(groups).filter(([_,a])=>a.length>0).map(([status,arr])=>{const st=SM[status];return <div key={status} style={{marginBottom:16}}>
      <div style={{fontSize:11,color:st.color,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:10}}>{st.icon} {st.label} ({arr.length})</div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{arr.map((s,i)=><div key={i} onClick={()=>onStudent(s.name)} style={{...gc({cursor:"pointer",padding:"14px 18px",flex:"1 1 200px",minWidth:180,background:`linear-gradient(135deg,${st.bg},rgba(18,14,35,0.95))`,border:`1px solid ${st.color}20`})}}>
        <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:4}}>{s.name}</div>
        <div style={{fontSize:12,color:C.dim,lineHeight:1.5}}>{s.pattern.slice(0,80)}</div>
      </div>)}</div>
    </div>;})}
  </div>;
}

// ===== STUDENT PROFILE =====
function StudentProfile({name,onBack}) {
  const s=STUDENTS.find(st=>st.name===name); if(!s) return null; const st=SM[s.status];
  return <div>
    <button onClick={onBack} style={{background:"none",border:"1px solid rgba(167,139,250,0.15)",color:C.dim,padding:"6px 16px",borderRadius:10,cursor:"pointer",fontSize:13,marginBottom:20}}>← Back</button>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><h3 style={{fontFamily:"Georgia,serif",color:C.text,fontSize:22,margin:0}}>{s.name}</h3><span style={{fontSize:12,color:st.color,background:st.bg,padding:"3px 12px",borderRadius:10,fontWeight:600}}>{st.icon} {st.label}</span></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:16}}>
      {[{l:"Sessions",v:s.sessions,c:C.blue},{l:"Streak",v:`🔥 ${s.streak}`,c:C.warm},{l:"XP",v:`⭐ ${s.xp}`,c:C.gold}].map((x,i)=><div key={i} style={{...gc(),textAlign:"center"}}><div style={{fontSize:11,color:C.dim,marginBottom:4}}>{x.l}</div><div style={{fontFamily:"Georgia,serif",fontSize:24,color:x.c}}>{x.v}</div></div>)}
    </div>
    <div style={{...gc({marginBottom:16,background:"linear-gradient(135deg,rgba(167,139,250,0.1),rgba(18,14,35,0.95))",border:"1px solid rgba(167,139,250,0.25)"})}}>{lb("💡","Recommended next move",C.accent)}<div style={{fontSize:15,color:C.text,lineHeight:1.7}}>{s.intervention}</div></div>
    <div style={{...gc({marginBottom:16})}}>{lb("📊","What changed",C.peach)}<div style={{fontSize:14,lineHeight:1.6}}>{s.changed}</div></div>
    <div style={{...gc({marginBottom:16})}}>{lb("🔍","Learning pattern",C.warm)}<div style={{fontSize:14,lineHeight:1.6}}>{s.pattern}</div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <div style={gc()}><div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:12}}>Where they struggle</div>{s.struggles.length===0?<div style={{color:C.dim}}>None</div>:s.struggles.map((t,i)=><div key={i} style={{padding:"8px 0",fontSize:14,lineHeight:1.5,borderTop:i>0?"1px solid rgba(167,139,250,0.08)":"none"}}>• {t}</div>)}</div>
      <div style={gc()}><div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:12}}>What they're good at</div>{s.strengths.length===0?<div style={{color:C.dim}}>Building...</div>:s.strengths.map((t,i)=><div key={i} style={{padding:"8px 0",fontSize:14,lineHeight:1.5,borderTop:i>0?"1px solid rgba(167,139,250,0.08)":"none"}}>• {t}</div>)}</div>
    </div>
  </div>;
}

// ===== DOCUMENTATION =====
function Documentation() {
  const tags=["Behavior","Intervention","Accommodation","Parent Contact","Follow-up"];
  const [logs,setLogs]=useState([
    {student:"Sofia C.",tag:"Behavior",note:"Left seat 3 times during reading. Not disruptive — seemed restless.",date:"Today"},
    {student:"Zeke R.",tag:"Intervention",note:"Used color-coded fraction strips. Completed 4/5 problems correctly.",date:"Today"},
    {student:"Emma L.",tag:"Accommodation",note:"Extended time on writing assignment. Completed with encouragement.",date:"Yesterday"},
  ]);
  const [student,setStudent]=useState(STUDENTS[0].name);const [tag,setTag]=useState("Behavior");const [note,setNote]=useState("");
  const add=()=>{if(!note.trim())return;setLogs(p=>[{student,tag,note:note.trim(),date:"Just now"},...p]);setNote("");};
  const tagColors={Behavior:C.warm,Intervention:C.accent,Accommodation:C.blue,"Parent Contact":C.green,"Follow-up":C.peach};
  return <div>
    <p style={{color:C.dim,fontSize:14,marginBottom:16,lineHeight:1.6}}>Quick-log incidents, interventions, accommodations. These become part of each student's permanent record and inform the companion.</p>
    <div style={{...gc({marginBottom:16})}}>
      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        <select value={student} onChange={e=>setStudent(e.target.value)} style={{padding:"8px 14px",borderRadius:10,border:"1px solid rgba(167,139,250,0.15)",background:"rgba(11,10,20,0.8)",color:C.text,fontSize:13,outline:"none"}}>{STUDENTS.map(s=><option key={s.name} value={s.name}>{s.name}</option>)}</select>
        {tags.map(t=><button key={t} onClick={()=>setTag(t)} style={{padding:"5px 12px",borderRadius:8,border:tag===t?`2px solid ${tagColors[t]}`:"2px solid rgba(167,139,250,0.12)",background:"transparent",color:tag===t?tagColors[t]:C.dim,fontSize:11,fontWeight:600,cursor:"pointer"}}>{t}</button>)}
      </div>
      <input value={note} onChange={e=>setNote(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")add();}} placeholder="Quick note..." style={ipt}/>
      <button onClick={add} disabled={!note.trim()} style={ibtn(!!note.trim())}>Log</button>
    </div>
    {logs.map((l,i)=><div key={i} style={{...gc({marginBottom:10,padding:"14px 20px",display:"flex",gap:14,alignItems:"flex-start"})}}>
      <div style={{flex:1}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><span style={{fontSize:12,color:C.accent,fontWeight:600}}>{l.student}</span><span style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:`${tagColors[l.tag]}22`,color:tagColors[l.tag],fontWeight:600}}>{l.tag}</span></div>
      <div style={{fontSize:14,lineHeight:1.5}}>{l.note}</div><div style={{fontSize:11,color:C.dim,marginTop:3}}>{l.date}</div></div>
    </div>)}
  </div>;
}

// ===== FAMILY COMMUNICATION =====
function FamilyComm() {
  const [student,setStudent]=useState(STUDENTS[0].name);const [tone,setTone]=useState("warm");const [draft,setDraft]=useState("");const [busy,setBusy]=useState(false);
  const tones=["warm","formal","concise"];
  const generate = async () => {
    setBusy(true);
    const s = STUDENTS.find(st => st.name === student);
    try {
      // NOTE: client-side API call is for prototype only. Production must use a backend proxy.
      const d = await callClaude({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        system:
          `Write a parent email for a teacher about their student. Tone: ${tone}. ` +
          `Include what the student worked on, where they improved, what needs support, ` +
          `and how parents can help at home. Be specific using this data. Never generic.`,
        messages: [
          {
            role: "user",
            content:
              `Student: ${s.name}. Strengths: ${s.strengths.join(", ")}. ` +
              `Struggles: ${s.struggles.join(", ")}. Pattern: ${s.pattern}. ` +
              `Recent change: ${s.changed}. Intervention: ${s.intervention}`,
          },
        ],
      });
      setDraft(
        d.content?.filter(x => x.type === "text").map(x => x.text).join("\n") ||
          "Could not generate."
      );
    } catch {
      setDraft("Connection error. Try again.");
    }
    setBusy(false);
  };
  return <div>
    <p style={{color:C.dim,fontSize:14,marginBottom:16,lineHeight:1.6}}>Generate parent emails, conference prep, praise notes. Always review and edit before sending.</p>
    <div style={{...gc({marginBottom:16})}}>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <select value={student} onChange={e=>setStudent(e.target.value)} style={{padding:"8px 14px",borderRadius:10,border:"1px solid rgba(167,139,250,0.15)",background:"rgba(11,10,20,0.8)",color:C.text,fontSize:13,outline:"none"}}>{STUDENTS.map(s=><option key={s.name} value={s.name}>{s.name}</option>)}</select>
        {tones.map(t=><button key={t} onClick={()=>setTone(t)} style={{padding:"6px 14px",borderRadius:10,border:tone===t?`2px solid ${C.accent}`:"2px solid rgba(167,139,250,0.12)",background:"transparent",color:tone===t?C.accent:C.dim,fontSize:12,fontWeight:600,cursor:"pointer",textTransform:"capitalize"}}>{t}</button>)}
        <div style={{flex:1}}/>
        <button onClick={generate} disabled={busy} style={ibtn(!busy)}>{busy?"Drafting...":"Generate Draft"}</button>
      </div>
    </div>
    {draft&&<div style={{...gc()}}>
      {lb("📧","Draft — review before sending",C.green)}
      <textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={12} style={{...ipt,resize:"vertical",lineHeight:1.7,fontFamily:"'Source Sans 3',sans-serif",marginBottom:0}}/>
    </div>}
  </div>;
}

// ===== TEACHER NOTES =====
function TeacherNotes() {
  const [notes,setNotes]=useState([{student:"Sofia C.",note:"Rough morning — mom mentioned she didn't sleep",date:"Today"},{student:"Zeke R.",note:"Responded well to verbal praise in math group",date:"Yesterday"},{student:"Emma L.",note:"Parent concerned about reading — schedule conference",date:"Monday"}]);
  const [note,setNote]=useState("");const [student,setStudent]=useState(STUDENTS[0].name);
  const add=()=>{if(!note.trim())return;setNotes(p=>[{student,note:note.trim(),date:"Just now"},...p]);setNote("");};
  return <div>
    <p style={{color:C.dim,fontSize:14,marginBottom:16,lineHeight:1.6}}>Quick observations that feed into each student's companion memory.</p>
    <div style={{...gc({marginBottom:16})}}>
      <select value={student} onChange={e=>setStudent(e.target.value)} style={{padding:"8px 14px",borderRadius:10,border:"1px solid rgba(167,139,250,0.15)",background:"rgba(11,10,20,0.8)",color:C.text,fontSize:13,outline:"none",marginBottom:10}}>{STUDENTS.map(s=><option key={s.name} value={s.name}>{s.name}</option>)}</select>
      <input value={note} onChange={e=>setNote(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")add();}} placeholder="e.g. 'Rough morning', 'Responded well to praise'" style={ipt}/>
      <button onClick={add} disabled={!note.trim()} style={ibtn(!!note.trim())}>Add</button>
    </div>
    {notes.map((n,i)=><div key={i} style={{...gc({marginBottom:10,padding:"14px 20px",display:"flex",gap:14,alignItems:"flex-start"})}}>
      <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(167,139,250,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>📒</div>
      <div style={{flex:1}}><div style={{fontSize:12,color:C.accent,fontWeight:600,marginBottom:3}}>{n.student}</div><div style={{fontSize:14,lineHeight:1.5}}>{n.note}</div><div style={{fontSize:11,color:C.dim,marginTop:4}}>{n.date}</div></div>
    </div>)}
  </div>;
}

// ===== INSIGHTS =====
function Insights() {
  const improving=STUDENTS.filter(s=>s.status==="thriving"||s.status==="on-track");
  const plateauing=STUDENTS.filter(s=>s.status==="support");
  const declining=STUDENTS.filter(s=>s.status==="urgent"||s.status==="check-in");
  const interventions=[{what:"Visual scaffolding for fractions",who:"Zeke R.",result:"4/5 correct",status:"working"},{what:"Remove time pressure",who:"Maya T.",result:"Self-corrects with extra time",status:"working"},{what:"Pizza slice analogies",who:"Emma L.",result:"Breakthrough moment",status:"working"},{what:"Standard prompting",who:"Sofia C.",result:"Disengaging further",status:"not-working"}];
  return <div>
    <p style={{color:C.dim,fontSize:14,marginBottom:20,lineHeight:1.6}}>Class-wide patterns and intervention effectiveness. Updated as the companion learns.</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:16}}>
      <div style={{...gc(),textAlign:"center"}}><div style={{fontSize:28,marginBottom:6}}>📈</div><div style={{fontFamily:"Georgia,serif",fontSize:28,color:C.green}}>{improving.length}</div><div style={{fontSize:10,color:C.dim,marginTop:4,textTransform:"uppercase",letterSpacing:1}}>Improving</div></div>
      <div style={{...gc(),textAlign:"center"}}><div style={{fontSize:28,marginBottom:6}}>➡️</div><div style={{fontFamily:"Georgia,serif",fontSize:28,color:C.warm}}>{plateauing.length}</div><div style={{fontSize:10,color:C.dim,marginTop:4,textTransform:"uppercase",letterSpacing:1}}>Plateauing</div></div>
      <div style={{...gc(),textAlign:"center"}}><div style={{fontSize:28,marginBottom:6}}>📉</div><div style={{fontFamily:"Georgia,serif",fontSize:28,color:C.red}}>{declining.length}</div><div style={{fontSize:10,color:C.dim,marginTop:4,textTransform:"uppercase",letterSpacing:1}}>Declining</div></div>
    </div>
    <div style={{...gc({marginBottom:16})}}>{lb("🔬","Intervention effectiveness",C.accent)}
      {interventions.map((iv,i)=><div key={i} style={{padding:"12px 0",borderTop:i>0?"1px solid rgba(167,139,250,0.08)":"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div><div style={{fontSize:14,fontWeight:600}}>{iv.what}</div><div style={{fontSize:12,color:C.dim,marginTop:2}}>{iv.who} — {iv.result}</div></div>
        <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,fontWeight:600,background:iv.status==="working"?"rgba(110,231,160,0.12)":"rgba(248,113,113,0.12)",color:iv.status==="working"?C.green:C.red}}>{iv.status==="working"?"Working":"Adjust"}</span>
      </div>)}
    </div>
    <div style={gc()}>{lb("🧠","Class-wide patterns",C.blue)}
      <div style={{fontSize:14,lineHeight:1.7,color:C.text}}>
        <div style={{marginBottom:10}}>• <span style={{fontWeight:600}}>60% of class</span> struggled with multi-step word problems this week. Consider reteaching problem decomposition.</div>
        <div style={{marginBottom:10}}>• <span style={{fontWeight:600}}>Timed tasks</span> are causing anxiety in 2 students (Maya, Zeke). Consider untimed alternatives for formative checks.</div>
        <div>• <span style={{fontWeight:600}}>Visual scaffolding</span> is the most effective class-wide support right now — works for 4 of 6 students.</div>
      </div>
    </div>
  </div>;
}

// ===== QUESTIONS =====
function QuestionBank() {
  const [sel,setSel]=useState("Math");const [qs,setQs]=useState({Math:[{q:"What is 3/4 + 1/2?",a:"1 1/4"}],Science:[{q:"3 states of matter?",a:"Solid, liquid, gas"}],Reading:[],"Social Studies":[]});
  const [nq,setNq]=useState("");const [na,setNa]=useState("");const [ok,setOk]=useState(false);
  const add=()=>{if(!nq.trim())return;setQs(p=>({...p,[sel]:[...p[sel],{q:nq.trim(),a:na.trim()}]}));setNq("");setNa("");setOk(true);setTimeout(()=>setOk(false),2000);};
  return <div>
    <p style={{color:C.dim,fontSize:14,marginBottom:16}}>Woven naturally into companion conversations. Students never know.</p>
    <div style={{display:"flex",gap:8,marginBottom:16}}>{SUBJECTS.map(s=><button key={s} onClick={()=>setSel(s)} style={{padding:"8px 18px",borderRadius:12,border:sel===s?"2px solid rgba(167,139,250,0.5)":"2px solid rgba(167,139,250,0.12)",background:sel===s?"rgba(167,139,250,0.12)":"transparent",color:sel===s?C.accent:C.dim,fontSize:13,fontWeight:600,cursor:"pointer"}}>{s} ({qs[s]?.length||0})</button>)}</div>
    <div style={{...gc({marginBottom:16})}}><input value={nq} onChange={e=>setNq(e.target.value)} placeholder="Test question..." style={ipt}/><input value={na} onChange={e=>setNa(e.target.value)} placeholder="Expected answer (optional)" style={{...ipt,marginBottom:14}}/><button onClick={add} disabled={!nq.trim()} style={ibtn(!!nq.trim())}>Add</button>{ok&&<span style={{color:C.green,fontSize:13,marginLeft:12}}>✓</span>}</div>
    {qs[sel]?.map((item,i)=><div key={i} style={{...gc({marginBottom:10,padding:"14px 20px",display:"flex",justifyContent:"space-between",gap:12})}}><div><div style={{fontSize:14,fontWeight:600}}>{item.q}</div>{item.a&&<div style={{fontSize:12,color:C.green,marginTop:5}}>Expected: {item.a}</div>}</div><button onClick={()=>setQs(p=>({...p,[sel]:p[sel].filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:18,opacity:0.5}}>×</button></div>)}
  </div>;
}

// ===== AI ASSISTANT =====
function AIAssistant() {
  const [msgs,setMsgs]=useState([{role:"assistant",content:"Good afternoon! Sofia needs a check-in today — engagement dropped across all subjects, three sessions abandoned early. Want me to prep talking points for her, draft a parent email, or help plan tomorrow's lesson?"}]);
  const [inp,setInp]=useState("");const [busy,setBusy]=useState(false);const endRef=useRef(null);const inpRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  useEffect(()=>{if(!busy)inpRef.current?.focus();},[busy]);
  const send = async () => {
    if (!inp.trim() || busy) return;
    const nm = [...msgs, { role: "user", content: inp.trim() }];
    setMsgs(nm);
    setInp("");
    setBusy(true);
    try {
      // NOTE: client-side API call is for prototype only. Production must use a backend proxy.
      const d = await callClaude({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system:
          `You are an AI teaching copilot who knows every student personally through persistent memory. ` +
          `You speak like a trusted colleague. Be specific — name students, reference their patterns, ` +
          `suggest concrete next moves. You can draft parent emails, prep conference notes, suggest ` +
          `interventions, plan lessons, create differentiated materials. You know: Zeke (fractions/word ` +
          `problems, visual learner), Maya (timed anxiety, strong reader), Liam (thriving, curious about ` +
          `space), Sofia (sharp engagement drop, possible personal issue), Noah (subtraction borrowing, ` +
          `loves animals), Emma (high effort low skill, pizza analogies work). Be warm, practical, ` +
          `specific. Never generic.`,
        messages: nm.map(m => ({ role: m.role, content: m.content })),
      });
      setMsgs(p => [
        ...p,
        {
          role: "assistant",
          content:
            d.content?.filter(x => x.type === "text").map(x => x.text).join("\n") ||
            "Let me try again.",
        },
      ]);
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "Connection issue — try again?" }]);
    }
    setBusy(false);
  };
  const starters=["Prep Sofia's check-in","Draft parent email for Zeke","What should I reteach?","Plan a differentiated math activity","Write a praise note for Liam"];
  return <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 140px)"}}>
    <div style={{flex:1,overflowY:"auto",...gc({borderRadius:"20px 20px 0 0"}),padding:18,display:"flex",flexDirection:"column",gap:14}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:8,alignItems:"flex-start"}}>
        {m.role==="assistant"&&<div style={{width:36,height:36,borderRadius:"50%",overflow:"hidden",flexShrink:0,boxShadow:"0 0 20px rgba(167,139,250,0.3)"}}><img src={LOGO} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
        <div style={{maxWidth:"80%",padding:"12px 16px",borderRadius:16,fontSize:14,lineHeight:1.7,whiteSpace:"pre-wrap",color:C.text,...(m.role==="user"?{background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.3)",borderBottomRightRadius:4}:{background:"linear-gradient(135deg,rgba(26,20,50,0.8),rgba(18,14,35,0.9))",border:"1px solid rgba(167,139,250,0.1)",borderBottomLeftRadius:4})}}>{m.content}</div>
      </div>)}
      {busy&&<div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{width:36,height:36,borderRadius:"50%",overflow:"hidden"}}><img src={LOGO} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div><div style={{padding:"12px 16px",background:"rgba(18,14,35,0.9)",border:"1px solid rgba(167,139,250,0.1)",borderRadius:16,color:C.dim}}><span style={{animation:"pu 1.5s infinite"}}>thinking...</span></div></div>}
      <div ref={endRef}/>
    </div>
    {msgs.length<=1&&<div style={{display:"flex",gap:8,flexWrap:"wrap",padding:12,...gc({borderRadius:0,padding:12})}}>{starters.map((s,i)=><button key={i} onClick={()=>setInp(s)} style={{padding:"7px 16px",borderRadius:20,border:"1px solid rgba(167,139,250,0.15)",background:"transparent",color:C.dim,fontSize:12,cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(167,139,250,0.4)";e.currentTarget.style.color=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(167,139,250,0.15)";e.currentTarget.style.color=C.dim;}}>{s}</button>)}</div>}
    <div style={{display:"flex",gap:8,padding:14,...gc({borderRadius:"0 0 20px 20px",padding:14})}}>
      <input ref={inpRef} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask about any student, plan lessons, draft emails..." disabled={busy} style={{...ipt,marginBottom:0,flex:1}}/>
      <button onClick={send} disabled={busy||!inp.trim()} style={ibtn(!!inp.trim())}>Send</button>
    </div>
    <style>{`@keyframes pu{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
  </div>;
}

// ===== MAIN =====
export default function TeacherDashboard() {
  const [page,setPage]=useState("brief");const [sv,setSv]=useState(null);
  const [themeKey,setThemeKey]=useState("amethyst");
  const [showThemes,setShowThemes]=useState(false);
  TC = TEACHER_THEMES[themeKey];
  const accent = TC.accent;

  const titles={brief:"Today",students:"Students",heatmap:"Class Map",questions:"Question Bank",docs:"Documentation",family:"Family Communication",notes:"Teacher Notes",insights:"Insights",assistant:"AI Teaching Copilot"};
  const showStudent=(name)=>{setSv(name);setPage("students");};
  const getContent=()=>{
    if((page==="students"||page==="heatmap")&&sv) return <StudentProfile name={sv} onBack={()=>setSv(null)}/>;
    if(page==="brief") return <DailyBrief onStudent={showStudent}/>;
    if(page==="students") return <StudentsTable onStudent={showStudent}/>;
    if(page==="heatmap") return <HeatMap onStudent={showStudent}/>;
    if(page==="questions") return <QuestionBank/>;
    if(page==="docs") return <Documentation/>;
    if(page==="family") return <FamilyComm/>;
    if(page==="notes") return <TeacherNotes/>;
    if(page==="insights") return <Insights/>;
    if(page==="assistant") return <AIAssistant/>;
    return null;
  };
  return <div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 25% 15%,${TC.glow1},transparent 50%),radial-gradient(ellipse at 75% 65%,${TC.glow2},transparent 45%),${C.bg}`,fontFamily:"'Source Sans 3','Segoe UI',sans-serif",color:C.text}}>
    <div style={{display:"flex",alignItems:"center",padding:"18px 28px",borderBottom:`1px solid ${TC.border}`,background:`linear-gradient(180deg,${TC.card},${TC.bg}ee)`}}>
      <img src="data:image/png;base64,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" alt="Logo" style={{width:38,height:38,borderRadius:"50%",filter:`drop-shadow(0 0 12px ${TC.accent}99)`,marginRight:12}}/>
      <div><div style={{fontFamily:"Georgia,serif",fontSize:19,color:TC.accent,fontWeight:700,textShadow:`0 0 24px ${TC.accent}33`}}>Project Companion</div><div style={{fontSize:11,color:C.dim}}>Teacher Copilot</div></div><div style={{position:"relative",marginLeft:"auto"}}><button onClick={()=>setShowThemes(!showThemes)} style={{width:28,height:28,borderRadius:"50%",background:TC.accent,border:"2px solid rgba(255,255,255,0.2)",cursor:"pointer",boxShadow:`0 0 12px ${TC.accent}44`}} title="Change theme"/>{showThemes&&<div style={{position:"absolute",right:0,top:36,background:TC.card,border:`1px solid ${TC.border}`,borderRadius:14,padding:12,display:"flex",gap:8,zIndex:99,boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>{Object.entries(TEACHER_THEMES).map(([k,th])=><button key={k} onClick={()=>{setThemeKey(k);setShowThemes(false);}} style={{width:32,height:32,borderRadius:"50%",background:th.accent,border:themeKey===k?"3px solid #fff":"3px solid transparent",cursor:"pointer",transition:"all 0.2s",transform:themeKey===k?"scale(1.15)":"scale(1)"}} title={th.name}/>)}</div>}</div>
    </div>
    <div style={{display:"flex",gap:3,padding:"10px 20px",borderBottom:`1px solid ${TC.border}`,background:`${TC.bg}cc`,overflowX:"auto"}}>
      {NAV.map(n=><button key={n.id} onClick={()=>{setPage(n.id);setSv(null);}} style={{display:"flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:page===n.id?700:400,background:page===n.id?`${TC.accent}22`:"transparent",color:page===n.id?TC.accent:C.dim,transition:"all 0.2s",whiteSpace:"nowrap",boxShadow:page===n.id?`inset 0 -2px 0 ${TC.accent}88`:"none"}}><span style={{fontSize:14}}>{n.icon}</span>{n.label}</button>)}
    </div>
    <div style={{padding:"24px 28px",maxWidth:960,margin:"0 auto"}}>
      <h2 style={{fontFamily:"Georgia,serif",color:C.text,fontSize:24,marginBottom:22,fontWeight:600}}>{sv||titles[page]}</h2>
      {getContent()}
    </div>
  </div>;
}