"use client";
import { useState } from "react";
import DashNav from "@/components/DashNav";
import RoleSwitcher from "@/components/RoleSwitcher";
import EventPlanner, { type EventPlan } from "@/components/EventPlanner";
import { PLANS } from "@/app/plans";

const STUDENTS = [
  { name: "Hailey Deckard", curriculum: "11th · College-prep", gpa: "3.8", color: "#C7622E" },
  { name: "Noah Pruitt", curriculum: "10th · Classical", gpa: "3.6", color: "#2E8B57" },
  { name: "Grace Okafor", curriculum: "12th · STEM track", gpa: "4.0", color: "#6B4FA0" },
  { name: "Eli Ramos", curriculum: "9th · Foundations", gpa: "3.4", color: "#1E7FC0" },
  { name: "Maya Linden", curriculum: "11th · College-prep", gpa: "3.9", color: "#C7622E" },
];

const THREADS = [
  { who: "Biology — Period 2", preview: "Lab writeup due Monday, materials posted.", kind: "Class", when: "1h" },
  { who: "Hailey Deckard", preview: "Re: missing essay draft — got it, thank you!", kind: "Student", when: "3h" },
  { who: "Literature parents", preview: "Field trip permission slips due Fri.", kind: "Homework", when: "Yesterday" },
];

const EVENTS = [
  { title: "Fall Formal", date: "Sat, Nov 15 · 7:00 PM", rsvps: 84, cap: 120 },
  { title: "Science Fair", date: "Thu, Dec 4 · 9:00 AM", rsvps: 31, cap: 60 },
];

const VOLUNTEERS = [
  { name: "Dana Holt", role: "Chaperone · cleared", initial: "D" },
  { name: "Marcus Reyes", role: "Photographer · cleared", initial: "M" },
  { name: "Priya Shah", role: "Setup crew · pending", initial: "P" },
];

const CLASSES = [
  { name: "U.S. History", teacher: "Mrs. Dunphy", students: 14, color: "#C7622E" },
  { name: "Biology", teacher: "Mr. Albrecht", students: 11, color: "#2E8B57" },
  { name: "Literature", teacher: "Mrs. Holt", students: 16, color: "#6B4FA0" },
  { name: "Algebra II", teacher: "Mr. Reyes", students: 12, color: "#1E7FC0" },
];


const TABS = ["Home", "Students", "Classes", "Events", "Messages"];

export default function AdminHome() {
  const [tab, setTab] = useState("Home");

  return (
    <main style={{ minHeight: "100vh", background: "var(--ground)" }}>
      <DashNav tabs={TABS} active={tab} badge="CA" onSelect={setTab} />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 20px 64px" }}>
        {tab === "Home" && <HomePanel />}
        {tab === "Students" && <StudentsPanel />}
        {tab === "Classes" && <ClassesPanel />}
        {tab === "Events" && <EventsPanel />}
        {tab === "Messages" && <MessagesPanel />}
      </div>
      <RoleSwitcher />
    </main>
  );
}

