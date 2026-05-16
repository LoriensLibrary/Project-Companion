import { useState, useRef, useEffect } from "react";

const AVATARS = {
  luna: { name: "Luna", emoji: "🐱", color: "#9b7fd4", desc: "A curious kitten who loves to learn" },
  cosmo: { name: "Cosmo", emoji: "🐶", color: "#5a9a6a", desc: "A loyal pup who never gives up" },
  sunny: { name: "Sunny", emoji: "🌻", color: "#c9a84c", desc: "A cheerful sunflower full of warmth" },
  bubbles: { name: "Bubbles", emoji: "🐠", color: "#4a7fb5", desc: "A playful fish who dives deep" },
};

const THEMES = {
  space: { name: "Space", emoji: "🚀", desc: "Explore the stars", accent: "#7c6fff", bg: "#0a0a1a", card: "#12102a", border: "#2a2550", bubble: "#1a1640", dim: "#6b68a0" },
  ocean: { name: "Ocean", emoji: "🌊", desc: "Dive into the deep", accent: "#22b8cf", bg: "#041520", card: "#0c2232", border: "#1a3a4a", bubble: "#0e2a3d", dim: "#5a8a9a" },
  forest: { name: "Forest", emoji: "🌲", desc: "Wander the woods", accent: "#66bb6a", bg: "#0a1208", card: "#142210", border: "#2a3a20", bubble: "#1a2e15", dim: "#6a9a5a" },
  candy: { name: "Candy Land", emoji: "🍭", desc: "Sweet and colorful", accent: "#ff6eb4", bg: "#1a0a1e", card: "#221530", border: "#3a2548", bubble: "#2a1a38", dim: "#a06a90" },
};

const SUBJECTS = {
  math: { name: "Math", icon: "🔢", color: "#c9a84c", topics: ["Help me with addition and subtraction", "I'm learning about shapes", "Fractions are confusing me", "Can we practice multiplication?", "Word problems are hard"] },
  science: { name: "Science", icon: "🔬", color: "#5a9a6a", topics: ["Tell me about animals", "How do plants grow?", "What is the water cycle?", "Why does the moon change shape?", "What are magnets?"] },
  reading: { name: "Reading", icon: "📚", color: "#9b7fd4", topics: ["Help me understand this story", "What does this word mean?", "I need help sounding out words", "Can we practice reading together?", "How do I write a sentence?"] },
  social: { name: "Social Studies", icon: "🌍", color: "#4a7fb5", topics: ["Tell me about a country", "What is a community?", "How does the government work?", "What happened in history today?", "Why do we have maps?"] },
};

const teacherQBank = { math: [], science: [], reading: [], social: [] };

