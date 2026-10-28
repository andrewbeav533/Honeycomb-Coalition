import DashNav from "@/components/DashNav";
import RoleSwitcher from "@/components/RoleSwitcher";

const HIVES = [
  { name: "Peoria Hive", city: "Peoria, IL", members: 142, events: 2, admin: "Mrs. Holt", health: "ok" },
  { name: "Springfield Hive", city: "Springfield, IL", members: 98, events: 1, admin: "Mr. Avery", health: "ok" },
  { name: "Bloomington Hive", city: "Bloomington, IL", members: 61, events: 0, admin: "Ms. Cole", health: "warn" },
  { name: "Champaign Hive", city: "Champaign, IL", members: 77, events: 3, admin: "Mrs. Nunez", health: "ok" },
];

const TICKETS = [
  { who: "Mrs. Holt · Peoria", subject: "Can't add a new teaching parent", pri: "High", when: "22m" },
  { who: "Marcus (volunteer)", subject: "Photos not showing for an event I attended", pri: "Med", when: "1h" },
  { who: "Ms. Cole · Bloomington", subject: "Join code stopped working", pri: "High", when: "3h" },
  { who: "Parent · Champaign", subject: "Refund on a cancelled field trip", pri: "Low", when: "Yesterday" },
];

const RESOURCES = [
  { icon: "🧑‍🏫", title: "Co-op admin resources", body: "Rosters, curricula, messaging, event coordination — across every hive." },
  { icon: "🤝", title: "Volunteer resources", body: "Area sign-ups, photo galleries, clearance status for all volunteers." },
  { icon: "📘", title: "Onboarding playbook", body: "Standing up a new hive: verification, join codes, first event." },
];

export default function SuperAdminHome() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--ground)" }}>
      <DashNav tabs={["Helpdesk", "Co-ops", "Admin tools", "Volunteers"]} active="Helpdesk" badge="SA" />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 20px 64px" }}>
        {/* ── Banner ────────────────────────────────────────── */}
        <section
          className="hex-field"
          style={{
            borderRadius: 24,
            overflow: "hidden",
            background: "linear-gradient(135deg, #15120e 0%, #3a2d13 100%)",
            padding: "clamp(26px, 4vw, 40px)",
            color: "#f4efe3",
          }}
        >
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--honey)" }}>
            HONEYCOMB COALITION · SUPER ADMIN
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)", marginTop: 10, color: "#fff" }}>
            Helpdesk & every hive
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
            <Stat n="4" label="Active hives" />
            <Stat n="378" label="Members" />
            <Stat n="4" label="Open tickets" />
            <Stat n="6" label="Events this month" />
          </div>
        </section>

        {/* ── Helpdesk + All co-ops ─────────────────────────── */}
        <div className="student-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 22, alignItems: "start" }}>
          <section>
            <SectionHead>Helpdesk queue</SectionHead>
            <div className="glass" style={{ borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {TICKETS.map((t, i) => (
                <div
                  key={i}
                  className="lift"
                  style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "14px 16px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700 }}>{t.subject}</span>
                    <Pri level={t.pri} />
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 5 }}>
                    {t.who} · {t.when} ago
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHead>All co-ops</SectionHead>
            <div className="glass" style={{ borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {HIVES.map((h) => (
                <div
                  key={h.name}
                  className="lift"
                  style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "12px 14px" }}
                >
                  <span className="hex" style={{ width: 36, flexShrink: 0, background: h.health === "warn" ? "var(--honey-deep)" : "var(--honey)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
                    {h.name[0]}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700 }}>
                      {h.name}{" "}
                      {h.health === "warn" && <span title="Needs attention">⚠️</span>}
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>{h.city} · {h.admin}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{h.members}</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>{h.events} events</div>
                  </div>
                </div>
              ))}
              <button className="btn btn-ink" style={{ marginTop: 4, padding: "11px 0", fontSize: 14 }}>+ Launch a new hive</button>
            </div>
          </section>
        </div>

        {/* ── Resources on top of everything ────────────────── */}
        <section style={{ marginTop: 22 }}>
          <SectionHead>Resources across every hive</SectionHead>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {RESOURCES.map((r) => (
              <div key={r.title} className="glass lift" style={{ borderRadius: 18, padding: 22 }}>
                <div className="hex" style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, var(--honey-bright), var(--honey))", fontSize: 20, marginBottom: 14 }}>
                  {r.icon}
                </div>
                <h3 style={{ fontSize: "1.18rem" }}>{r.title}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 8, fontSize: 14.5, lineHeight: 1.55 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <RoleSwitcher />
    </main>
  );
}

/* ── helpers ──────────────────────────────────────────────────── */
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div style={{ fontSize: "1.9rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--honey)", lineHeight: 1 }}>{n}</div>
      <div className="mono" style={{ fontSize: 11, color: "#b8ad98", marginTop: 4 }}>{label}</div>
    </div>
  );
}
function Pri({ level }: { level: string }) {
  const map: Record<string, string> = { High: "#C7622E", Med: "var(--honey-deep)", Low: "var(--ink-soft)" };
  return (
    <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: map[level], borderRadius: 6, padding: "2px 8px", flexShrink: 0 }}>
      {level}
    </span>
  );
}
function SectionHead({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "1.3rem", marginBottom: 14 }}>{children}</h2>;
}