/* ── Home ──────────────────────────────────────────────────────── */
function HomePanel() {
  return (
    <>
      <section
        className="hex-field"
        style={{
          borderRadius: 24,
          overflow: "hidden",
          background: "linear-gradient(135deg, var(--black) 0%, #2a2118 100%)",
          padding: "clamp(26px, 4vw, 40px)",
          color: "#f4efe3",
        }}
      >
        <span className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--honey)" }}>
          PEORIA HIVE · CO-OP ADMIN
        </span>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)", marginTop: 10, color: "#fff" }}>
          Welcome back, Mrs. Holt
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
          <Stat n="42" label="Students" />
          <Stat n="8" label="Classes" />
          <Stat n="2" label="Upcoming events" />
          <Stat n="6" label="Volunteers" />
        </div>
      </section>

      <div className="student-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 22, alignItems: "start" }}>
        <section>
          <SectionHead>Student profiles</SectionHead>
          <div className="glass" style={{ borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {STUDENTS.map((s) => (
              <StudentRow key={s.name} s={s} />
            ))}
            <button className="btn btn-ghost" style={{ marginTop: 4, padding: "10px 0", fontSize: 14 }}>
              View full roster & forum →
            </button>
          </div>
        </section>

        <section>
          <SectionHead>Post an announcement</SectionHead>
          <div className="glass" style={{ borderRadius: 20, padding: 20 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Send to</span>
              <select className="field" defaultValue="all">
                <option value="all">Everyone in Peoria Hive</option>
                <option value="bio">Biology — Period 2</option>
                <option value="parents">Parents only</option>
                <option value="vol">Volunteers</option>
              </select>
            </label>
            <textarea
              className="field"
              rows={5}
              placeholder="Bring your annotated reading on Friday — we'll workshop intros in small groups…"
              style={{ marginTop: 14, resize: "vertical", fontFamily: "var(--font-body)" }}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="btn btn-honey" style={{ flex: 1, padding: "12px 0", fontSize: 14 }}>Publish</button>
              <button className="btn btn-ghost" style={{ padding: "12px 18px", fontSize: 14 }}>📎 Attach</button>
            </div>
          </div>
        </section>
      </div>

      <div className="trio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 22, alignItems: "start" }}>
        <Card>
          <CardLabel>Messaging</CardLabel>
          <Threads />
        </Card>

        <Card>
          <CardLabel>Event coordination</CardLabel>
          <EventList />
        </Card>

        <Card>
          <CardLabel>Volunteer profiles</CardLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
            {VOLUNTEERS.map((v) => (
              <div key={v.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="hex" style={{ width: 30, flexShrink: 0, background: "var(--honey)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                  {v.initial}
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{v.name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>{v.role}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ width: "100%", marginTop: 14, padding: "10px 0", fontSize: 13.5 }}>
            📣 Publicize a role
          </button>
        </Card>
      </div>
    </>
  );
}

/* ── Students (+ one-time invite codes) ────────────────────────── */
function StudentsPanel() {
  const [codes, setCodes] = useState<Record<string, string>>({});

  function issue(name: string) {
    const code = "PEO-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setCodes((c) => ({ ...c, [name]: code }));
  }

  return (
    <>
      <SectionHead>Roster & invite codes</SectionHead>
      <p style={{ color: "var(--ink-soft)", marginTop: -6, marginBottom: 18, fontSize: 15 }}>
        Invite codes are single-use and tied to one student. Generate one only when a family
        needs it — once used, it can&apos;t be reused by anyone else.
      </p>
      <div className="glass" style={{ borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {STUDENTS.map((s) => (
          <div
            key={s.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              padding: "12px 14px",
              flexWrap: "wrap",
            }}
          >
            <span className="hex" style={{ width: 36, flexShrink: 0, background: s.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
              {s.name[0]}
            </span>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>{s.name}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>{s.curriculum}</div>
            </div>
            {codes[s.name] ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--black)", background: "var(--honey)", borderRadius: 8, padding: "6px 12px", letterSpacing: "0.05em" }}>
                  {codes[s.name]}
                </span>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>one-time · issued</span>
              </div>
            ) : (
              <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => issue(s.name)}>
                Generate invite code
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Classes ───────────────────────────────────────────────────── */
function ClassesPanel() {
  return (
    <>
      <SectionHead>Classes</SectionHead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {CLASSES.map((c) => (
          <div key={c.name} className="glass lift" style={{ borderRadius: 16, overflow: "hidden" }}>
            <div style={{ height: 9, background: c.color }} />
            <div style={{ padding: 18 }}>
              <h3 style={{ fontSize: "1.2rem" }}>{c.name}</h3>
              <p className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4 }}>{c.teacher}</p>
              <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{c.students} enrolled</span>
                <button className="btn btn-ghost" style={{ padding: "7px 14px", fontSize: 13 }}>Manage</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <button className="btn btn-honey">+ Add a class</button>
      </div>
    </>
  );
}

/* ── Events ────────────────────────────────────────────────────── */
function EventsPanel() {
  const [plans, setPlans] = useState<EventPlan[]>(PLANS);
  const [sel, setSel] = useState(PLANS[0].id);
  const [creating, setCreating] = useState(false);
  const plan = plans.find((p) => p.id === sel)!;

  function create(p: EventPlan) {
    setPlans((ps) => [...ps, p]);
    setSel(p.id);
    setCreating(false);
  }

  return (
    <>
      {creating && <CreateEventForm existing={plans.length} onCreate={create} onClose={() => setCreating(false)} />}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <SectionHead>Event planner</SectionHead>
        <button className="btn btn-honey" style={{ padding: "10px 18px", fontSize: 14 }} onClick={() => setCreating(true)}>
          + Create event
        </button>
      </div>

      {/* event picker */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => setSel(p.id)}
            style={{
              padding: "9px 16px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              border: "1.5px solid",
              borderColor: p.id === sel ? "var(--honey)" : "var(--line)",
              background: p.id === sel ? "rgba(244,190,18,0.14)" : "transparent",
              color: "var(--ink)",
            }}
          >
            {p.title}
            <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginLeft: 8 }}>{p.date}</span>
          </button>
        ))}
      </div>

      <EventPlanner key={plan.id} plan={plan} />
    </>
  );
}

/* ── Create event (blank planner) ──────────────────────────────── */
function CreateEventForm({ existing, onCreate, onClose }: { existing: number; onCreate: (p: EventPlan) => void; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(21,18,14,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div onClick={(e) => e.stopPropagation()} className="glass-strong" style={{ borderRadius: 22, padding: 28, width: "100%", maxWidth: 460 }}>
        <span className="eyebrow">New event</span>
        <h2 style={{ fontSize: "1.5rem", marginTop: 8 }}>Create an event</h2>
        <p style={{ color: "var(--ink-soft)", marginTop: 8, fontSize: 14 }}>
          Enter the basics — you&apos;ll add roles, materials, and a schedule in the planner.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget;
            const g = (n: string) => (f.elements.namedItem(n) as HTMLInputElement).value;
            onCreate({
              id: "evt-" + (existing + 1),
              title: g("title") || "Untitled event",
              status: "Planning",
              date: g("date"),
              time: g("time"),
              location: g("location"),
              address: g("address"),
              capacity: Number(g("capacity")) || 0,
              rsvps: 0,
              roles: [],
              materials: [],
              schedule: [],
            });
          }}
          style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}
        >
          <input className="field" name="title" placeholder="Event name" required />
          <div style={{ display: "flex", gap: 10 }}>
            <input className="field" name="date" placeholder="Date (e.g. Sat, Dec 20)" />
            <input className="field" name="time" placeholder="Time (e.g. 6–9 PM)" />
          </div>
          <input className="field" name="location" placeholder="Location" />
          <input className="field" name="address" placeholder="Address" />
          <input className="field" name="capacity" type="number" min="0" placeholder="Capacity" />
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-honey" style={{ flex: 1 }}>Create & plan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Messages ──────────────────────────────────────────────────── */
function MessagesPanel() {
  return (
    <>
      <SectionHead>Messages</SectionHead>
      <div className="glass" style={{ borderRadius: 20, padding: 20, maxWidth: 640 }}>
        <Threads />
        <input className="field" placeholder="Start a new thread…" style={{ marginTop: 16 }} />
      </div>
    </>
  );
}

/* ── shared bits ───────────────────────────────────────────────── */
function Threads() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
      {THREADS.map((t, i) => (
        <div key={i} style={{ borderBottom: i < THREADS.length - 1 ? "1px solid var(--line)" : "none", paddingBottom: i < THREADS.length - 1 ? 12 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{t.who}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--honey-deep)", background: "rgba(244,190,18,0.16)", borderRadius: 6, padding: "2px 7px" }}>{t.kind}</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>{t.preview}</p>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>{t.when} ago</span>
        </div>
      ))}
    </div>
  );
}
function EventList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
      {EVENTS.map((e) => (
        <div key={e.title} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700 }}>{e.title}</div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>{e.date}</div>
          <div style={{ height: 6, borderRadius: 999, background: "var(--line)", marginTop: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(e.rsvps / e.cap) * 100}%`, background: "var(--honey)" }} />
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--honey-deep)", marginTop: 5 }}>{e.rsvps}/{e.cap} RSVP’d</div>
        </div>
      ))}
      <button className="btn btn-honey" style={{ padding: "11px 0", fontSize: 14 }}>+ Create event</button>
    </div>
  );
}

/* ── helpers ──────────────────────────────────────────────────── */
function StudentRow({ s }: { s: (typeof STUDENTS)[number] }) {
  return (
    <div
      className="lift"
      style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "12px 14px" }}
    >
      <span className="hex" style={{ width: 36, flexShrink: 0, background: s.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
        {s.name[0]}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700 }}>{s.name}</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>{s.curriculum}</div>
      </div>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--black)", background: "var(--honey)", borderRadius: 8, padding: "4px 10px" }}>
        {s.gpa}
      </span>
    </div>
  );
}
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div style={{ fontSize: "1.9rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--honey)", lineHeight: 1 }}>{n}</div>
      <div className="mono" style={{ fontSize: 11, color: "#b8ad98", marginTop: 4 }}>{label}</div>
    </div>
  );
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="glass" style={{ borderRadius: 18, padding: 20 }}>{children}</div>;
}
function CardLabel({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
function SectionHead({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "1.3rem", marginBottom: 14 }}>{children}</h2>;
}
