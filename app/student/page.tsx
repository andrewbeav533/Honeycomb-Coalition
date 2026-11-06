"use client";
import { useState } from "react";
import DashNav from "@/components/DashNav";
import RoleSwitcher from "@/components/RoleSwitcher";
import ActivityCard from "@/components/ActivityCard";
import { EVENTS, CLUBS } from "@/app/activities";

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

const PHOTOS = ["🌳", "🔬", "🎭", "⚽", "🎨", "📚", "🎃", "🏕️"];

const TABS = ["Home", "Events", "Clubs", "Classes", "Photos"];

export default function StudentHome() {
  const [tab, setTab] = useState("Home");

  return (
    <main style={{ minHeight: "100vh", background: "var(--ground)" }}>
      <DashNav tabs={TABS} active={tab} badge="HD" onSelect={setTab} />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 20px 64px" }}>
        {tab === "Home" && <HomePanel />}
        {tab === "Events" && <EventsPanel />}
        {tab === "Clubs" && <ClubsPanel />}
        {tab === "Classes" && <ClassesPanel />}
        {tab === "Photos" && <PhotosPanel />}
      </div>
      <RoleSwitcher />
    </main>
  );
}

/* ── Home ──────────────────────────────────────────────────────── */
function HomePanel() {
  return (
    <>
      {/* Hive banner */}
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
        </div>
      </section>

      {/* Classes + Announcements */}
      <div
        className="student-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 22, alignItems: "start" }}
      >
        <section>
          <SectionHead>Your classes</SectionHead>
          <div className="glass" style={{ borderRadius: 20, padding: 16 }}>
            <div className="class-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {CLASSES.map((c) => (
                <ClassCard key={c.name} c={c} />
              ))}
            </div>
          </div>
        </section>

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

      {/* To-do · Next event · Co-op chat */}
      <div
        className="trio-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 22, alignItems: "start" }}
      >
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
    </>
  );
}

/* ── Events ────────────────────────────────────────────────────── */
function EventsPanel() {
  return (
    <>
      <SectionHead>Events in your hive</SectionHead>
      <p style={{ color: "var(--ink-soft)", marginTop: -6, marginBottom: 18, fontSize: 15 }}>
        Posted by your hive and nearby co-ops. RSVP to save your spot.
      </p>
      <Grid>
        {EVENTS.map((a) => (
          <ActivityCard key={a.id} a={a} />
        ))}
      </Grid>
    </>
  );
}

/* ── Clubs ─────────────────────────────────────────────────────── */
function ClubsPanel() {
  return (
    <>
      <SectionHead>Clubs & meetups</SectionHead>
      <p style={{ color: "var(--ink-soft)", marginTop: -6, marginBottom: 18, fontSize: 15 }}>
        Open groups run by the community — libraries, rec centers, maker spaces. Anyone can join or start one.
      </p>
      <Grid>
        {CLUBS.map((a) => (
          <ActivityCard key={a.id} a={a} />
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: 28 }}>
        <button className="btn btn-ghost">+ Start a club</button>
      </div>
    </>
  );
}

/* ── Classes ───────────────────────────────────────────────────── */
function ClassesPanel() {
  return (
    <>
      <SectionHead>Your classes</SectionHead>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}
      >
        {CLASSES.map((c) => (
          <ClassCard key={c.name} c={c} />
        ))}
      </div>

      <SectionHead>Materials & resources</SectionHead>
      <div className="glass" style={{ borderRadius: 18, padding: 8 }}>
        {[
          { c: "Biology", t: "Lab worksheet — Week 10", color: "#2E8B57" },
          { c: "Literature", t: "Essay rubric + sample intros", color: "#6B4FA0" },
          { c: "U.S. History", t: "Ch. 7 study guide", color: "#C7622E" },
          { c: "Algebra II", t: "Problem set 9 (PDF)", color: "#1E7FC0" },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              borderBottom: i < 3 ? "1px solid var(--line)" : "none",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 3, background: r.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{r.t}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>{r.c}</div>
            </div>
            <button className="btn btn-ghost" style={{ padding: "7px 16px", fontSize: 13 }}>Open</button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Photos ────────────────────────────────────────────────────── */
function PhotosPanel() {
  return (
    <>
      <SectionHead>Event photos</SectionHead>
      <p style={{ color: "var(--ink-soft)", marginTop: -6, marginBottom: 18, fontSize: 15 }}>
        Galleries open only to families who attended. These are from events you checked into.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14 }}>
        {PHOTOS.map((p, i) => (
          <div
            key={i}
            className="lift"
            style={{
              aspectRatio: "1 / 1",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              background: `linear-gradient(145deg, var(--honey-bright), var(--honey-deep))`,
              opacity: 0.9,
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </>
  );
}

/* ── small presentational helpers ──────────────────────────────── */
function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
      {children}
    </div>
  );
}
function ClassCard({ c }: { c: (typeof CLASSES)[number] }) {
  return (
    <div
      className="lift"
      style={{ borderRadius: 14, overflow: "hidden", background: "var(--surface)", border: "1px solid var(--line)" }}
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
            <div className="mono" style={{ fontSize: 11, color: "var(--honey-deep)" }}>Due {c.due}</div>
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
  );
}
function Card({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="glass" style={{ borderRadius: 18, padding: 20, border: accent ? "1.5px solid var(--honey)" : undefined }}>
      {children}
    </div>
  );
}
function CardLabel({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
function SectionHead({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "1.3rem", margin: "28px 0 14px" }}>{children}</h2>;
}
function Chip({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <span
      className={mono ? "mono" : undefined}
      style={{ background: "rgba(21,18,14,0.14)", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 600 }}
    >
      {children}
    </span>
  );
}
