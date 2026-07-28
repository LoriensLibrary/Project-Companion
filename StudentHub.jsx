import { useState, useRef, useEffect } from "react";
import { callClaude } from "./lib/callClaude.js";
import { useCamaMemory } from "./lib/useCamaMemory.js";
import { STATES, REGIONS, NORTH_AMERICA, buildQuestion } from "./data/statedex.js";

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
const FUN_FACTS = [
  "🐙 An octopus has three hearts and blue blood!",
  "⚡ A bolt of lightning is five times hotter than the surface of the sun!",
  "🦴 You have 206 bones — but babies are born with about 270!",
  "🌍 Earth spins at over 1,000 mph but you don't feel it!",
  "🐝 Honey never spoils. 3,000-year-old honey was still good!",
  "🧠 Your brain uses 20% of all your body's energy!",
  "🦈 Sharks have been around longer than trees!",
  "🌙 The Moon moves away from Earth 1.5 inches per year!",
  "🐋 A blue whale's heart is the size of a small car!",
  "🦋 Butterflies taste with their feet!",
  "⭐ More stars in the universe than grains of sand on Earth!",
  "🐘 Elephants are the only animals that can't jump!",
  "🌈 You can't reach the end of a rainbow — it moves as you move!",
  "🦎 Geckos stick to walls with millions of tiny hairs on their feet!",
  "🐙 An octopus can change color in less than a second!",
];
const TEACHER_NOTES = [
  { date: "Today", message: "Book reports are due Friday!", type: "reminder" },
  { date: "Yesterday", message: "Great job on the math quiz, everyone!", type: "praise" },
];
const MATERIALS = [
  { title: "How Volcanoes Work", type: "video", icon: "🎬", subject: "Science", duration: "4 min", desc: "Watch a volcano erupt and learn why!" },
  { title: "Explore the Solar System", type: "vr", icon: "🥽", subject: "Science", duration: "8 min", desc: "Fly past all 8 planets in VR!" },
  { title: "Multiplication Made Easy", type: "video", icon: "🎬", subject: "Math", duration: "5 min", desc: "Learn tricks to multiply fast." },
  { title: "Walk Through Ancient Egypt", type: "vr", icon: "🥽", subject: "Social Studies", duration: "10 min", desc: "Explore pyramids and the Nile River." },
  { title: "How Plants Grow", type: "video", icon: "🎬", subject: "Science", duration: "3 min", desc: "From seed to flower — watch it happen!" },
  { title: "Fraction Pizza Party", type: "video", icon: "🎬", subject: "Math", duration: "6 min", desc: "Learn fractions by slicing pizza." },
  { title: "Ocean Deep Dive", type: "vr", icon: "🥽", subject: "Science", duration: "7 min", desc: "Swim with whales and explore coral reefs." },
  { title: "Story Time: The Brave Mouse", type: "video", icon: "🎬", subject: "Reading", duration: "8 min", desc: "Listen to a story about courage." },
  { title: "Map Adventures", type: "vr", icon: "🥽", subject: "Social Studies", duration: "6 min", desc: "Travel the world and learn about continents." },
  { title: "Phonics Fun: Letter Sounds", type: "video", icon: "🎬", subject: "Reading", duration: "4 min", desc: "Practice sounding out letters!" },
];
const teacherQBank = { math: [], science: [], reading: [], social: [] };