function SpaceWorld() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", background: "linear-gradient(135deg, #0a0a1a, #1a1040, #0d0d2b)" }}>
      {Array.from({ length: 50 }, (_, i) => {
        const s = 1 + Math.random() * 3;
        return <div key={i} style={{ position: "absolute", left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, width: s, height: s, borderRadius: "50%", background: "#fff", opacity: 0.2+Math.random()*0.8, animation: `twinkle ${2+Math.random()*3}s ease-in-out ${Math.random()*4}s infinite alternate` }} />;
      })}
      <div style={{ position: "absolute", right: "8%", top: "5%", width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #f0e8d0, #d4c8a0)", boxShadow: "0 0 40px rgba(240,232,208,0.3)", animation: "moonBob 20s ease-in-out infinite alternate" }}>
        <div style={{ position: "absolute", left: "20%", top: "25%", width: 12, height: 12, borderRadius: "50%", background: "rgba(0,0,0,0.08)" }} />
        <div style={{ position: "absolute", left: "55%", top: "15%", width: 8, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.06)" }} />
        <div style={{ position: "absolute", left: "40%", top: "55%", width: 14, height: 14, borderRadius: "50%", background: "rgba(0,0,0,0.07)" }} />
      </div>
      {[0,1,2].map(i => <div key={`sh${i}`} style={{ position: "absolute", top: `${10+i*20}%`, left: "-10%", width: 80, height: 2, background: "linear-gradient(90deg, transparent, #fff, transparent)", animation: `shoot ${1.5+Math.random()}s linear ${5+i*7}s infinite` }} />)}
      <div style={{ position: "absolute", left: "15%", top: "30%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,255,0.08), transparent 70%)", animation: "breathe 15s ease-in-out infinite alternate" }} />
      <style>{`
        @keyframes twinkle{0%{opacity:0.2;transform:scale(0.8)}100%{opacity:1;transform:scale(1.3)}}
        @keyframes moonBob{0%{transform:translateY(0)}100%{transform:translateY(-12px)}}
        @keyframes shoot{0%{left:-10%;opacity:1}100%{left:110%;opacity:0}}
        @keyframes breathe{0%{transform:scale(1);opacity:0.5}100%{transform:scale(1.3);opacity:1}}
      `}</style>
    </div>
  );
}

function OceanWorld() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", background: "linear-gradient(180deg, #041520, #0a2a3a 40%, #082838 70%, #041822)" }}>
      {["20%","50%","75%"].map((l,i) => <div key={`r${i}`} style={{ position: "absolute", top: 0, left: l, width: 2+i, height: `${35+i*5}%`, background: "linear-gradient(180deg, rgba(34,184,207,0.15), transparent)", transform: `rotate(${-3+i*4}deg)`, animation: `rayPulse ${6+i*2}s ease-in-out ${i*2}s infinite` }} />)}
      {Array.from({ length: 30 }, (_, i) => {
        const sz = 4+Math.random()*18;
        return <div key={i} style={{ position: "absolute", left: `${Math.random()*100}%`, bottom: "-5%", width: sz, height: sz, borderRadius: "50%", border: `1px solid rgba(34,184,207,${0.15+Math.random()*0.2})`, background: `radial-gradient(circle at 30% 30%, rgba(34,184,207,${0.08+Math.random()*0.15}), transparent)`, animation: `rise ${6+Math.random()*10}s ease-in ${Math.random()*12}s infinite` }} />;
      })}
      {["5%","15%","85%","92%"].map((l,i) => <div key={`sw${i}`} style={{ position: "absolute", bottom: 0, left: l, fontSize: 30+i*5, opacity: 0.12, animation: `sway ${4+i}s ease-in-out ${i*0.5}s infinite alternate` }}>🌿</div>)}
      <div style={{ position: "absolute", bottom: "15%", fontSize: 20, opacity: 0.18, animation: "swim 22s linear infinite" }}>🐟</div>
      <div style={{ position: "absolute", bottom: "30%", fontSize: 16, opacity: 0.14, animation: "swim 28s linear 6s infinite" }}>🐠</div>
      <div style={{ position: "absolute", bottom: "45%", fontSize: 14, opacity: 0.1, animation: "swim 32s linear 12s infinite" }}>🐡</div>
      <style>{`
        @keyframes rise{0%{bottom:-5%;opacity:0}15%{opacity:1}85%{opacity:0.5}100%{bottom:105%;opacity:0}}
        @keyframes sway{0%{transform:rotate(-5deg)}100%{transform:rotate(5deg)}}
        @keyframes swim{0%{left:-10%}100%{left:110%}}
        @keyframes rayPulse{0%,100%{opacity:0.3}50%{opacity:1}}
      `}</style>
    </div>
  );
}

function ForestWorld() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", background: "linear-gradient(180deg, #0a1208, #152a10 50%, #0d1a0a)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 50, height: "100%", background: "linear-gradient(180deg, rgba(102,187,106,0.08), transparent)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 50, height: "100%", background: "linear-gradient(180deg, rgba(102,187,106,0.08), transparent)" }} />
      {[["2%",80],["9%",60],["88%",70],["95%",55]].map(([l,sz],i) => <div key={`t${i}`} style={{ position: "absolute", bottom: 0, left: l, fontSize: sz, opacity: 0.1, animation: `treeSway ${8+i*2}s ease-in-out ${i}s infinite alternate` }}>{i%2===0?"🌲":"🌳"}</div>)}
      {Array.from({length:18},(_,i) => <div key={`l${i}`} style={{ position: "absolute", left: `${Math.random()*100}%`, top: "-5%", fontSize: 12+Math.random()*14, opacity: 0.22, animation: `leafDrift ${8+Math.random()*12}s linear ${Math.random()*15}s infinite` }}>{["🍃","🍂","🌿","🍀"][i%4]}</div>)}
      {Array.from({length:8},(_,i) => <div key={`f${i}`} style={{ position: "absolute", left: `${15+Math.random()*70}%`, top: `${20+Math.random()*60}%`, width: 4, height: 4, borderRadius: "50%", background: "#c8e66e", boxShadow: "0 0 8px #c8e66e, 0 0 16px rgba(200,230,110,0.3)", animation: `firefly ${3+Math.random()*4}s ease-in-out ${Math.random()*5}s infinite alternate` }} />)}
      <div style={{ position: "absolute", bottom: "2%", left: "22%", fontSize: 22, opacity: 0.12 }}>🍄</div>
      <div style={{ position: "absolute", bottom: "1%", left: "65%", fontSize: 18, opacity: 0.1 }}>🍄</div>
      <style>{`
        @keyframes treeSway{0%{transform:rotate(-1deg)}100%{transform:rotate(1deg)}}
        @keyframes leafDrift{0%{top:-5%;opacity:0;transform:rotate(0deg) translateX(0)}10%{opacity:0.25}100%{top:105%;opacity:0;transform:rotate(360deg) translateX(40px)}}
        @keyframes firefly{0%{opacity:0.1;transform:translate(0,0)}50%{opacity:0.8}100%{opacity:0.2;transform:translate(20px,-15px)}}
      `}</style>
    </div>
  );
}

