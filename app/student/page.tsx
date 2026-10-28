import Logo from "@/components/Logo";
import RoleSwitcher from "@/components/RoleSwitcher";

const CLASSES = [
  { name: "U.S. History", teacher: "Mrs. Dunphy", next: "Ch. 7 reading", due: "Fri", grade: "A−", color: "#C7622E" },
  { name: "Biology", teacher: "Mr. Albrecht", next: "Lab writeup", due: "Mon", grade: "B+", color: "#2E8B57" },
  { name: "Literature", teacher: "Mrs. Holt", next: "Essay draft", due: "Wed", grade: "A", color: "#6B4FA0" },
  { name: "Algebra II", teacher: "Mr. Reyes", next: "Problem set 9", due: "Thu", grade: "A−", color: "#1E7FC0" },
];

const ANNOUNCEMENTS = [
  {
    who: "Mrs. Holt",
    role: "Teaching parent · Literature",
    when: "2h ago",
    body: "Bring your annotated copy of the reading on Friday — we'll workshop intros in small groups.",
  },
  {
    who: "Peoria Hive",
    role: "Event · Fall Formal",
    when: "Yesterday",
    body: "🎟️ Fall Formal tickets are open! $70 covers the venue, DJ, and dessert bar. RSVP closes Nov 8.",
    event: true,
  },
  {
    who: "Mr. Albrecht",
    role: "Teaching parent · Biology",
    when: "2 days ago",
    body: "Lab materials for next week are posted under Biology → Resources. Print the worksheet beforehand.",
  },
];

const TODOS = [
  { text: "History — Ch. 7 reading", due: "Due Fri", done: false },
  { text: "RSVP to Fall Formal", due: "Closes Nov 8", done: false },
  { text: "Biology — lab writeup", due: "Due Mon", done: false },
  { text: "Literature — annotate reading", done: true },
];

const CHAT = [
  { who: "Noah", text: "is anyone carpooling to the formal?", when: "9:41" },
  { who: "Grace", text: "we have 2 open seats!", when: "9:44" },
  { who: "Mrs. Holt", text: "reminder: essay drafts Wed 🙂", when: "10:02" },
];

const TABS = ["Home", "Events", "Classes", "Photos"];