// ===== ANIMATED WORLDS =====
function SpaceWorld() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {Array.from({length:50},(_,i)=>{const s=1+Math.random()*3;return <div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,width:s,height:s,borderRadius:"50%",background:"#fff",opacity:0.2+Math.random()*0.8,animation:`tw ${2+Math.random()*3}s ease-in-out ${Math.random()*4}s infinite alternate`}}/>})}
      <div style={{position:"absolute",right:"8%",top:"5%",width:70,height:70,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#f0e8d0,#d4c8a0)",boxShadow:"0 0 40px rgba(240,232,208,0.3)",animation:"mb 20s ease-in-out infinite alternate"}}>
        <div style={{position:"absolute",left:"20%",top:"25%",width:12,height:12,borderRadius:"50%",background:"rgba(0,0,0,0.08)"}}/>
        <div style={{position:"absolute",left:"55%",top:"15%",width:8,height:8,borderRadius:"50%",background:"rgba(0,0,0,0.06)"}}/>
        <div style={{position:"absolute",left:"40%",top:"55%",width:14,height:14,borderRadius:"50%",background:"rgba(0,0,0,0.07)"}}/>
      </div>
      {[0,1,2].map(i=><div key={`s${i}`} style={{position:"absolute",top:`${10+i*20}%`,left:"-10%",width:80,height:2,background:"linear-gradient(90deg,transparent,#fff,transparent)",animation:`sh ${1.5+Math.random()}s linear ${5+i*7}s infinite`}}/>)}
      <div style={{position:"absolute",left:"15%",top:"30%",width:250,height:250,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,111,255,0.08),transparent 70%)",animation:"br 15s ease-in-out infinite alternate"}}/>
      <style>{`@keyframes tw{0%{opacity:0.2;transform:scale(0.8)}100%{opacity:1;transform:scale(1.3)}}@keyframes mb{0%{transform:translateY(0)}100%{transform:translateY(-12px)}}@keyframes sh{0%{left:-10%;opacity:1}100%{left:110%;opacity:0}}@keyframes br{0%{transform:scale(1);opacity:0.5}100%{transform:scale(1.3);opacity:1}}`}</style>
    </div>
  );
}
function OceanWorld() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {["20%","50%","75%"].map((l,i)=><div key={`r${i}`} style={{position:"absolute",top:0,left:l,width:2+i,height:`${35+i*5}%`,background:"linear-gradient(180deg,rgba(34,184,207,0.15),transparent)",transform:`rotate(${-3+i*4}deg)`,animation:`rp ${6+i*2}s ease-in-out ${i*2}s infinite`}}/>)}
      {Array.from({length:30},(_,i)=>{const sz=4+Math.random()*18;return <div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,bottom:"-5%",width:sz,height:sz,borderRadius:"50%",border:`1px solid rgba(34,184,207,${0.15+Math.random()*0.2})`,background:`radial-gradient(circle at 30% 30%,rgba(34,184,207,${0.08+Math.random()*0.15}),transparent)`,animation:`ri ${6+Math.random()*10}s ease-in ${Math.random()*12}s infinite`}}/>})}
      {["5%","15%","85%","92%"].map((l,i)=><div key={`w${i}`} style={{position:"absolute",bottom:0,left:l,fontSize:30+i*5,opacity:0.12,animation:`sw ${4+i}s ease-in-out ${i*0.5}s infinite alternate`}}>🌿</div>)}
      <div style={{position:"absolute",bottom:"15%",fontSize:20,opacity:0.18,animation:"sm 22s linear infinite"}}>🐟</div>
      <div style={{position:"absolute",bottom:"30%",fontSize:16,opacity:0.14,animation:"sm 28s linear 6s infinite"}}>🐠</div>
      <div style={{position:"absolute",bottom:"45%",fontSize:14,opacity:0.1,animation:"sm 32s linear 12s infinite"}}>🐡</div>
      <style>{`@keyframes ri{0%{bottom:-5%;opacity:0}15%{opacity:1}85%{opacity:0.5}100%{bottom:105%;opacity:0}}@keyframes sw{0%{transform:rotate(-5deg)}100%{transform:rotate(5deg)}}@keyframes sm{0%{left:-10%}100%{left:110%}}@keyframes rp{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
    </div>
  );
}
function ForestWorld() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,width:50,height:"100%",background:"linear-gradient(180deg,rgba(102,187,106,0.08),transparent)"}}/>
      <div style={{position:"absolute",top:0,right:0,width:50,height:"100%",background:"linear-gradient(180deg,rgba(102,187,106,0.08),transparent)"}}/>
      {[["2%",80],["9%",60],["88%",70],["95%",55]].map(([l,sz],i)=><div key={`t${i}`} style={{position:"absolute",bottom:0,left:l,fontSize:sz,opacity:0.1,animation:`ts ${8+i*2}s ease-in-out ${i}s infinite alternate`}}>{i%2===0?"🌲":"🌳"}</div>)}
      {Array.from({length:18},(_,i)=><div key={`l${i}`} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-5%",fontSize:12+Math.random()*14,opacity:0.22,animation:`ld ${8+Math.random()*12}s linear ${Math.random()*15}s infinite`}}>{["🍃","🍂","🌿","🍀"][i%4]}</div>)}
      {Array.from({length:8},(_,i)=><div key={`f${i}`} style={{position:"absolute",left:`${15+Math.random()*70}%`,top:`${20+Math.random()*60}%`,width:4,height:4,borderRadius:"50%",background:"#c8e66e",boxShadow:"0 0 8px #c8e66e,0 0 16px rgba(200,230,110,0.3)",animation:`ff ${3+Math.random()*4}s ease-in-out ${Math.random()*5}s infinite alternate`}}/>)}
      <div style={{position:"absolute",bottom:"2%",left:"22%",fontSize:22,opacity:0.12}}>🍄</div>
      <div style={{position:"absolute",bottom:"1%",left:"65%",fontSize:18,opacity:0.1}}>🍄</div>
      <style>{`@keyframes ts{0%{transform:rotate(-1deg)}100%{transform:rotate(1deg)}}@keyframes ld{0%{top:-5%;opacity:0;transform:rotate(0deg) translateX(0)}10%{opacity:0.25}100%{top:105%;opacity:0;transform:rotate(360deg) translateX(40px)}}@keyframes ff{0%{opacity:0.1;transform:translate(0,0)}50%{opacity:0.8}100%{opacity:0.2;transform:translate(20px,-15px)}}`}</style>
    </div>
  );
}
function CandyWorld() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#ff6eb4,#ff9a44,#ffda44,#66bb6a,#4a7fb5,#9b7fd4,#ff6eb4)",opacity:0.4}}/>
      {Array.from({length:12},(_,i)=><div key={`p${i}`} style={{position:"absolute",left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,fontSize:8+Math.random()*12,color:"#ff6eb4",opacity:0.1+Math.random()*0.2,animation:`sp ${2+Math.random()*3}s ease-in-out ${Math.random()*5}s infinite`}}>✦</div>)}
      {Array.from({length:22},(_,i)=>{const em=["🍬","🍭","🧁","🍩","🍪","⭐","💖","🌈","✨","🎀"];return <div key={`c${i}`} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-8%",fontSize:14+Math.random()*16,opacity:0.2,animation:`cd ${10+Math.random()*15}s linear ${Math.random()*20}s infinite`}}>{em[i%em.length]}</div>})}
      <div style={{position:"absolute",bottom:"5%",left:"5%",fontSize:40,opacity:0.1,animation:"sn 8s linear infinite"}}>🍭</div>
      <div style={{position:"absolute",bottom:"8%",right:"8%",fontSize:35,opacity:0.08,animation:"sn 10s linear 2s infinite reverse"}}>🍭</div>
      <style>{`@keyframes sp{0%,100%{opacity:0.1;transform:scale(0.5) rotate(0deg)}50%{opacity:0.4;transform:scale(1.3) rotate(180deg)}}@keyframes cd{0%{top:-8%;opacity:0;transform:rotate(0deg)}10%{opacity:0.22}90%{opacity:0.12}100%{top:108%;opacity:0;transform:rotate(360deg)}}@keyframes sn{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
function WorldBg({theme}) {
  if(theme==="space") return <SpaceWorld/>;
  if(theme==="ocean") return <OceanWorld/>;
  if(theme==="forest") return <ForestWorld/>;
  if(theme==="candy") return <CandyWorld/>;
  return null;
}
const BG = (t) => `linear-gradient(135deg,${t.bg},${t.card},${t.bg})`;

// ===== CHAT =====
function Chat({ avatar, name, subject, subjectKey, starter, t, themeKey, onBack }) {
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(true);
  const [turn, setTurn] = useState(0);
  const endRef = useRef(null);
  const inpRef = useRef(null);
  const tq = () => {
    const qs = teacherQBank[subjectKey] || [];
    if (!qs.length) return "";
    const q = qs[turn % qs.length];
    return `\nTEACHER INJECTION: Weave naturally. Question: "${q.question}" ${q.answer ? `Answer: "${q.answer}"` : ""}`;
  };
  const sysp =
    `You are ${avatar.name}, a learning companion for ${name} (ages 5-12). ` +
    `Subject: ${subject.name}. Started with: "${starter}". ` +
    `RULES: NEVER give direct answers. Socratic method. Warm, patient. ` +
    `2-3 sentences max.${tq()}`;
  useEffect(() => {
    (async () => {
      try {
        // NOTE: client-side API call is for prototype only. Production must use a backend proxy.
        const d = await callClaude({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: sysp,
          messages: [{ role: "user", content: starter }],
        });
        const txt =
          d.content?.filter(x => x.type === "text").map(x => x.text).join("\n") ||
          `Hey ${name}! ${avatar.emoji}`;
        setMsgs([
          { role: "user", content: starter, hide: true },
          { role: "assistant", content: txt },
        ]);
      } catch {
        setMsgs([{ role: "assistant", content: `Hey ${name}! Ready for ${subject.name}! ${avatar.emoji}` }]);
      }
      setBusy(false);
    })();
  }, []);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  useEffect(()=>{if(!busy)inpRef.current?.focus();},[busy]);
  const send = async () => {
    if (!inp.trim() || busy) return;
    const um = { role: "user", content: inp.trim() };
    const nm = [...msgs, um];
    setMsgs(nm);
    setInp("");
    setBusy(true);
    setTurn(n => n + 1);
    try {
      const h = nm
        .filter(m => !m.hide || m.role === "user")
        .map(m => ({ role: m.role, content: m.content }));
      // NOTE: client-side API call is for prototype only. Production must use a backend proxy.
      const d = await callClaude({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: sysp,
        messages: h,
      });
      setMsgs(p => [
        ...p,
        {
          role: "assistant",
          content:
            d.content?.filter(x => x.type === "text").map(x => x.text).join("\n") ||
            "Try again?",
        },
      ]);
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: `Oops! ${avatar.emoji}` }]);
    }
    setBusy(false);
  };
  const vis=msgs.filter(m=>!m.hide);
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",position:"relative"}}>
      <WorldBg theme={themeKey}/>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:`1px solid ${t.border}`,background:`${t.bg}ee`,backdropFilter:"blur(10px)",zIndex:1}}>
        <button onClick={onBack} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontSize:12}}>← Back</button>
        <span style={{fontSize:24}}>{avatar.emoji}</span>
        <div style={{flex:1}}><div style={{fontWeight:600,color:avatar.color,fontFamily:"Georgia,serif",fontSize:15}}>{avatar.name}</div><div style={{fontSize:11,color:t.dim}}>{subject.icon} {subject.name}</div></div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:14,zIndex:1}}>
        {vis.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:8,alignItems:"flex-start"}}>
          {m.role==="assistant"&&<div style={{width:32,height:32,borderRadius:"50%",background:avatar.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,boxShadow:`0 0 12px ${avatar.color}44`}}>{avatar.emoji}</div>}
          <div style={{maxWidth:"78%",padding:"10px 14px",borderRadius:14,fontSize:14,lineHeight:1.6,...(m.role==="user"?{background:t.accent+"22",border:`1px solid ${t.accent}44`,borderBottomRightRadius:4}:{background:t.bubble,border:`1px solid ${t.border}`,borderBottomLeftRadius:4})}}>{m.content}</div>
        </div>)}
        {busy&&<div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{width:32,height:32,borderRadius:"50%",background:avatar.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{avatar.emoji}</div><div style={{padding:"10px 14px",background:t.bubble,border:`1px solid ${t.border}`,borderRadius:14,color:t.dim,fontSize:13}}><span style={{animation:"pu 1.5s infinite"}}>thinking...</span></div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${t.border}`,background:`${t.bg}ee`,zIndex:1}}>
        <div style={{display:"flex",gap:8,maxWidth:700,margin:"0 auto"}}>
          <input ref={inpRef} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder={`Ask ${avatar.name}...`} disabled={busy} style={{flex:1,padding:"10px 14px",borderRadius:10,border:`1px solid ${t.border}`,background:t.card,color:"#e8e6e1",fontSize:14,outline:"none"}}/>
          <button onClick={send} disabled={busy||!inp.trim()} style={{padding:"10px 18px",borderRadius:10,border:"none",background:inp.trim()?t.accent:t.border,color:inp.trim()?"#fff":t.dim,fontSize:14,fontWeight:600,cursor:inp.trim()?"pointer":"default"}}>Send</button>
        </div>
      </div>
      <style>{`@keyframes pu{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
    </div>
  );
}

// ===== CLASSES =====
function Classes({avatar,name,t,themeKey,onPick,onBack}) {
  const [sel,setSel]=useState(null);
  if(sel){const subj=SUBJECTS[sel];return(
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",position:"relative"}}>
      <WorldBg theme={themeKey}/>
      <div style={{textAlign:"center",maxWidth:500,padding:20,zIndex:1}}>
        <button onClick={()=>setSel(null)} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:13,marginBottom:20}}>← Back</button>
        <div style={{fontSize:48,marginBottom:8}}>{subj.icon}</div>
        <h2 style={{fontFamily:"Georgia,serif",color:subj.color,fontSize:24,marginBottom:20}}>{subj.name}</h2>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {subj.topics.map((topic,i)=><button key={i} onClick={()=>onPick(subj,sel,topic)} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"14px 18px",cursor:"pointer",color:"#e8e6e1",fontSize:15,textAlign:"left",transition:"all 0.2s",display:"flex",alignItems:"center",gap:10}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.background=t.accent+"15";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.background=t.card;}}>
            <span style={{width:28,height:28,borderRadius:"50%",background:t.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,color:t.accent,fontWeight:700}}>{i+1}</span>{topic}
          </button>)}
        </div>
      </div>
    </div>
  );}
  return(
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",position:"relative"}}>
      <WorldBg theme={themeKey}/>
      <div style={{textAlign:"center",maxWidth:550,padding:20,zIndex:1}}>
        <button onClick={onBack} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:13,marginBottom:20}}>← Back to Hub</button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:24}}>
          <span style={{fontSize:36}}>{avatar.emoji}</span>
          <h1 style={{fontFamily:"Georgia,serif",color:t.accent,fontSize:24,margin:0}}>My Classes</h1>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {Object.entries(SUBJECTS).map(([k,subj])=><button key={k} onClick={()=>setSel(k)} style={{background:t.card,border:`2px solid ${t.border}`,borderRadius:16,padding:"24px 14px",cursor:"pointer",transition:"all 0.2s",textAlign:"center"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            <div style={{fontSize:36,marginBottom:8}}>{subj.icon}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:17,color:subj.color,fontWeight:600}}>{subj.name}</div>
          </button>)}
        </div>
      </div>
    </div>
  );
}