function CandyWorld() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", background: "linear-gradient(135deg, #1a0a1e, #2a1035 50%, #180a20)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #ff6eb4, #ff9a44, #ffda44, #66bb6a, #4a7fb5, #9b7fd4, #ff6eb4)", opacity: 0.4 }} />
      {Array.from({length:12},(_,i) => <div key={`sp${i}`} style={{ position: "absolute", left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, fontSize: 8+Math.random()*12, color: "#ff6eb4", opacity: 0.1+Math.random()*0.2, animation: `sparkPop ${2+Math.random()*3}s ease-in-out ${Math.random()*5}s infinite` }}>✦</div>)}
      {Array.from({length:22},(_,i) => {
        const em = ["🍬","🍭","🧁","🍩","🍪","⭐","💖","🌈","✨","🎀"];
        return <div key={`c${i}`} style={{ position: "absolute", left: `${Math.random()*100}%`, top: "-8%", fontSize: 14+Math.random()*16, opacity: 0.2, animation: `candyDrop ${10+Math.random()*15}s linear ${Math.random()*20}s infinite` }}>{em[i%em.length]}</div>;
      })}
      <div style={{ position: "absolute", bottom: "5%", left: "5%", fontSize: 40, opacity: 0.1, animation: "spin 8s linear infinite" }}>🍭</div>
      <div style={{ position: "absolute", bottom: "8%", right: "8%", fontSize: 35, opacity: 0.08, animation: "spin 10s linear 2s infinite reverse" }}>🍭</div>
      <style>{`
        @keyframes sparkPop{0%,100%{opacity:0.1;transform:scale(0.5) rotate(0deg)}50%{opacity:0.4;transform:scale(1.3) rotate(180deg)}}
        @keyframes candyDrop{0%{top:-8%;opacity:0;transform:rotate(0deg)}10%{opacity:0.22}90%{opacity:0.12}100%{top:108%;opacity:0;transform:rotate(360deg)}}
        @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}

function WorldBg({ theme }) {
  if (theme === "space") return <SpaceWorld />;
  if (theme === "ocean") return <OceanWorld />;
  if (theme === "forest") return <ForestWorld />;
  if (theme === "candy") return <CandyWorld />;
  return null;
}

function Chat({ avatar, name, subject, subjectKey, starter, theme, onBack, onHome }) {
  const t = THEMES[theme];
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(true);
  const [mem, setMem] = useState({ struggles: [] });
  const [turn, setTurn] = useState(0);
  const endRef = useRef(null);
  const inpRef = useRef(null);

  const tq = () => { const qs = teacherQBank[subjectKey]||[]; if (!qs.length) return ""; const q = qs[turn%qs.length]; return `\nTEACHER INJECTION: Weave naturally. Question: "${q.question}" ${q.answer?`Answer: "${q.answer}"`:""}`;};
  const sysp = `You are ${avatar.name}, a learning companion for ${name} (ages 5-12). Subject: ${subject.name}. Started with: "${starter}". RULES: NEVER give direct answers. Socratic method. Warm, patient. 2-3 sentences max. Celebrate effort.${tq()}${mem.struggles.length?`\nStruggles: ${mem.struggles.join(", ")}`:""}`;

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,system:sysp,messages:[{role:"user",content:starter}]})});
        const d = await r.json(); const txt = d.content?.filter(x=>x.type==="text").map(x=>x.text).join("\n")||`Hey ${name}! Let's do ${subject.name}! ${avatar.emoji}`;
        setMsgs([{role:"user",content:starter,hide:true},{role:"assistant",content:txt}]);
      } catch { setMsgs([{role:"assistant",content:`Hey ${name}! Ready for ${subject.name}! ${avatar.emoji}`}]); }
      setBusy(false);
    })();
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({behavior:"smooth"}); }, [msgs]);
  useEffect(() => { if (!busy) inpRef.current?.focus(); }, [busy]);

  const send = async () => {
    if (!inp.trim()||busy) return;
    const um = {role:"user",content:inp.trim()}; const nm=[...msgs,um];
    setMsgs(nm); setInp(""); setBusy(true); setTurn(n=>n+1);
    try {
      const h = nm.filter(m=>!m.hide||m.role==="user").map(m=>({role:m.role,content:m.content}));
      const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sysp,messages:h})});
      const d = await r.json(); const txt = d.content?.filter(x=>x.type==="text").map(x=>x.text).join("\n")||"Can you try again?";
      setMsgs(p=>[...p,{role:"assistant",content:txt}]);
      if(um.content.toLowerCase().match(/hard|confused|don't understand/)) setMem(p=>({...p,struggles:[...new Set([...p.struggles,um.content.slice(0,40)])].slice(-5)}));
    } catch { setMsgs(p=>[...p,{role:"assistant",content:`Oops! Try again? ${avatar.emoji}`}]); }
    setBusy(false);
  };

  const vis = msgs.filter(m=>!m.hide);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:`linear-gradient(135deg,${t.bg},${t.card},${t.bg})`,fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",position:"relative"}}>
      <WorldBg theme={theme} />
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:`1px solid ${t.border}`,background:`${t.bg}ee`,backdropFilter:"blur(10px)",zIndex:1}}>
        <button onClick={onHome} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"5px 10px",borderRadius:6,cursor:"pointer",fontSize:12}}>🏠</button>
        <button onClick={onBack} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"5px 10px",borderRadius:6,cursor:"pointer",fontSize:12}}>←</button>
        <span style={{fontSize:24}}>{avatar.emoji}</span>
        <div style={{flex:1}}>
          <div style={{fontWeight:600,color:avatar.color,fontFamily:"Georgia,serif",fontSize:15}}>{avatar.name}</div>
          <div style={{fontSize:11,color:t.dim}}>{subject.icon} {subject.name}</div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:14,zIndex:1}}>
        {vis.map((m,i) => (
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:8,alignItems:"flex-start"}}>
            {m.role==="assistant"&&<div style={{width:32,height:32,borderRadius:"50%",background:avatar.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,boxShadow:`0 0 12px ${avatar.color}44`}}>{avatar.emoji}</div>}
            <div style={{maxWidth:"78%",padding:"10px 14px",borderRadius:14,fontSize:14,lineHeight:1.6,...(m.role==="user"?{background:t.accent+"22",border:`1px solid ${t.accent}44`,borderBottomRightRadius:4}:{background:t.bubble,border:`1px solid ${t.border}`,borderBottomLeftRadius:4})}}>{m.content}</div>
          </div>
        ))}
        {busy&&<div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{width:32,height:32,borderRadius:"50%",background:avatar.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{avatar.emoji}</div><div style={{padding:"10px 14px",background:t.bubble,border:`1px solid ${t.border}`,borderRadius:14,color:t.dim,fontSize:13}}><span style={{animation:"pulse 1.5s infinite"}}>thinking...</span></div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${t.border}`,background:`${t.bg}ee`,zIndex:1}}>
        <div style={{display:"flex",gap:8,maxWidth:700,margin:"0 auto"}}>
          <input ref={inpRef} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder={`Ask ${avatar.name}...`} disabled={busy} style={{flex:1,padding:"10px 14px",borderRadius:10,border:`1px solid ${t.border}`,background:t.card,color:"#e8e6e1",fontSize:14,outline:"none"}}/>
          <button onClick={send} disabled={busy||!inp.trim()} style={{padding:"10px 18px",borderRadius:10,border:"none",background:inp.trim()?t.accent:t.border,color:inp.trim()?"#fff":t.dim,fontSize:14,fontWeight:600,cursor:inp.trim()?"pointer":"default"}}>Send</button>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
    </div>
  );
}

function NameScreen({name,setName,onNext}) {
  return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0c0c0f,#1a1530,#0c0c0f)",fontFamily:"'Source Sans 3',sans-serif"}}>
    <div style={{textAlign:"center",maxWidth:400}}>
      <div style={{fontSize:48,marginBottom:16}}>👋</div>
      <h1 style={{fontFamily:"Georgia,serif",color:"#c9a84c",fontSize:28,marginBottom:8}}>Welcome to Project Companion</h1>
      <p style={{color:"#9a978f",marginBottom:32,fontSize:15}}>What's your name?</p>
      <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&name.trim()&&onNext()} placeholder="Type your name..." autoFocus style={{width:"100%",padding:"14px 18px",borderRadius:12,border:"1px solid #2a2a30",background:"#141418",color:"#e8e6e1",fontSize:18,textAlign:"center",outline:"none",marginBottom:16}}/>
      <button onClick={()=>name.trim()&&onNext()} disabled={!name.trim()} style={{padding:"12px 32px",borderRadius:12,border:"none",background:name.trim()?"#9b7fd4":"#2a2a30",color:name.trim()?"#fff":"#7d7a71",fontSize:16,fontWeight:600,cursor:name.trim()?"pointer":"default"}}>Next →</button>
    </div>
  </div>;
}

function AvatarScreen({name,onPick}) {
  return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0c0c0f,#1a1530,#0c0c0f)",fontFamily:"'Source Sans 3',sans-serif"}}>
    <div style={{textAlign:"center",maxWidth:600,padding:20}}>
      <h1 style={{fontFamily:"Georgia,serif",color:"#c9a84c",fontSize:28,marginBottom:8}}>Hey {name}!</h1>
      <p style={{color:"#9a978f",marginBottom:32,fontSize:15}}>Choose your learning companion</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {Object.entries(AVATARS).map(([k,av])=><button key={k} onClick={()=>onPick(av)} style={{background:"#1e1a2e",border:"2px solid #2a2a30",borderRadius:16,padding:"24px 16px",cursor:"pointer",transition:"all 0.2s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=av.color;e.currentTarget.style.boxShadow=`0 0 20px ${av.color}22`;}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a30";e.currentTarget.style.boxShadow="none";}}>
          <div style={{fontSize:48,marginBottom:8}}>{av.emoji}</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:20,color:av.color,fontWeight:600,marginBottom:4}}>{av.name}</div>
          <div style={{fontSize:13,color:"#7d7a71"}}>{av.desc}</div>
        </button>)}
      </div>
    </div>
  </div>;
}

function ThemeScreen({onPick}) {
  return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0c0c0f,#1a1530,#0c0c0f)",fontFamily:"'Source Sans 3',sans-serif"}}>
    <div style={{textAlign:"center",maxWidth:600,padding:20}}>
      <h1 style={{fontFamily:"Georgia,serif",color:"#c9a84c",fontSize:28,marginBottom:8}}>Pick Your World</h1>
      <p style={{color:"#9a978f",marginBottom:32,fontSize:15}}>Choose a theme for your learning space</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {Object.entries(THEMES).map(([k,th])=><button key={k} onClick={()=>onPick(k)} style={{background:`linear-gradient(135deg,${th.bg},${th.card})`,border:`2px solid ${th.border}`,borderRadius:16,padding:"28px 16px",cursor:"pointer",transition:"all 0.3s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=th.accent;e.currentTarget.style.boxShadow=`0 0 30px ${th.accent}33`;e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
          <div style={{fontSize:48,marginBottom:10}}>{th.emoji}</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:20,color:th.accent,fontWeight:600,marginBottom:4}}>{th.name}</div>
          <div style={{fontSize:13,color:"#9a978f"}}>{th.desc}</div>
        </button>)}
      </div>
    </div>
  </div>;
}

function SubjectScreen({avatar,name,theme,onPick,onHome}) {
  const t = THEMES[theme];
  const [sel,setSel] = useState(null);
  if (sel) {
    const subj = SUBJECTS[sel];
    return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${t.bg},${t.card},${t.bg})`,fontFamily:"'Source Sans 3',sans-serif",position:"relative"}}>
      <WorldBg theme={theme}/>
      <div style={{textAlign:"center",maxWidth:500,padding:20,zIndex:1}}>
        <button onClick={()=>setSel(null)} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:13,marginBottom:20}}>← Back</button>
        <div style={{fontSize:48,marginBottom:8}}>{subj.icon}</div>
        <h2 style={{fontFamily:"Georgia,serif",color:subj.color,fontSize:24,marginBottom:20}}>{subj.name}</h2>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {subj.topics.map((topic,i)=><button key={i} onClick={()=>onPick(subj,sel,topic)} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"14px 18px",cursor:"pointer",color:"#e8e6e1",fontSize:15,textAlign:"left",transition:"all 0.2s",display:"flex",alignItems:"center",gap:10}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.background=t.accent+"15";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.background=t.card;}}>
            <span style={{width:28,height:28,borderRadius:"50%",background:t.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,color:t.accent,fontWeight:700}}>{i+1}</span>{topic}
          </button>)}
        </div>
      </div>
    </div>;
  }
  return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${t.bg},${t.card},${t.bg})`,fontFamily:"'Source Sans 3',sans-serif",position:"relative"}}>
    <WorldBg theme={theme}/>
    <div style={{textAlign:"center",maxWidth:550,padding:20,zIndex:1}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:24}}>
        <span style={{fontSize:36}}>{avatar.emoji}</span>
        <div><h1 style={{fontFamily:"Georgia,serif",color:t.accent,fontSize:24,margin:0}}>Hi {name}!</h1><p style={{color:t.dim,fontSize:13,margin:0}}>{avatar.name} is ready</p></div>
      </div>
      <p style={{color:"#9a978f",fontSize:16,marginBottom:24}}>Pick a class</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {Object.entries(SUBJECTS).map(([k,subj])=><button key={k} onClick={()=>setSel(k)} style={{background:t.card,border:`2px solid ${t.border}`,borderRadius:16,padding:"24px 14px",cursor:"pointer",transition:"all 0.2s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
          <div style={{fontSize:36,marginBottom:8}}>{subj.icon}</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:17,color:subj.color,fontWeight:600}}>{subj.name}</div>
        </button>)}
      </div>
    </div>
  </div>;
}

function TeacherPanel({onBack}) {
  const [sel,setSel]=useState(null);const [q,setQ]=useState("");const [a,setA]=useState("");
  const [qs,setQs]=useState({...teacherQBank});const [ok,setOk]=useState(false);
  const add=()=>{if(!q.trim()||!sel)return;const u={...qs,[sel]:[...qs[sel],{question:q.trim(),answer:a.trim()}]};setQs(u);teacherQBank[sel]=u[sel];setQ("");setA("");setOk(true);setTimeout(()=>setOk(false),2000);};
  const rm=(s,i)=>{const u={...qs,[s]:qs[s].filter((_,j)=>j!==i)};setQs(u);teacherQBank[s]=u[s];};
  return <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0c0c0f,#1a1530,#0c0c0f)",fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",padding:20}}>
    <div style={{maxWidth:700,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button onClick={onBack} style={{background:"none",border:"1px solid #2a2a30",color:"#9a978f",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:13}}>← Back</button>
        <h1 style={{fontFamily:"Georgia,serif",color:"#c9a84c",fontSize:24,margin:0}}>Teacher Dashboard</h1>
      </div>
      <div style={{background:"#1e1a2e",border:"1px solid #2a2a30",borderRadius:12,padding:16,marginBottom:24,fontSize:13,color:"#9a978f",lineHeight:1.6}}>💡 Add test questions. The companion weaves them naturally into conversations. Students won't know they're prepping.</div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {Object.entries(SUBJECTS).map(([k,subj])=><button key={k} onClick={()=>setSel(k)} style={{flex:1,padding:10,borderRadius:10,cursor:"pointer",border:sel===k?`2px solid ${subj.color}`:"2px solid #2a2a30",background:sel===k?subj.color+"22":"#141418",color:sel===k?subj.color:"#7d7a71",fontSize:13,fontWeight:600}}>{subj.icon} ({qs[k]?.length||0})</button>)}
      </div>
      {sel&&<>
        <div style={{background:"#1e1a2e",border:"1px solid #2a2a30",borderRadius:12,padding:16,marginBottom:20}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Test question..." style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #2a2a30",background:"#141418",color:"#e8e6e1",fontSize:14,outline:"none",marginBottom:10}}/>
          <input value={a} onChange={e=>setA(e.target.value)} placeholder="Expected answer (optional)" style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #2a2a30",background:"#141418",color:"#e8e6e1",fontSize:14,outline:"none",marginBottom:12}}/>
          <button onClick={add} disabled={!q.trim()} style={{padding:"8px 20px",borderRadius:8,border:"none",background:q.trim()?SUBJECTS[sel].color:"#2a2a30",color:q.trim()?"#fff":"#7d7a71",fontSize:14,fontWeight:600}}>Add</button>
          {ok&&<span style={{color:"#5a9a6a",fontSize:13,marginLeft:10}}>✓</span>}
        </div>
        {qs[sel]?.map((item,i)=><div key={i} style={{background:"#141418",border:"1px solid #2a2a30",borderRadius:10,padding:"12px 14px",marginBottom:8,display:"flex",justifyContent:"space-between",gap:10}}>
          <div><div style={{fontSize:14}}>{item.question}</div>{item.answer&&<div style={{fontSize:12,color:"#5a9a6a"}}>Answer: {item.answer}</div>}</div>
          <button onClick={()=>rm(sel,i)} style={{background:"none",border:"none",color:"#b54a4a",cursor:"pointer",fontSize:16}}>×</button>
        </div>)}
      </>}
    </div>
  </div>;
}

export default function ProjectCompanion() {
  const [view,setView]=useState("student");
  const [step,setStep]=useState("name");
  const [studentName,setStudentName]=useState("");
  const [avatar,setAvatar]=useState(null);
  const [theme,setTheme]=useState(null);
  const [chat,setChat]=useState(null);

  const reset=()=>{setStep("name");setAvatar(null);setTheme(null);setChat(null);};

  const Toggle=()=><div style={{position:"fixed",top:12,right:16,zIndex:999,display:"flex",gap:4,background:"#141418",border:"1px solid #2a2a30",borderRadius:8,padding:3}}>
    <button onClick={()=>{setView("student");reset();}} style={{padding:"5px 12px",borderRadius:6,border:"none",fontSize:12,background:view==="student"?"#9b7fd4":"transparent",color:view==="student"?"#fff":"#7d7a71",cursor:"pointer"}}>Student</button>
    <button onClick={()=>setView("teacher")} style={{padding:"5px 12px",borderRadius:6,border:"none",fontSize:12,background:view==="teacher"?"#c9a84c":"transparent",color:view==="teacher"?"#0c0c0f":"#7d7a71",cursor:"pointer"}}>Teacher</button>
  </div>;

  if(view==="teacher") return <><Toggle/><TeacherPanel onBack={()=>setView("student")}/></>;
  if(step==="name") return <><Toggle/><NameScreen name={studentName} setName={setStudentName} onNext={()=>setStep("avatar")}/></>;
  if(step==="avatar") return <><Toggle/><AvatarScreen name={studentName} onPick={av=>{setAvatar(av);setStep("theme");}}/></>;
  if(step==="theme") return <><Toggle/><ThemeScreen onPick={t=>{setTheme(t);setStep("subjects");}}/></>;
  if(step==="subjects"&&!chat) return <><Toggle/><SubjectScreen avatar={avatar} name={studentName} theme={theme} onPick={(s,k,st)=>setChat({subject:s,subjectKey:k,starter:st})} onHome={reset}/></>;
  if(chat) return <><Toggle/><Chat avatar={avatar} name={studentName} subject={chat.subject} subjectKey={chat.subjectKey} starter={chat.starter} theme={theme} onBack={()=>setChat(null)} onHome={reset}/></>;
  return null;
}
