// FICTIONAL SAMPLE DATA — names and notes are not real students.
// Shared between TeacherDashboard.jsx and ParentDashboard.jsx so the two
// surfaces refer to the same imagined classroom.

export const STUDENTS = [
  { name:"Riley R.", sessions:12, streak:5, xp:340, status:"check-in", struggles:["Fractions → stalls converting visuals to equations","Word problems → loses multi-step sequences"], strengths:["Strong spatial reasoning","Drawing-based explanations work"], pattern:"Engagement drops after timed tasks. Re-engages with visual scaffolding.", intervention:"Try grid-based fraction exercises with color-coded parts. Companion saw success when they draw before writing.", changed:"Stopped asking for hints this week.", mood:"frustrated" },
  { name:"Avery T.", sessions:8, streak:3, xp:220, status:"support", struggles:["Multiplication → freezes on timed recall"], strengths:["Excellent reading comprehension","Above-grade vocabulary"], pattern:"Performs well untimed. Anxiety in timed tasks.", intervention:"Remove time pressure for math. She self-corrects with 10 extra seconds.", changed:"Reading confidence up. Math confidence declining.", mood:"anxious" },
  { name:"Sam J.", sessions:15, streak:7, xp:480, status:"thriving", struggles:[], strengths:["Strong across all subjects","Asks thoughtful follow-ups","Helps peers"], pattern:"High engagement, steady growth. Self-motivated.", intervention:"No intervention needed. Consider enrichment challenges.", changed:"Asking questions about space — curious beyond curriculum.", mood:"engaged" },
  { name:"Jordan M.", sessions:6, streak:2, xp:150, status:"urgent", struggles:["Reading → can't infer character motivation","Science → memorizes but can't explain why"], strengths:["Good verbal one-on-one","Understands community concepts"], pattern:"Engagement dropped sharply. Full sentences → one-word answers.", intervention:"Check in personally today. Something may have changed outside school. Withdrawal is across ALL subjects.", changed:"Three sessions abandoned early this week. New behavior.", mood:"withdrawn" },
  { name:"Quinn W.", sessions:10, streak:4, xp:290, status:"on-track", struggles:["Subtraction → loses place value when borrowing"], strengths:["Loves science and animals","Strong visual memory"], pattern:"Steady improvement. Subtraction is isolated.", intervention:"Vertical format with place-value columns. Confirmed in 3 sessions.", changed:"No significant changes.", mood:"calm" },
  { name:"Casey L.", sessions:4, streak:1, xp:90, status:"check-in", struggles:["Sounding out words → skips middle syllables","Fractions → no foundation yet"], strengths:["High effort even when struggling","Responds well to encouragement"], pattern:"Low skill, high effort. Needs scaffolding not challenge.", intervention:"Start with manipulatives before abstract notation. Pizza slice analogies worked.", changed:"Streak broke yesterday. Check motivation.", mood:"trying" },
];

export const CHILD = {
  name: "Riley R.", grade: "3rd Grade", companion: "Luna 🐱", theme: "Space 🚀",
  sessions: 12, streak: 5, xp: 340, level: 4,
  status: "check-in", statusLabel: "Needs check-in",
  strengths: ["Strong spatial reasoning with shapes", "Responds well to drawing-based explanations", "High effort and curiosity"],
  struggles: ["Fractions — stalls when converting visuals to written equations", "Word problems — loses track of multi-step sequences"],
  recentTopics: ["Multiplication practice", "Shape identification", "Fraction basics", "Addition review"],
  pattern: "Engagement drops after timed math tasks. Re-engages with visual scaffolding. Stopped asking for hints this week — may be avoiding perceived failure.",
  weekSummary: "Riley had 4 sessions this week. Strong improvement in shape recognition and basic addition. Fractions remain challenging — the visual concept is clear, but writing the equations is the gap. Their companion noticed Riley works best when they can draw before writing. Riley seemed more hesitant to ask for help this week compared to last week.",
  howToHelp: [
    "Practice fractions at home using pizza slices, pie pieces, or drawing — visual/hands-on approaches work best",
    "Let Riley explain math problems to you out loud — they process better verbally",
    "Avoid timed drills for now — they increase anxiety. Untimed practice builds confidence",
    "Celebrate effort, not just correct answers — Riley responds strongly to encouragement",
    "Ask Riley to teach you what they learned today — teaching reinforces understanding",
  ],
  teacherNote: "Riley is making good progress! Especially strong with visual and spatial tasks. We're working on building confidence with written math — Riley knows more than they think. Keep encouraging at home!",
};