// ===== HUB =====
function Hub({avatar,name,t,themeKey,onNavigate}) {
  const [factIdx,setFactIdx]=useState(Math.floor(Math.random()*FUN_FACTS.length));
  const [showFacts,setShowFacts]=useState(false);
  const newFact=()=>{let n=factIdx;while(n===factIdx)n=Math.floor(Math.random()*FUN_FACTS.length);setFactIdx(n);};
  const items=[
    {id:"classes",icon:"📚",label:"My Classes",desc:"Jump into a subject",color:"#c9a84c"},
    {id:"games",icon:"🎮",label:"Games",desc:"Learn while you play",color:"#ff6eb4"},
    {id:"materials",icon:"🎬",label:"Videos & VR",desc:"Watch and explore",color:"#22b8cf"},
    {id:"progress",icon:"📊",label:"My Progress",desc:"See how far you've come",color:"#66bb6a"},
  ];
  return(
    <div style={{minHeight:"100vh",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",position:"relative"}}>
      <WorldBg theme={themeKey}/>
      <div style={{padding:20,position:"relative",zIndex:1}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24,paddingBottom:16,borderBottom:`1px solid ${t.border}`}}>
            <div style={{width:50,height:50,borderRadius:"50%",background:avatar.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:`0 0 16px ${avatar.color}44`}}>{avatar.emoji}</div>
            <div style={{flex:1}}><div style={{fontFamily:"Georgia,serif",fontSize:22,color:t.accent,fontWeight:600}}>Welcome back, {name}!</div><div style={{fontSize:13,color:t.dim}}>{avatar.name} is here to learn with you</div></div>
          </div>
          {/* Fun Fact */}
          <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:16,padding:"18px 20px",marginBottom:16,position:"relative",overflow:"hidden",backdropFilter:"blur(8px)"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${t.accent},${avatar.color})`}}/>
            <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
              <span style={{fontSize:24}}>{avatar.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:t.accent,fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Fun Fact</div>
                <div style={{fontSize:15,lineHeight:1.6,marginBottom:8}}>{FUN_FACTS[factIdx]}</div>
                <div style={{display:"flex",gap:12}}>
                  <button onClick={newFact} style={{background:"none",border:"none",color:t.accent,fontSize:12,cursor:"pointer",padding:0}}>🔄 Another</button>
                  <button onClick={()=>setShowFacts(!showFacts)} style={{background:"none",border:"none",color:t.dim,fontSize:12,cursor:"pointer",padding:0}}>{showFacts?"Less":"More"}</button>
                </div>
                {showFacts&&<div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>{FUN_FACTS.filter((_,i)=>i!==factIdx).map((f,i)=><div key={i} style={{fontSize:13,color:t.dim,paddingLeft:12,borderLeft:`2px solid ${t.border}`,lineHeight:1.5}}>{f}</div>)}</div>}
              </div>
            </div>
          </div>
          {/* Teacher Notes */}
          <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:16,padding:"16px 20px",marginBottom:16,backdropFilter:"blur(8px)"}}>
            <div style={{fontSize:11,color:"#c9a84c",fontWeight:700,marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>📝 From Your Teacher</div>
            {TEACHER_NOTES.map((n,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"10px 0",borderTop:i>0?`1px solid ${t.border}`:"none"}}>
              <div style={{width:8,height:8,borderRadius:"50%",marginTop:6,flexShrink:0,background:n.type==="reminder"?"#ff9a44":"#66bb6a"}}/>
              <div><div style={{fontSize:14,lineHeight:1.5}}>{n.message}</div><div style={{fontSize:11,color:t.dim,marginTop:2}}>{n.date}</div></div>
            </div>)}
          </div>
          {/* Featured: Learnmon */}
          <button onClick={()=>onNavigate("learnmon")} style={{width:"100%",display:"flex",alignItems:"center",gap:14,background:`linear-gradient(135deg,${t.accent}33,${avatar.color}22)`,border:`2px solid ${t.accent}66`,borderRadius:16,padding:"16px 18px",marginBottom:16,cursor:"pointer",textAlign:"left",color:"#e8e6e1",transition:"all 0.2s",backdropFilter:"blur(8px)"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 0 22px ${t.accent}33`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.accent+"66";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <span style={{fontSize:40,flexShrink:0,animation:"hubfloat 3s ease-in-out infinite"}}>🗺️</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:10,color:t.accent,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>New Adventure</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:t.accent}}>Learnmon: North America</div>
              <div style={{fontSize:12,color:t.dim,lineHeight:1.4}}>Explore the continent and catch all 50 states!</div>
            </div>
            <span style={{fontSize:22,color:t.accent,flexShrink:0}}>→</span>
          </button>
          <style>{`@keyframes hubfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
          {/* Nav Grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
            {items.map(item=><button key={item.id} onClick={()=>onNavigate(item.id)} style={{background:`${t.card}dd`,border:`2px solid ${t.border}`,borderRadius:16,padding:"24px 16px",cursor:"pointer",transition:"all 0.2s",textAlign:"center",backdropFilter:"blur(8px)"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=item.color;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 0 20px ${item.color}22`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{fontSize:36,marginBottom:8}}>{item.icon}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:17,color:item.color,fontWeight:600,marginBottom:4}}>{item.label}</div>
              <div style={{fontSize:12,color:t.dim}}>{item.desc}</div>
            </button>)}
          </div>
          {/* Materials */}
          <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:16,padding:"16px 20px",marginBottom:16,backdropFilter:"blur(8px)"}}>
            <div style={{fontSize:11,color:"#22b8cf",fontWeight:700,marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>🎬 Videos & VR</div>
            {MATERIALS.map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,background:t.bubble,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;}}>
              <span style={{fontSize:24}}>{m.icon}</span>
              <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{m.title}</div><div style={{fontSize:11,color:t.dim}}>{m.subject}</div></div>
              <span style={{fontSize:10,padding:"3px 8px",borderRadius:8,fontWeight:700,background:m.type==="vr"?"#9b7fd422":"#22b8cf22",color:m.type==="vr"?"#9b7fd4":"#22b8cf"}}>{m.type==="vr"?"VR":"VIDEO"}</span>
            </div>)}
          </div>
          <div style={{textAlign:"center",padding:"20px 0",color:t.dim,fontSize:13}}>
            <span style={{fontSize:22}}>{avatar.emoji}</span>
            <div style={{marginTop:6}}>{avatar.name} says: "You're doing awesome, {name}!"</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== ONBOARDING =====