export default function StudentHome() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--ground)" }}>
      {/* ── App nav ─────────────────────────────────────────── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,253,247,0.8)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Logo size={30} />
          <nav style={{ display: "flex", gap: 4 }} className="app-tabs">
            {TABS.map((t) => (
              <span
                key={t}
                className="app-tab"
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: t === "Home" ? "var(--black)" : "var(--ink-soft)",
                  background: t === "Home" ? "var(--honey)" : "transparent",
                }}
              >
                {t}
              </span>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              className="hex"
              style={{
                width: 38,
                background: "var(--black)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "var(--font-display)",
              }}
            >
              HD
            </span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 20px 64px" }}>
        {/* ── Hive banner ───────────────────────────────────── */}
        <section
          className="hex-field"
          style={{
            borderRadius: 24,
            overflow: "hidden",
            background: "linear-gradient(135deg, var(--honey) 0%, var(--honey-deep) 100%)",
            padding: "clamp(26px, 4vw, 40px)",
            color: "var(--black)",
            position: "relative",
          }}
        >
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            PEORIA HIVE · PEORIA, IL
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)", marginTop: 10 }}>
            Welcome back, Hailey
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
            <Chip>📅 Fall Formal · Nov 15</Chip>
            <Chip>📚 4 classes</Chip>
            <Chip mono>Join code: PEORIA24</Chip>
          </div>
        </section>

        {/* ── Classes (what you see first) + Announcements ──── */}
        <div
          className="student-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
            marginTop: 22,
            alignItems: "start",
          }}
        >
          {/* classes — contained in one panel, no ragged space */}
          <section>
            <SectionHead>Your classes</SectionHead>
            <div className="glass" style={{ borderRadius: 20, padding: 16 }}>
              <div className="class-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {CLASSES.map((c) => (
                  <div
                    key={c.name}
                    className="lift"
                    style={{
                      borderRadius: 14,
                      overflow: "hidden",
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <div style={{ height: 9, background: c.color }} />
                    <div style={{ padding: "18px 18px 20px" }}>
                      <h3 style={{ fontSize: "1.22rem" }}>{c.name}</h3>
                      <p className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4 }}>
                        {c.teacher}
                      </p>
                      <div
                        style={{
                          marginTop: 16,
                          paddingTop: 14,
                          borderTop: "1px solid var(--line)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 600 }}>{c.next}</div>
                          <div className="mono" style={{ fontSize: 11, color: "var(--honey-deep)" }}>
                            Due {c.due}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: 13.5,
                            fontWeight: 700,
                            color: "var(--black)",
                            background: "var(--honey)",
                            borderRadius: 8,
                            padding: "4px 10px",
                          }}
                        >
                          {c.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* announcements — contained in one panel */}
          <section>
            <SectionHead>Announcements</SectionHead>
            <div className="glass" style={{ borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {ANNOUNCEMENTS.map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--surface)",
                    border: a.event ? "1.5px solid var(--honey)" : "1px solid var(--line)",
                    borderRadius: 14,
                    padding: 18,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <span
                      className="hex"
                      style={{
                        width: 36,
                        flexShrink: 0,
                        background: a.event ? "var(--black)" : "var(--honey)",
                        color: a.event ? "#fff" : "var(--black)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {a.event ? "★" : a.who[0]}
                    </span>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 700 }}>{a.who}</div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                        {a.role} · {a.when}
                      </div>
                    </div>
                  </div>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.55 }}>{a.body}</p>
                  {a.event && (
                    <button className="btn btn-honey" style={{ marginTop: 14, padding: "10px 20px", fontSize: 14 }}>
                      RSVP now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── To-do · Next event · Co-op chat ───────────────── */}
        <div
          className="trio-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 22,
            alignItems: "start",
          }}
        >
          {/* to-do */}
          <Card>
            <CardLabel>To-do</CardLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              {TODOS.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 6,
                      flexShrink: 0,
                      border: t.done ? "none" : "1.5px solid var(--line)",
                      background: t.done ? "var(--honey)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {t.done ? "✓" : ""}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 13.5,
                        fontWeight: 600,
                        textDecoration: t.done ? "line-through" : "none",
                        color: t.done ? "var(--ink-soft)" : "var(--ink)",
                      }}
                    >
                      {t.text}
                    </div>
                    {t.due && (
                      <div className="mono" style={{ fontSize: 10.5, color: "var(--honey-deep)" }}>{t.due}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* next event */}
          <Card>
            <CardLabel>Next event</CardLabel>
            <h3 style={{ fontSize: "1.15rem", marginTop: 6 }}>Fall Formal</h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 13.5, marginTop: 4 }}>
              Sat, Nov 15 · 7:00 PM<br />Lakeview Hall
            </p>
            <button className="btn btn-honey" style={{ width: "100%", marginTop: 14, padding: "11px 0", fontSize: 14 }}>
              RSVP — $70
            </button>
          </Card>

          {/* co-op chat */}
          <Card>
            <CardLabel>Co-op chat</CardLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {CHAT.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 9 }}>
                  <span
                    className="hex"
                    style={{
                      width: 26,
                      flexShrink: 0,
                      background: "var(--honey)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {m.who[0]}
                  </span>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{m.who} </span>
                    <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>{m.when}</span>
                    <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 1 }}>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <input className="field" placeholder="Message your hive…" style={{ marginTop: 14, fontSize: 13.5 }} />
          </Card>
        </div>
      </div>
      <RoleSwitcher />
    </main>
  );
}

/* ── small presentational helpers ─────────────────────────────── */
function Card({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div
      className="glass"
      style={{
        borderRadius: 18,
        padding: 20,
        border: accent ? "1.5px solid var(--honey)" : undefined,
      }}
    >
      {children}
    </div>
  );
}
function CardLabel({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
function SectionHead({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "1.3rem", marginBottom: 14 }}>{children}</h2>;
}
function Chip({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <span
      className={mono ? "mono" : undefined}
      style={{
        background: "rgba(21,18,14,0.14)",
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}