function NameScreen({name,setName,onNext}) {
  return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0c0c0f,#1a1530,#0c0c0f)",fontFamily:"'Source Sans 3',sans-serif"}}>
    <div style={{textAlign:"center",maxWidth:400}}><div style={{fontSize:48,marginBottom:16}}>👋</div>
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
      <p style={{color:"#9a978f",marginBottom:32,fontSize:15}}>Choose your companion</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {Object.entries(AVATARS).map(([k,av])=><button key={k} onClick={()=>onPick(av)} style={{background:"#1e1a2e",border:"2px solid #2a2a30",borderRadius:16,padding:"24px 16px",cursor:"pointer",transition:"all 0.2s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=av.color;}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a30";}}>
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
      <p style={{color:"#9a978f",marginBottom:32,fontSize:15}}>Choose your learning space</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {Object.entries(THEMES).map(([k,th])=><button key={k} onClick={()=>onPick(k)} style={{background:`linear-gradient(135deg,${th.bg},${th.card})`,border:`2px solid ${th.border}`,borderRadius:16,padding:"28px 16px",cursor:"pointer",transition:"all 0.3s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=th.accent;e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="none";}}>
          <div style={{fontSize:48,marginBottom:10}}>{th.emoji}</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:20,color:th.accent,fontWeight:600,marginBottom:4}}>{th.name}</div>
          <div style={{fontSize:13,color:"#9a978f"}}>{th.desc}</div>
        </button>)}
      </div>
    </div>
  </div>;
}

// ===== PROGRESS =====
function Progress({avatar,name,t,themeKey,onBack}) {
  const streak = 5;
  const totalXP = 340;
  const level = Math.floor(totalXP / 100) + 1;
  const xpInLevel = totalXP % 100;
  const subjects = [
    { name: "Math", icon: "🔢", sessions: 8, topics: ["Addition", "Shapes", "Multiplication"], color: "#c9a84c", mastery: 65 },
    { name: "Science", icon: "🔬", sessions: 5, topics: ["Water Cycle", "Animals", "Magnets"], color: "#5a9a6a", mastery: 45 },
    { name: "Reading", icon: "📚", sessions: 3, topics: ["Vocabulary", "Comprehension"], color: "#9b7fd4", mastery: 30 },
    { name: "Social Studies", icon: "🌍", sessions: 2, topics: ["Communities"], color: "#4a7fb5", mastery: 20 },
  ];
  const badges = [
    { emoji: "🌟", label: "First Chat", earned: true },
    { emoji: "🔥", label: "3-Day Streak", earned: true },
    { emoji: "🧠", label: "10 Sessions", earned: true },
    { emoji: "💎", label: "5-Day Streak", earned: true },
    { emoji: "🏆", label: "All Subjects", earned: false },
    { emoji: "🚀", label: "25 Sessions", earned: false },
  ];
  // Recent Activity is the first surface in this prototype wired to a real
  // CAMA call. The hook reads from a local CAMA dashboard via /api/cama/data
  // (proxied in vite.config.js) and falls back to the fictional list below
  // when CAMA isn't reachable, so the demo still runs without a backend.
  const fallbackRecentActivity = [
    { subject: "Math", topic: "Multiplication", time: "Today", icon: "🔢" },
    { subject: "Science", topic: "Water Cycle", time: "Yesterday", icon: "🔬" },
    { subject: "Math", topic: "Shapes", time: "2 days ago", icon: "🔢" },
    { subject: "Reading", topic: "Vocabulary", time: "3 days ago", icon: "📚" },
  ];
  const { topics: recentActivity, source: recentActivitySource } =
    useCamaMemory(name, { fallbackTopics: fallbackRecentActivity });

  return (
    <div style={{minHeight:"100vh",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",position:"relative"}}>
      <WorldBg theme={themeKey}/>
      <div style={{padding:20,position:"relative",zIndex:1}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <button onClick={onBack} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:13}}>← Hub</button>
            <h1 style={{fontFamily:"Georgia,serif",color:t.accent,fontSize:22,margin:0}}>My Progress</h1>
          </div>

          {/* Stats row */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
            <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:14,padding:16,textAlign:"center",backdropFilter:"blur(8px)"}}>
              <div style={{fontSize:28,marginBottom:4}}>🔥</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:26,color:"#ff9a44",fontWeight:700}}>{streak}</div>
              <div style={{fontSize:11,color:t.dim}}>Day Streak</div>
            </div>
            <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:14,padding:16,textAlign:"center",backdropFilter:"blur(8px)"}}>
              <div style={{fontSize:28,marginBottom:4}}>⭐</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:26,color:"#c9a84c",fontWeight:700}}>{totalXP}</div>
              <div style={{fontSize:11,color:t.dim}}>Total XP</div>
            </div>
            <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:14,padding:16,textAlign:"center",backdropFilter:"blur(8px)"}}>
              <div style={{fontSize:28,marginBottom:4}}>🏅</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:26,color:t.accent,fontWeight:700}}>Lv {level}</div>
              <div style={{fontSize:11,color:t.dim}}>Level</div>
            </div>
          </div>

          {/* XP bar */}
          <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:14,padding:"14px 18px",marginBottom:16,backdropFilter:"blur(8px)"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:12,color:t.dim}}>Level {level}</span>
              <span style={{fontSize:12,color:t.accent}}>{xpInLevel}/100 XP to Level {level+1}</span>
            </div>
            <div style={{height:10,borderRadius:5,background:t.border,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${xpInLevel}%`,borderRadius:5,background:`linear-gradient(90deg,${t.accent},${avatar.color})`,transition:"width 1s ease"}}/>
            </div>
          </div>

          {/* Subject mastery */}
          <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:14,padding:"16px 18px",marginBottom:16,backdropFilter:"blur(8px)"}}>
            <div style={{fontSize:11,color:t.accent,fontWeight:700,marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>📚 Subject Mastery</div>
            {subjects.map((s,i)=>(
              <div key={i} style={{marginBottom:i<subjects.length-1?14:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:18}}>{s.icon}</span>
                    <span style={{fontSize:14,fontWeight:600,color:s.color}}>{s.name}</span>
                  </div>
                  <span style={{fontSize:12,color:t.dim}}>{s.sessions} sessions</span>
                </div>
                <div style={{height:8,borderRadius:4,background:t.border,overflow:"hidden",marginBottom:4}}>
                  <div style={{height:"100%",width:`${s.mastery}%`,borderRadius:4,background:s.color,transition:"width 1s ease"}}/>
                </div>
                <div style={{fontSize:11,color:t.dim}}>Topics: {s.topics.join(", ")}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:14,padding:"16px 18px",marginBottom:16,backdropFilter:"blur(8px)"}}>
            <div style={{fontSize:11,color:"#c9a84c",fontWeight:700,marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>🏆 Badges</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              {badges.map((b,i)=>(
                <div key={i} style={{textAlign:"center",padding:12,borderRadius:10,border:`1px solid ${b.earned?t.accent+"44":t.border}`,background:b.earned?"transparent":t.bubble,opacity:b.earned?1:0.4}}>
                  <div style={{fontSize:28,marginBottom:4,filter:b.earned?"none":"grayscale(100%)"}}>{b.emoji}</div>
                  <div style={{fontSize:11,color:b.earned?t.accent:t.dim}}>{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:14,padding:"16px 18px",marginBottom:16,backdropFilter:"blur(8px)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <div style={{fontSize:11,color:"#66bb6a",fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>🕐 Recent Activity</div>
              <div title={recentActivitySource === "cama" ? "Live data from your local CAMA backend" : "Sample data — start CAMA locally to see real memory"} style={{fontSize:10,fontWeight:700,letterSpacing:0.5,padding:"3px 8px",borderRadius:10,background: recentActivitySource === "cama" ? "#66bb6a22" : `${t.dim}22`,color: recentActivitySource === "cama" ? "#66bb6a" : t.dim,border:`1px solid ${recentActivitySource === "cama" ? "#66bb6a55" : t.border}`}}>
                {recentActivitySource === "cama" ? "CAMA · LIVE" : "SAMPLE"}
              </div>
            </div>
            {recentActivity.map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:i>0?`1px solid ${t.border}`:"none"}}>
                <span style={{fontSize:20}}>{a.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600}}>{a.topic}</div>
                  <div style={{fontSize:11,color:t.dim}}>{a.subject}</div>
                </div>
                <span style={{fontSize:11,color:t.dim}}>{a.time}</span>
              </div>
            ))}
          </div>

          {/* Companion note */}
          <div style={{textAlign:"center",padding:"16px 0",color:t.dim,fontSize:13}}>
            <span style={{fontSize:22}}>{avatar.emoji}</span>
            <div style={{marginTop:6}}>{avatar.name} says: "Look how much you've learned, {name}! Keep going!"</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== GAMES =====
function Games({avatar,name,t,themeKey,onBack}) {
  const [game,setGame]=useState(null);const [stage,setStage]=useState(null);const [level,setLevel]=useState(null);
  const [progress,setProgress]=useState({quiz:{},math:{},scramble:{},memory:{}});
  const unlock=(g,s,l)=>{const k=`${s}-${l}`;return s===0&&l===0?true:(progress[g]||{})[k==="0-0"?k:`${l===0?s-1:s}-${l===0?2:l-1}`]>=1;};
  const best=(g,s,l)=>(progress[g]||{})[`${s}-${l}`]||0;
  const saveBest=(g,s,l,stars)=>{const k=`${s}-${l}`;setProgress(p=>({...p,[g]:{...p[g],[k]:Math.max(p[g][k]||0,stars)}}));};
  const games=[
    {id:"quiz",icon:"❓",title:"Quick Quiz",desc:"Test what you know!",color:"#c9a84c",stages:["Easy","Medium","Hard"]},
    {id:"math",icon:"⚡",title:"Math Flash",desc:"How fast can you solve?",color:"#ff6eb4",stages:["Addition","Subtraction","Multiplication"]},
    {id:"scramble",icon:"🔤",title:"Word Scramble",desc:"Unscramble the word!",color:"#22b8cf",stages:["3-4 Letters","5-6 Letters","7+ Letters"]},
    {id:"memory",icon:"🧠",title:"Memory Match",desc:"Find the matching pairs!",color:"#66bb6a",stages:["4 Pairs","6 Pairs","8 Pairs"]},
  ];
  const stageEmoji=["🌱","🌿","🌳"];

  // === QUIZ DATA BY STAGE/LEVEL ===
  const quizBank=[[
    [{q:"What is 2 + 3?",o:["4","5","6"],a:1},{q:"How many legs does a dog have?",o:["2","4","6"],a:1},{q:"What color is the sky?",o:["Green","Blue","Red"],a:1},{q:"Which is bigger: cat or elephant?",o:["Cat","Elephant"],a:1},{q:"How many days in a week?",o:["5","6","7"],a:2}],
    [{q:"What is 5 + 7?",o:["11","12","13"],a:1},{q:"Which animal lives in water?",o:["Dog","Fish","Bird"],a:1},{q:"How many months in a year?",o:["10","11","12"],a:2},{q:"What do plants need to grow?",o:["Candy","Sunlight","Music"],a:1},{q:"Which shape has 3 sides?",o:["Square","Triangle","Circle"],a:1}],
    [{q:"What is 8 + 9?",o:["16","17","18"],a:1},{q:"What is the largest land animal?",o:["Giraffe","Elephant","Horse"],a:1},{q:"How many sides does a square have?",o:["3","4","5"],a:1},{q:"Where does the sun rise?",o:["West","North","East"],a:2},{q:"What season comes after winter?",o:["Summer","Spring","Fall"],a:1}],
  ],[
    [{q:"What is 12 + 15?",o:["25","27","29"],a:1},{q:"What planet is closest to the sun?",o:["Earth","Mercury","Mars"],a:1},{q:"What is H₂O?",o:["Milk","Water","Juice"],a:1},{q:"How many continents?",o:["5","6","7"],a:2},{q:"What gas do plants breathe?",o:["Oxygen","CO₂","Nitrogen"],a:1}],
    [{q:"What is 7 × 4?",o:["24","28","32"],a:1},{q:"Which ocean is largest?",o:["Atlantic","Pacific","Indian"],a:1},{q:"What are baby frogs called?",o:["Puppies","Tadpoles","Cubs"],a:1},{q:"How many bones in the human body?",o:["106","206","306"],a:1},{q:"What is the hardest natural substance?",o:["Gold","Iron","Diamond"],a:2}],
    [{q:"What is 15 × 3?",o:["35","45","55"],a:1},{q:"What is Earth's largest desert?",o:["Sahara","Antarctic","Gobi"],a:1},{q:"How many teeth do adults have?",o:["28","32","36"],a:1},{q:"What causes tides?",o:["Wind","Moon","Sun"],a:1},{q:"What is the speed of light?",o:["Fast","Very fast","186,000 mi/s"],a:2}],
  ],[
    [{q:"What is 144 ÷ 12?",o:["10","12","14"],a:1},{q:"What is the chemical symbol for gold?",o:["Go","Au","Gd"],a:1},{q:"Who painted the Mona Lisa?",o:["Picasso","Da Vinci","Monet"],a:1},{q:"What's the smallest prime number?",o:["1","2","3"],a:1},{q:"How many hearts does an octopus have?",o:["1","2","3"],a:2}],
    [{q:"What is 25% of 200?",o:["25","50","75"],a:1},{q:"What layer protects Earth from UV?",o:["Troposphere","Ozone","Mesosphere"],a:1},{q:"What year did WW2 end?",o:["1943","1945","1947"],a:1},{q:"What is the powerhouse of the cell?",o:["Nucleus","Mitochondria","Ribosome"],a:1},{q:"How many symphonies did Beethoven write?",o:["7","9","12"],a:1}],
    [{q:"What is √169?",o:["11","12","13"],a:2},{q:"What is the longest river?",o:["Amazon","Nile","Mississippi"],a:1},{q:"In what year was the internet invented?",o:["1969","1983","1991"],a:0},{q:"What element has atomic number 6?",o:["Carbon","Nitrogen","Oxygen"],a:0},{q:"How many moons does Jupiter have?",o:["16","79","95"],a:2}],
  ]];

  // === QUIZ GAME ===
  function QuizLevel({si,li,onDone}) {
    const qs=quizBank[si][li];const [qi,setQi]=useState(0);const [score,setScore]=useState(0);const [picked,setPicked]=useState(null);const [done,setDone]=useState(false);
    const cur=qs[qi];
    const pick=(i)=>{if(picked!==null)return;setPicked(i);if(i===cur.a)setScore(s=>s+1);setTimeout(()=>{if(qi<qs.length-1){setQi(q=>q+1);setPicked(null);}else setDone(true);},1000);};
    if(done){const stars=score===qs.length?3:score>=qs.length*0.6?2:score>=1?1:0;return <LevelComplete stars={stars} score={score} total={qs.length} onDone={()=>onDone(stars)}/>;}
    return <div style={{maxWidth:500,margin:"0 auto",padding:20}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><span style={{fontSize:12,color:t.dim}}>Q{qi+1}/{qs.length}</span><span style={{fontSize:14,color:"#c9a84c",fontWeight:600}}>⭐ {score}</span></div>
      <div style={{background:t.bubble,border:`1px solid ${t.border}`,borderRadius:16,padding:20,marginBottom:16,textAlign:"center"}}><div style={{fontSize:18,fontWeight:600,lineHeight:1.5}}>{cur.q}</div></div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {cur.o.map((o,i)=>{const correct=picked!==null&&i===cur.a;const wrong=picked===i&&i!==cur.a;return <button key={i} onClick={()=>pick(i)} style={{padding:"14px 16px",borderRadius:12,border:correct?"2px solid #6ee7a0":wrong?"2px solid #f87171":`2px solid ${t.border}`,background:correct?"rgba(110,231,160,0.12)":wrong?"rgba(248,113,113,0.12)":t.card,color:"#e8e6e1",fontSize:15,cursor:picked!==null?"default":"pointer",fontWeight:correct||wrong?700:400,textAlign:"left",transition:"all 0.2s"}}>{o}</button>;})}
      </div>
    </div>;
  }

  // === MATH FLASH ===
  function MathLevel({si,li,onDone}) {
    const gen=()=>{let a,b,ans,op;const diff=si*3+li;
      if(si===0){op="+";a=Math.floor(Math.random()*(10+diff*5))+1;b=Math.floor(Math.random()*(10+diff*5))+1;ans=a+b;}
      else if(si===1){op="-";a=Math.floor(Math.random()*(15+diff*5))+5;b=Math.floor(Math.random()*a)+1;ans=a-b;}
      else{op="×";a=Math.floor(Math.random()*(6+diff*3))+2;b=Math.floor(Math.random()*(6+diff*3))+2;ans=a*b;}
      return{a,b,op,ans};};
    const total=5+li*2;const [prob,setProb]=useState(gen);const [inp,setInp]=useState("");const [score,setScore]=useState(0);const [round,setRound]=useState(0);const [fb,setFb]=useState(null);const [done,setDone]=useState(false);
    const check=()=>{if(!inp.trim())return;const correct=parseInt(inp)===prob.ans;if(correct)setScore(s=>s+1);setFb(correct?"✅":`❌ ${prob.ans}`);setInp("");const nr=round+1;setRound(nr);setTimeout(()=>{setFb(null);if(nr>=total)setDone(true);else setProb(gen());},1000);};
    if(done){const stars=score===total?3:score>=total*0.7?2:score>=1?1:0;return <LevelComplete stars={stars} score={score} total={total} onDone={()=>onDone(stars)}/>;}
    return <div style={{maxWidth:400,margin:"0 auto",padding:20,textAlign:"center"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}><span style={{fontSize:12,color:t.dim}}>{round+1}/{total}</span><span style={{fontSize:14,color:"#c9a84c",fontWeight:600}}>⭐ {score}</span></div>
      <div style={{background:t.bubble,border:`1px solid ${t.border}`,borderRadius:20,padding:30,marginBottom:16}}><div style={{fontSize:40,fontFamily:"Georgia,serif",fontWeight:700}}>{prob.a} {prob.op} {prob.b} = ?</div></div>
      {fb&&<div style={{fontSize:20,marginBottom:10,color:fb==="✅"?"#6ee7a0":"#f87171"}}>{fb}</div>}
      <div style={{display:"flex",gap:8,justifyContent:"center"}}><input value={inp} onChange={e=>setInp(e.target.value.replace(/[^0-9-]/g,""))} onKeyDown={e=>{if(e.key==="Enter")check();}} placeholder="?" style={{width:100,padding:"12px",borderRadius:12,border:`1px solid ${t.border}`,background:t.card,color:"#e8e6e1",fontSize:24,textAlign:"center",outline:"none",fontFamily:"Georgia,serif"}} autoFocus/><button onClick={check} style={{padding:"12px 24px",borderRadius:12,border:"none",background:t.accent,color:"#fff",fontSize:16,fontWeight:600,cursor:"pointer"}}>Go!</button></div>
    </div>;
  }

  // === WORD SCRAMBLE ===
  const wordBank=[[
    [{w:"CAT",h:"Says meow"},{w:"DOG",h:"Man's best friend"},{w:"SUN",h:"Bright in the sky"},{w:"BIG",h:"Not small"},{w:"RED",h:"Color of fire"}],
    [{w:"FISH",h:"Lives in water"},{w:"MOON",h:"Shines at night"},{w:"TREE",h:"Has leaves"},{w:"SNOW",h:"Cold and white"},{w:"STAR",h:"Twinkles above"}],
    [{w:"BIRD",h:"It can fly"},{w:"RAIN",h:"Falls from clouds"},{w:"JUMP",h:"Leap up high"},{w:"BLUE",h:"Color of the sky"},{w:"FROG",h:"Hops and ribbits"}],
  ],[
    [{w:"OCEAN",h:"Huge body of water"},{w:"EARTH",h:"Our planet"},{w:"LIGHT",h:"Opposite of dark"},{w:"BRAIN",h:"You think with it"},{w:"HEART",h:"Pumps blood"}],
    [{w:"SPACE",h:"Where stars live"},{w:"PLANT",h:"Grows in soil"},{w:"WHALE",h:"Biggest animal"},{w:"STORM",h:"Thunder and lightning"},{w:"CLOUD",h:"Floats in the sky"}],
    [{w:"MUSIC",h:"Made of notes"},{w:"HORSE",h:"You can ride it"},{w:"RIVER",h:"Water that flows"},{w:"DREAM",h:"Happens while sleeping"},{w:"TOWER",h:"Tall building"}],
  ],[
    [{w:"BUTTERFLY",h:"Has colorful wings"},{w:"ELEPHANT",h:"Largest land animal"},{w:"MOUNTAIN",h:"Very tall land"},{w:"DINOSAUR",h:"Extinct reptile"},{w:"TREASURE",h:"Hidden riches"}],
    [{w:"INTERNET",h:"World wide web"},{w:"ALPHABET",h:"A to Z"},{w:"UMBRELLA",h:"Keeps rain off"},{w:"CALENDAR",h:"Shows dates"},{w:"SANDWICH",h:"Bread + filling"}],
    [{w:"ASTRONAUT",h:"Travels to space"},{w:"CHOCOLATE",h:"Sweet brown treat"},{w:"TELEPHONE",h:"You call people"},{w:"ALLIGATOR",h:"Big swamp reptile"},{w:"GEOGRAPHY",h:"Study of Earth"}],
  ]];
  function ScrambleLevel({si,li,onDone}) {
    const words=wordBank[si][li];const shuffle=(w)=>{const a=w.split("");for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.join("")===w?shuffle(w):a.join("");};
    const [wi,setWi]=useState(0);const [inp,setInp]=useState("");const [score,setScore]=useState(0);const [fb,setFb]=useState(null);const [scr,setScr]=useState(shuffle(words[0].w));const [done,setDone]=useState(false);
    const check=()=>{if(!inp.trim())return;const correct=inp.trim().toUpperCase()===words[wi].w;if(correct)setScore(s=>s+1);setFb(correct?"🎉":"❌ "+words[wi].w);setTimeout(()=>{setFb(null);const next=wi+1;if(next>=words.length)setDone(true);else{setWi(next);setScr(shuffle(words[next].w));setInp("");}},1200);};
    if(done){const stars=score===words.length?3:score>=words.length*0.6?2:score>=1?1:0;return <LevelComplete stars={stars} score={score} total={words.length} onDone={()=>onDone(stars)}/>;}
    return <div style={{maxWidth:400,margin:"0 auto",padding:20,textAlign:"center"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}><span style={{fontSize:12,color:t.dim}}>{wi+1}/{words.length}</span><span style={{fontSize:14,color:"#c9a84c",fontWeight:600}}>⭐ {score}</span></div>
      <div style={{background:t.bubble,border:`1px solid ${t.border}`,borderRadius:20,padding:28,marginBottom:10}}><div style={{fontSize:32,fontFamily:"Georgia,serif",fontWeight:700,letterSpacing:8,color:t.accent}}>{scr}</div></div>
      <div style={{fontSize:13,color:t.dim,marginBottom:16}}>💡 {words[wi].h}</div>
      {fb&&<div style={{fontSize:18,marginBottom:10,color:fb.includes("🎉")?"#6ee7a0":"#f87171"}}>{fb}</div>}
      <div style={{display:"flex",gap:8,justifyContent:"center"}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")check();}} placeholder="Type it..." style={{width:180,padding:"12px",borderRadius:12,border:`1px solid ${t.border}`,background:t.card,color:"#e8e6e1",fontSize:18,textAlign:"center",outline:"none",textTransform:"uppercase",letterSpacing:3}} autoFocus/><button onClick={check} style={{padding:"12px 20px",borderRadius:12,border:"none",background:t.accent,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>Check</button></div>
    </div>;
  }

  // === MEMORY MATCH ===
  function MemoryLevel({si,li,onDone}) {
    const pairCounts=[4,6,8];const allEmoji=["🐱","🐶","🌻","🐠","🦋","🐙","🌍","⭐","🦊","🐸","🌈","🎸"];
    const numPairs=pairCounts[si]+li;const chosen=allEmoji.slice(0,numPairs);
    const [cards]=useState(()=>{const d=[...chosen,...chosen];for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}return d;});
    const [flipped,setFlipped]=useState([]);const [matched,setMatched]=useState([]);const [moves,setMoves]=useState(0);
    const flip=(i)=>{if(flipped.length===2||flipped.includes(i)||matched.includes(i))return;const nf=[...flipped,i];setFlipped(nf);if(nf.length===2){setMoves(m=>m+1);if(cards[nf[0]]===cards[nf[1]]){setMatched(m=>[...m,...nf]);setFlipped([]);}else setTimeout(()=>setFlipped([]),800);}};
    const won=matched.length===cards.length;
    if(won){const perfect=numPairs;const stars=moves<=perfect?3:moves<=perfect*1.5?2:1;setTimeout(()=>onDone(stars),100);return <LevelComplete stars={stars} score={numPairs} total={numPairs} extra={`${moves} moves`} onDone={()=>onDone(stars)}/>;}
    const cols=cards.length<=12?4:cards.length<=16?4:5;
    return <div style={{maxWidth:450,margin:"0 auto",padding:20,textAlign:"center"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><span style={{fontSize:12,color:t.dim}}>Moves: {moves}</span><span style={{fontSize:12,color:t.dim}}>Found: {matched.length/2}/{numPairs}</span></div>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:8}}>{cards.map((c,i)=>{const show=flipped.includes(i)||matched.includes(i);return <button key={i} onClick={()=>flip(i)} style={{aspectRatio:"1",borderRadius:12,border:matched.includes(i)?`2px solid #6ee7a0`:`2px solid ${t.border}`,background:show?t.bubble:t.card,fontSize:show?24:18,cursor:matched.includes(i)?"default":"pointer",transition:"all 0.3s",display:"flex",alignItems:"center",justifyContent:"center",color:show?"#e8e6e1":t.dim}}>{show?c:"?"}</button>;})}</div>
    </div>;
  }

  // === LEVEL COMPLETE ===
  function LevelComplete({stars,score,total,extra,onDone}) {
    const msgs=stars===3?["Perfect! You're amazing! 🌟","Incredible work! 🎉","Flawless! ⭐⭐⭐"]:stars===2?["Great job! 👏","Well done! 🎊","Almost perfect!"]:["Good try! 💪","Keep practicing! 🌱","You'll get there!"];
    return <div style={{textAlign:"center",padding:40}}>
      <div style={{fontSize:48,marginBottom:12}}>{stars===3?"🏆":stars===2?"🎉":"💪"}</div>
      <div style={{fontSize:36,color:"#c9a84c",marginBottom:8}}>{[...Array(3)].map((_,i)=><span key={i} style={{opacity:i<stars?1:0.2}}>{i<stars?"⭐":"☆"}</span>)}</div>
      <h3 style={{fontFamily:"Georgia,serif",color:t.accent,fontSize:22,marginBottom:6}}>{msgs[Math.floor(Math.random()*msgs.length)]}</h3>
      <div style={{fontSize:16,color:t.dim,marginBottom:4}}>{score}/{total} correct{extra?` • ${extra}`:""}</div>
      <div style={{fontSize:13,color:"#6ee7a0",marginBottom:20}}>+{stars*10} XP earned!</div>
      <button onClick={onDone} style={{padding:"12px 28px",borderRadius:12,border:"none",background:t.accent,color:"#fff",fontSize:15,fontWeight:600,cursor:"pointer"}}>Continue</button>
    </div>;
  }

  // === STAGE MAP ===
  function StageMap({g}) {
    const gd=games.find(x=>x.id===g);
    return <div style={{maxWidth:500,margin:"0 auto",padding:20}}>
      <h3 style={{fontFamily:"Georgia,serif",color:gd.color,fontSize:20,textAlign:"center",marginBottom:20}}>{gd.icon} {gd.title}</h3>
      {gd.stages.map((sName,si)=><div key={si} style={{marginBottom:20}}>
        <div style={{fontSize:13,color:t.dim,fontWeight:600,marginBottom:10,display:"flex",alignItems:"center",gap:6}}><span>{stageEmoji[si]}</span> Stage {si+1}: {sName}</div>
        <div style={{display:"flex",gap:10}}>
          {[0,1,2].map(li=>{const unlocked=si===0&&li===0?true:best(g,si,li)>0||(li>0?best(g,si,li-1)>=1:si>0&&best(g,si-1,2)>=1);const stars=best(g,si,li);
            return <button key={li} onClick={()=>{if(unlocked){setStage(si);setLevel(li);}}} style={{flex:1,padding:"16px 8px",borderRadius:14,border:unlocked?`2px solid ${gd.color}44`:`2px solid ${t.border}`,background:unlocked?t.bubble:t.card,cursor:unlocked?"pointer":"default",opacity:unlocked?1:0.4,textAlign:"center",transition:"all 0.2s"}}
              onMouseEnter={e=>{if(unlocked)e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";}}>
              <div style={{fontSize:20,marginBottom:4}}>{unlocked?`${si*3+li+1}`:"🔒"}</div>
              <div style={{fontSize:11,color:t.dim,marginBottom:4}}>Level {li+1}</div>
              <div style={{fontSize:14}}>{[...Array(3)].map((_,i)=><span key={i} style={{color:i<stars?"#c9a84c":t.border}}>{i<stars?"⭐":"☆"}</span>)}</div>
            </button>;
          })}
        </div>
      </div>)}
    </div>;
  }

  // === GAME WRAPPER ===
  const wrap=(inner)=><div style={{height:"100vh",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",position:"relative",overflowY:"auto"}}><WorldBg theme={themeKey}/><div style={{zIndex:1,position:"relative"}}>{inner}</div></div>;
  const hdr=(icon,title,back)=><div style={{padding:"12px 16px",borderBottom:`1px solid ${t.border}`,display:"flex",alignItems:"center",gap:10}}><button onClick={back} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontSize:12}}>← Back</button><span style={{fontSize:18}}>{icon}</span><span style={{fontFamily:"Georgia,serif",fontWeight:600,color:t.accent}}>{title}</span></div>;

  // Playing a level
  if(game&&stage!==null&&level!==null) {
    const gd=games.find(x=>x.id===game);
    const done=(stars)=>{saveBest(game,stage,level,stars);setStage(null);setLevel(null);};
    const inner=game==="quiz"?<QuizLevel si={stage} li={level} onDone={done}/>:game==="math"?<MathLevel si={stage} li={level} onDone={done}/>:game==="scramble"?<ScrambleLevel si={stage} li={level} onDone={done}/>:<MemoryLevel si={stage} li={level} onDone={done}/>;
    return wrap(<>{hdr(gd.icon,`${gd.title} — ${gd.stages[stage]} Lv${level+1}`,()=>{setStage(null);setLevel(null);})}{inner}</>);
  }
  // Stage map
  if(game) {const gd=games.find(x=>x.id===game);return wrap(<>{hdr(gd.icon,gd.title,()=>setGame(null))}<StageMap g={game}/></>);}

  // Game picker
  return wrap(<>
    {hdr("🎮","Games",onBack)}
    <div style={{padding:20,maxWidth:500,margin:"0 auto"}}>
      <p style={{color:t.dim,fontSize:14,marginBottom:20,textAlign:"center"}}>Pick a game, {name}! {avatar.emoji}</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {games.map(g=>{const total=9;const earned=Object.values(progress[g.id]||{}).reduce((s,v)=>s+v,0);return <button key={g.id} onClick={()=>setGame(g.id)} style={{background:t.bubble,border:`2px solid ${t.border}`,borderRadius:16,padding:20,cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=g.color;e.currentTarget.style.transform="translateY(-3px)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
          <div style={{fontSize:36,marginBottom:8}}>{g.icon}</div>
          <div style={{fontSize:15,fontWeight:700,color:g.color,fontFamily:"Georgia,serif",marginBottom:4}}>{g.title}</div>
          <div style={{fontSize:12,color:t.dim,marginBottom:8}}>{g.desc}</div>
          <div style={{fontSize:11,color:"#c9a84c"}}>{earned>0?`⭐ ${earned}/${total*3}`:"New!"}</div>
        </button>;})}
      </div>
    </div>
  </>);
}

// ===== VIDEOS & VR =====
function Materials({avatar,name,t,themeKey,onBack}) {
  const [filter,setFilter]=useState("all");const [watching,setWatching]=useState(null);
  const subjects=["all","Science","Math","Reading","Social Studies"];
  const filtered=filter==="all"?MATERIALS:MATERIALS.filter(m=>m.subject===filter);
  const typeColors={video:"#7cb3f0",vr:"#a78bfa"};

  if(watching) {
    const m=watching;
    return (
      <div style={{height:"100vh",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",position:"relative",display:"flex",flexDirection:"column"}}>
        <WorldBg theme={themeKey}/>
        <div style={{padding:"12px 16px",borderBottom:`1px solid ${t.border}`,display:"flex",alignItems:"center",gap:10,zIndex:1}}>
          <button onClick={()=>setWatching(null)} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontSize:12}}>← Back</button>
          <span style={{fontSize:18}}>{m.icon}</span>
          <span style={{fontFamily:"Georgia,serif",fontWeight:600,color:t.accent}}>{m.title}</span>
        </div>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1}}>
          <div style={{textAlign:"center",maxWidth:400,padding:24}}>
            <div style={{width:280,height:180,borderRadius:16,background:t.bubble,border:`2px solid ${t.border}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",position:"relative",overflow:"hidden"}}>
              <div style={{fontSize:60}}>{m.type==="vr"?"🥽":"▶️"}</div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"8px",background:"rgba(0,0,0,0.5)",fontSize:11,color:"#8b83a8",textAlign:"center"}}>{m.type==="vr"?"VR Experience":"Video"} • {m.duration}</div>
            </div>
            <h3 style={{fontFamily:"Georgia,serif",color:t.accent,fontSize:20,marginBottom:8}}>{m.title}</h3>
            <p style={{fontSize:14,color:t.dim,lineHeight:1.6,marginBottom:16}}>{m.desc}</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:11,padding:"4px 12px",borderRadius:10,background:`${typeColors[m.type]}22`,color:typeColors[m.type],fontWeight:600}}>{m.type==="vr"?"🥽 VR Experience":"🎬 Video"}</span>
              <span style={{fontSize:11,padding:"4px 12px",borderRadius:10,background:t.bubble,color:t.dim}}>{m.subject}</span>
              <span style={{fontSize:11,padding:"4px 12px",borderRadius:10,background:t.bubble,color:t.dim}}>⏱ {m.duration}</span>
            </div>
            <div style={{marginTop:24}}>
              <button style={{padding:"14px 32px",borderRadius:14,border:"none",background:m.type==="vr"?`linear-gradient(135deg,#a78bfa,#7c6fff)`:`linear-gradient(135deg,#7cb3f0,#4a8fd4)`,color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:`0 4px 20px ${typeColors[m.type]}44`}}>
                {m.type==="vr"?"🥽 Launch VR":"▶️ Play Video"}
              </button>
            </div>
            <p style={{fontSize:12,color:t.dim,marginTop:12}}>Assigned by your teacher {avatar.emoji}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{height:"100vh",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",position:"relative",overflowY:"auto"}}>
      <WorldBg theme={themeKey}/>
      <div style={{zIndex:1,position:"relative"}}>
        <div style={{padding:"12px 16px",borderBottom:`1px solid ${t.border}`,display:"flex",alignItems:"center",gap:10}}>
          <button onClick={onBack} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontSize:12}}>← Hub</button>
          <span style={{fontSize:20}}>🎬</span>
          <span style={{fontFamily:"Georgia,serif",fontWeight:600,color:t.accent,fontSize:16}}>Videos & VR</span>
        </div>
        <div style={{padding:20,maxWidth:500,margin:"0 auto"}}>
          <p style={{color:t.dim,fontSize:14,marginBottom:16,textAlign:"center"}}>Watch videos and explore VR experiences! {avatar.emoji}</p>

          {/* Filter tabs */}
          <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {subjects.map(s=><button key={s} onClick={()=>setFilter(s)} style={{padding:"6px 14px",borderRadius:10,border:filter===s?`2px solid ${t.accent}`:`2px solid ${t.border}`,background:filter===s?`${t.accent}22`:"transparent",color:filter===s?t.accent:t.dim,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s"}}>{s==="all"?"All":s}</button>)}
          </div>

          {/* Content cards */}
          {filtered.length===0?<div style={{textAlign:"center",padding:40,color:t.dim}}>No content for this subject yet!</div>:
            filtered.map((m,i)=>(
              <button key={i} onClick={()=>setWatching(m)} style={{width:"100%",display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:14,border:`2px solid ${t.border}`,background:t.bubble,cursor:"pointer",marginBottom:10,textAlign:"left",transition:"all 0.2s",color:"#e8e6e1"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=typeColors[m.type];e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
                <div style={{width:50,height:50,borderRadius:12,background:t.card,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0,border:`1px solid ${t.border}`}}>{m.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:600,marginBottom:3}}>{m.title}</div>
                  <div style={{fontSize:12,color:t.dim,marginBottom:4}}>{m.desc}</div>
                  <div style={{display:"flex",gap:6}}>
                    <span style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:`${typeColors[m.type]}22`,color:typeColors[m.type],fontWeight:600}}>{m.type==="vr"?"VR":"VIDEO"}</span>
                    <span style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:t.card,color:t.dim}}>{m.subject}</span>
                    <span style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:t.card,color:t.dim}}>⏱ {m.duration}</span>
                  </div>
                </div>
                <div style={{fontSize:20,color:t.dim,flexShrink:0}}>→</div>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}

// A single catch encounter. Kept at module top level (not nested inside
// Learnmon) so that catching a state — which updates Learnmon's `caught`
// state — re-renders rather than REMOUNTS this component; a nested definition
// would get a new function identity each parent render and lose `won`/`wrong`.
function LearnmonEncounter({state,t,alreadyCaught,caughtCount,onCaught,onLeave}) {
  const [q]=useState(()=>buildQuestion(state,STATES));
  const [wrong,setWrong]=useState([]);          // options already guessed wrong (disabled)
  const [won,setWon]=useState(false);
  const [wasAlready]=useState(alreadyCaught);   // frozen arrival value (before this catch)
  const pick=(opt)=>{
    if(won||wrong.includes(opt))return;
    if(opt===q.answer){setWon(true);onCaught(state.abbr);}
    else setWrong(w=>[...w,opt]);
  };
  if(won||wasAlready) {
    return <div style={{maxWidth:460,margin:"0 auto",padding:24,textAlign:"center"}}>
      <div style={{fontSize:12,color:"#6ee7a0",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{wasAlready&&!won?"Already in your Statedex":"Caught!"} 🎉</div>
      <div style={{fontSize:72,margin:"6px 0",filter:`drop-shadow(0 0 18px ${t.accent}55)`,animation:"lmpop 0.5s ease"}}>{state.emoji}</div>
      <h2 style={{fontFamily:"Georgia,serif",color:t.accent,fontSize:26,margin:"4px 0"}}>{state.name}</h2>
      <div style={{fontSize:13,color:t.dim,marginBottom:16}}>{state.nickname}</div>
      <div style={{background:t.bubble,border:`1px solid ${t.border}`,borderRadius:16,padding:"16px 18px",textAlign:"left",marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14}}><span style={{color:t.dim}}>🏛️ Capital</span><span style={{fontWeight:600}}>{state.capital}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14}}><span style={{color:t.dim}}>🔤 Abbreviation</span><span style={{fontWeight:600}}>{state.abbr}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:14}}><span style={{color:t.dim}}>🗺️ Region</span><span style={{fontWeight:600,textTransform:"capitalize"}}>{state.region}</span></div>
        <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${t.border}`,fontSize:13,lineHeight:1.6,color:"#d8d6d0"}}>💡 {state.fact}</div>
      </div>
      {won&&<div style={{fontSize:13,color:"#6ee7a0",marginBottom:14}}>+15 XP • {caughtCount}/50 collected</div>}
      <button onClick={onLeave} style={{padding:"12px 28px",borderRadius:12,border:"none",background:t.accent,color:"#fff",fontSize:15,fontWeight:600,cursor:"pointer"}}>Continue</button>
    </div>;
  }
  return <div style={{maxWidth:460,margin:"0 auto",padding:24,textAlign:"center"}}>
    <div style={{fontSize:12,color:t.accent,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>A wild Learnmon appeared!</div>
    <div style={{fontSize:72,margin:"6px 0",animation:"lmfloat 3s ease-in-out infinite"}}>{state.emoji}</div>
    <div style={{fontSize:15,color:t.dim,marginBottom:20}}>Answer to catch it and add it to your Statedex.</div>
    <div style={{background:t.bubble,border:`1px solid ${t.border}`,borderRadius:16,padding:"18px 16px",marginBottom:16}}><div style={{fontSize:17,fontWeight:600,lineHeight:1.5}}>{q.prompt}</div></div>
    <div style={{display:"flex",flexDirection:"column",gap:9}}>
      {q.options.map((o,i)=>{const isWrong=wrong.includes(o);return <button key={i} onClick={()=>pick(o)} disabled={isWrong} style={{padding:"13px 16px",borderRadius:12,border:isWrong?"2px solid #f87171":`2px solid ${t.border}`,background:isWrong?"rgba(248,113,113,0.12)":t.card,color:isWrong?"#ffb4b4":"#e8e6e1",fontSize:15,cursor:isWrong?"default":"pointer",fontWeight:isWrong?700:400,textAlign:"left",transition:"all 0.2s",opacity:isWrong?0.6:1}}>{o}{isWrong?"  ✕":""}</button>;})}
    </div>
    {wrong.length>0&&<div style={{marginTop:14,fontSize:14,color:"#ffb4b4"}}>Oops, it wriggled free! Try one of the others. 🌀</div>}
  </div>;
}

// ===== LEARNMON: NORTH AMERICA =====
// A creature-collecting geography game. Every U.S. state is a "Learnmon" you
// catch by answering a question about it (capital / nickname / abbreviation).
// Caught states unlock their card in the Statedex. Progress is session-local,
// matching the rest of this prototype (resets on refresh).
function Learnmon({avatar,name,t,themeKey,onBack}) {
  const [caught,setCaught]=useState(()=>({}));           // { AB: true }
  const [view,setView]=useState("home");                  // home | region | encounter | dex | continent
  const [regionKey,setRegionKey]=useState(null);
  const [target,setTarget]=useState(null);                // state currently being encountered
  const [selected,setSelected]=useState(null);            // Statedex card being viewed

  const caughtCount=Object.keys(caught).length;
  const statesIn=(rk)=>STATES.filter(s=>s.region===rk);
  const caughtIn=(rk)=>statesIn(rk).filter(s=>caught[s.abbr]).length;
  const doCatch=(abbr)=>setCaught(c=>({...c,[abbr]:true}));

  const shell=(inner)=><div style={{height:"100vh",background:BG(t),fontFamily:"'Source Sans 3',sans-serif",color:"#e8e6e1",position:"relative",overflowY:"auto"}}><WorldBg theme={themeKey}/><div style={{zIndex:1,position:"relative"}}>{inner}</div></div>;
  const bar=(icon,title,back)=><div style={{padding:"12px 16px",borderBottom:`1px solid ${t.border}`,display:"flex",alignItems:"center",gap:10,background:`${t.bg}cc`,backdropFilter:"blur(8px)",position:"sticky",top:0,zIndex:2}}><button onClick={back} style={{background:"none",border:`1px solid ${t.border}`,color:t.dim,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontSize:12}}>← Back</button><span style={{fontSize:18}}>{icon}</span><span style={{fontFamily:"Georgia,serif",fontWeight:600,color:t.accent}}>{title}</span><span style={{marginLeft:"auto",fontSize:12,color:t.dim,fontWeight:600}}>🎒 {caughtCount}/50</span></div>;

  if(view==="encounter"&&target) {
    return shell(<>{bar(target.emoji,target.name,()=>setView("region"))}<LearnmonEncounter state={target} t={t} alreadyCaught={!!caught[target.abbr]} caughtCount={caughtCount} onCaught={doCatch} onLeave={()=>setView("region")}/><style>{`@keyframes lmfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}@keyframes lmpop{0%{transform:scale(0.4);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}`}</style></>);
  }

  // --- REGION: pick a state to encounter ---
  if(view==="region"&&regionKey) {
    const rg=REGIONS.find(r=>r.key===regionKey);const list=statesIn(regionKey);
    return shell(<>{bar(rg.emoji,rg.name,()=>setView("home"))}
      <div style={{maxWidth:560,margin:"0 auto",padding:20}}>
        <p style={{color:t.dim,fontSize:14,textAlign:"center",marginBottom:6}}>{rg.desc}</p>
        <p style={{color:rg.color,fontSize:13,textAlign:"center",fontWeight:600,marginBottom:18}}>{caughtIn(regionKey)}/{list.length} Learnmon caught here</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {list.map(s=>{const got=caught[s.abbr];return <button key={s.abbr} onClick={()=>{setTarget(s);setView("encounter");}} style={{display:"flex",alignItems:"center",gap:12,background:got?t.bubble:t.card,border:`2px solid ${got?rg.color+"66":t.border}`,borderRadius:14,padding:"12px 14px",cursor:"pointer",textAlign:"left",color:"#e8e6e1",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=rg.color;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=got?rg.color+"66":t.border;e.currentTarget.style.transform="none";}}>
            <span style={{fontSize:30,filter:got?"none":"grayscale(100%) opacity(0.5)"}}>{got?s.emoji:"❔"}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:600}}>{got?s.name:"Wild Learnmon"}</div>
              <div style={{fontSize:11,color:got?"#6ee7a0":t.dim}}>{got?`✓ ${s.capital}`:"Tap to catch"}</div>
            </div>
          </button>;})}
        </div>
      </div>
    </>);
  }

  // --- STATEDEX ---
  if(view==="dex") {
    const complete=caughtCount===50;
    return shell(<>{bar("📖","Statedex",()=>setView("home"))}
      <div style={{maxWidth:600,margin:"0 auto",padding:20}}>
        {complete&&<div style={{background:`linear-gradient(135deg,${t.accent}33,${avatar.color}22)`,border:`2px solid ${t.accent}`,borderRadius:16,padding:"16px 18px",marginBottom:16,textAlign:"center"}}>
          <div style={{fontSize:34}}>🏆</div><div style={{fontFamily:"Georgia,serif",fontSize:18,color:t.accent,fontWeight:700}}>Geography Champion!</div>
          <div style={{fontSize:13,color:t.dim}}>You caught all 50 states, {name}!</div>
        </div>}
        <p style={{color:t.dim,fontSize:13,textAlign:"center",marginBottom:16}}>{caughtCount} of 50 states collected. Tap a caught state to review it.</p>
        {REGIONS.map(rg=>{const list=statesIn(rg.key);return <div key={rg.key} style={{marginBottom:18}}>
          <div style={{fontSize:12,fontWeight:700,color:rg.color,marginBottom:10,display:"flex",alignItems:"center",gap:6}}><span>{rg.emoji}</span>{rg.name}<span style={{color:t.dim,fontWeight:400,marginLeft:"auto"}}>{caughtIn(rg.key)}/{list.length}</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(78px,1fr))",gap:8}}>
            {list.map(s=>{const got=caught[s.abbr];return <button key={s.abbr} onClick={()=>{if(got)setSelected(s);}} style={{aspectRatio:"1",borderRadius:12,border:`1px solid ${got?rg.color+"55":t.border}`,background:got?t.bubble:t.card,cursor:got?"pointer":"default",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,padding:4,opacity:got?1:0.5}}>
              <span style={{fontSize:24,filter:got?"none":"grayscale(100%)"}}>{got?s.emoji:"❔"}</span>
              <span style={{fontSize:10,fontWeight:700,color:got?"#e8e6e1":t.dim}}>{s.abbr}</span>
            </button>;})}
          </div>
        </div>;})}
      </div>
      {selected&&<div onClick={()=>setSelected(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,padding:20}}>
        <div onClick={e=>e.stopPropagation()} style={{background:t.card,border:`2px solid ${t.accent}55`,borderRadius:18,padding:"22px 20px",maxWidth:360,width:"100%",textAlign:"center"}}>
          <div style={{fontSize:64,marginBottom:4}}>{selected.emoji}</div>
          <h2 style={{fontFamily:"Georgia,serif",color:t.accent,fontSize:24,margin:"2px 0"}}>{selected.name}</h2>
          <div style={{fontSize:13,color:t.dim,marginBottom:14}}>{selected.nickname}</div>
          <div style={{background:t.bubble,border:`1px solid ${t.border}`,borderRadius:14,padding:"14px 16px",textAlign:"left"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14}}><span style={{color:t.dim}}>🏛️ Capital</span><span style={{fontWeight:600}}>{selected.capital}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14}}><span style={{color:t.dim}}>🔤 Abbreviation</span><span style={{fontWeight:600}}>{selected.abbr}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:14}}><span style={{color:t.dim}}>🗺️ Region</span><span style={{fontWeight:600,textTransform:"capitalize"}}>{selected.region}</span></div>
            <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${t.border}`,fontSize:13,lineHeight:1.6,color:"#d8d6d0"}}>💡 {selected.fact}</div>
          </div>
          <button onClick={()=>setSelected(null)} style={{marginTop:16,padding:"10px 24px",borderRadius:10,border:"none",background:t.accent,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>Close</button>
        </div>
      </div>}
    </>);
  }

  // --- CONTINENT: North America overview ---
  if(view==="continent") {
    return shell(<>{bar("🌎","North America",()=>setView("home"))}
      <div style={{maxWidth:560,margin:"0 auto",padding:20}}>
        <div style={{textAlign:"center",marginBottom:18}}><div style={{fontSize:56}}>🌎</div><p style={{color:t.dim,fontSize:14,lineHeight:1.6,maxWidth:440,margin:"6px auto 0"}}>The 50 states you collect all belong to one country on one big continent. Here's the bigger picture!</p></div>
        <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:16,padding:"16px 18px",marginBottom:16,backdropFilter:"blur(8px)"}}>
          <div style={{fontSize:11,color:t.accent,fontWeight:700,marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>🌎 About the Continent</div>
          {NORTH_AMERICA.facts.map((f,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"7px 0",borderTop:i>0?`1px solid ${t.border}`:"none"}}><span style={{color:t.accent,fontWeight:700}}>›</span><span style={{fontSize:14,lineHeight:1.5}}>{f}</span></div>)}
        </div>
        <div style={{fontSize:11,color:t.accent,fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:1,paddingLeft:2}}>🗺️ Three Biggest Countries</div>
        {NORTH_AMERICA.countries.map((c,i)=><div key={i} style={{display:"flex",gap:12,alignItems:"center",background:t.bubble,border:`1px solid ${t.border}`,borderRadius:14,padding:"12px 14px",marginBottom:10}}>
          <span style={{fontSize:30}}>{c.emoji}</span>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8}}><span style={{fontSize:15,fontWeight:700}}>{c.name}</span><span style={{fontSize:11,color:t.dim}}>Capital: {c.capital}</span></div>
            <div style={{fontSize:12,color:t.dim,lineHeight:1.5,marginTop:3}}>{c.note}</div>
          </div>
        </div>)}
      </div>
    </>);
  }

  // --- HOME ---
  const pct=Math.round((caughtCount/50)*100);
  return shell(<>{bar("🗺️","Learnmon",onBack)}
    <div style={{maxWidth:600,margin:"0 auto",padding:20}}>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:46,marginBottom:4}}>🗺️</div>
        <h1 style={{fontFamily:"Georgia,serif",color:t.accent,fontSize:24,margin:"0 0 4px"}}>Learnmon: North America</h1>
        <p style={{color:t.dim,fontSize:14,lineHeight:1.5,maxWidth:420,margin:"0 auto"}}>Travel the regions of the United States and catch all 50 states, {name}! Each one is a Learnmon waiting to join your Statedex. {avatar.emoji}</p>
      </div>
      {/* progress */}
      <div style={{background:`${t.card}dd`,border:`1px solid ${t.border}`,borderRadius:14,padding:"14px 18px",marginBottom:16,backdropFilter:"blur(8px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,fontWeight:600}}>🎒 Your Collection</span><span style={{fontSize:13,color:t.accent,fontWeight:700}}>{caughtCount}/50</span></div>
        <div style={{height:10,borderRadius:5,background:t.border,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,borderRadius:5,background:`linear-gradient(90deg,${t.accent},${avatar.color})`,transition:"width 0.6s ease"}}/></div>
      </div>
      {/* quick links */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <button onClick={()=>setView("continent")} style={{background:t.bubble,border:`2px solid ${t.border}`,borderRadius:14,padding:"16px 12px",cursor:"pointer",textAlign:"center",color:"#e8e6e1",transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
          <div style={{fontSize:30,marginBottom:4}}>🌎</div><div style={{fontSize:14,fontWeight:700,fontFamily:"Georgia,serif"}}>North America</div><div style={{fontSize:11,color:t.dim}}>See the whole continent</div>
        </button>
        <button onClick={()=>setView("dex")} style={{background:t.bubble,border:`2px solid ${t.border}`,borderRadius:14,padding:"16px 12px",cursor:"pointer",textAlign:"center",color:"#e8e6e1",transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
          <div style={{fontSize:30,marginBottom:4}}>📖</div><div style={{fontSize:14,fontWeight:700,fontFamily:"Georgia,serif"}}>Statedex</div><div style={{fontSize:11,color:t.dim}}>Review what you caught</div>
        </button>
      </div>
      {/* regions */}
      <div style={{fontSize:11,color:t.accent,fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:1,paddingLeft:2}}>🧭 Choose a Region to Explore</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {REGIONS.map(rg=>{const got=caughtIn(rg.key);const tot=statesIn(rg.key).length;const done=got===tot;return <button key={rg.key} onClick={()=>{setRegionKey(rg.key);setView("region");}} style={{display:"flex",alignItems:"center",gap:14,background:`${t.card}dd`,border:`2px solid ${done?rg.color:t.border}`,borderRadius:14,padding:"14px 16px",cursor:"pointer",textAlign:"left",color:"#e8e6e1",transition:"all 0.2s",backdropFilter:"blur(8px)"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=rg.color;e.currentTarget.style.transform="translateX(3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=done?rg.color:t.border;e.currentTarget.style.transform="none";}}>
          <span style={{fontSize:32,flexShrink:0}}>{rg.emoji}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:16,fontWeight:700,fontFamily:"Georgia,serif",color:rg.color}}>{rg.name} {done&&"✓"}</div>
            <div style={{fontSize:12,color:t.dim,lineHeight:1.4}}>{rg.desc}</div>
          </div>
          <span style={{fontSize:12,color:t.dim,fontWeight:700,flexShrink:0}}>{got}/{tot}</span>
        </button>;})}
      </div>
      <div style={{textAlign:"center",padding:"18px 0 4px",color:t.dim,fontSize:13}}><span style={{fontSize:22}}>{avatar.emoji}</span><div style={{marginTop:6}}>{avatar.name} says: "Gotta learn 'em all, {name}!"</div></div>
    </div>
  </>);
}

// ===== MAIN =====
export default function App() {
  const [step,setStep]=useState("name");
  const [studentName,setStudentName]=useState("");
  const [avatar,setAvatar]=useState(null);
  const [themeKey,setThemeKey]=useState(null);
  const [screen,setScreen]=useState("hub");
  const [chatData,setChatData]=useState(null);
  const t=themeKey?THEMES[themeKey]:null;
  const goHub=()=>{setScreen("hub");setChatData(null);};

  if(step==="name") return <NameScreen name={studentName} setName={setStudentName} onNext={()=>setStep("avatar")}/>;
  if(step==="avatar") return <AvatarScreen name={studentName} onPick={av=>{setAvatar(av);setStep("theme");}}/>;
  if(step==="theme") return <ThemeScreen onPick={k=>{setThemeKey(k);setStep("app");}}/>;

  if(screen==="hub") return <Hub avatar={avatar} name={studentName} t={t} themeKey={themeKey} onNavigate={id=>setScreen(id)}/>;
  if(screen==="classes") return <Classes avatar={avatar} name={studentName} t={t} themeKey={themeKey} onPick={(subj,key,starter)=>{setChatData({subject:subj,subjectKey:key,starter});setScreen("chat");}} onBack={goHub}/>;
  if(screen==="chat"&&chatData) return <Chat avatar={avatar} name={studentName} subject={chatData.subject} subjectKey={chatData.subjectKey} starter={chatData.starter} t={t} themeKey={themeKey} onBack={()=>setScreen("classes")}/>;

  if(screen==="progress") return <Progress avatar={avatar} name={studentName} t={t} themeKey={themeKey} onBack={goHub}/>;
  if(screen==="games") return <Games avatar={avatar} name={studentName} t={t} themeKey={themeKey} onBack={goHub}/>;
  if(screen==="learnmon") return <Learnmon avatar={avatar} name={studentName} t={t} themeKey={themeKey} onBack={goHub}/>;
  if(screen==="materials") return <Materials avatar={avatar} name={studentName} t={t} themeKey={themeKey} onBack={goHub}/>;

  return null;
}
