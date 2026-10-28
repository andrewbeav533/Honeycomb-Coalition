import DashNav from "@/components/DashNav";
import RoleSwitcher from "@/components/RoleSwitcher";

const NEARBY = [
  { title: "Fall Formal", date: "Sat, Nov 15 · 7:00 PM", place: "Lakeview Hall · 4 mi", need: "Chaperones · Photographers", filled: false },
  { title: "Science Fair", date: "Thu, Dec 4 · 9:00 AM", place: "Peoria Co-op · 2 mi", need: "Setup crew · Judges", filled: false },
  { title: "Park Day", date: "Sat, Nov 8 · 11:00 AM", place: "Donovan Park · 6 mi", need: "You're signed up ✓", filled: true },
];

const MY_SIGNUPS = [
  { title: "Park Day", role: "Photographer", when: "Nov 8" },
  { title: "Book Fair", role: "Setup crew", when: "Nov 22" },
];

const GALLERY = ["#C7622E", "#2E8B57", "#6B4FA0", "#1E7FC0", "#d99a00", "#C7622E"];

export default function VolunteerHome() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--ground)" }}>
      <DashNav tabs={["Home", "Events", "Photos"]} active="Home" badge="V" />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 20px 64px" }}>
        {/* ── Banner ────────────────────────────────────────── */}
        <section
          className="hex-field"
          style={{
            borderRadius: 24,
            overflow: "hidden",
            background: "linear-gradient(135deg, var(--honey) 0%, var(--honey-deep) 100%)",
            padding: "clamp(26px, 4vw, 40px)",
            color: "var(--black)",
          }}
        >
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            PEORIA HIVE · VOLUNTEER
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)", marginTop: 10 }}>
            Thanks for pitching in, Marcus
          </h1>
          <p style={{ marginTop: 10, fontSize: 15, maxWidth: 440, color: "#4a3a05" }}>
            2 events near you need hands this month. Sign up below and share your photos afterward.
          </p>
        </section>

        {/* ── Events in your area + My sign-ups ─────────────── */}
        <div className="student-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22, marginTop: 22, alignItems: "start" }}>
          <section>
            <SectionHead>Events in your area</SectionHead>
            <div className="glass" style={{ borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {NEARBY.map((e) => (
                <div
                  key={e.title}
                  className="lift"
                  style={{
                    background: "var(--surface)",
                    border: e.filled ? "1.5px solid var(--honey)" : "1px solid var(--line)",
                    borderRadius: 14,
                    padding: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "1.18rem" }}>{e.title}</h3>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>{e.date}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>📍 {e.place}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: e.filled ? "var(--honey-deep)" : "var(--ink)", marginTop: 6 }}>{e.need}</div>
                  </div>
                  <button
                    className={e.filled ? "btn btn-ghost" : "btn btn-honey"}
                    style={{ padding: "11px 20px", fontSize: 14, flexShrink: 0 }}
                  >
                    {e.filled ? "Signed up" : "Sign up"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHead>My sign-ups</SectionHead>
            <div className="glass" style={{ borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {MY_SIGNUPS.map((s) => (
                <div key={s.title} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="hex" style={{ width: 34, flexShrink: 0, background: "var(--honey)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                    {s.when.split(" ")[1]}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.title}</div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>{s.role} · {s.when}</div>
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost" style={{ padding: "10px 0", fontSize: 13.5 }}>View my schedule →</button>
            </div>
          </section>
        </div>

        {/* ── Post pictures ─────────────────────────────────── */}
        <section style={{ marginTop: 22 }}>
          <SectionHead>Post pictures</SectionHead>
          <div className="glass" style={{ borderRadius: 20, padding: 20 }}>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                border: "2px dashed var(--line)",
                borderRadius: 16,
                padding: "28px 20px",
                cursor: "pointer",
                background: "rgba(244,190,18,0.06)",
              }}
            >
              <span style={{ fontSize: 30 }}>📷</span>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Upload photos from an event you attended</span>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>
                Only families who checked in will see them
              </span>
              <input type="file" multiple accept="image/*" style={{ display: "none" }} />
            </label>

            <div style={{ marginTop: 18 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Park Day · 24 photos</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
                {GALLERY.map((c, i) => (
                  <div
                    key={i}
                    className="lift"
                    style={{
                      aspectRatio: "1 / 1",
                      borderRadius: 12,
                      background: `linear-gradient(145deg, ${c}, var(--honey))`,
                      display: "flex",
                      alignItems: "flex-end",
                      padding: 8,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>🖼️</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <RoleSwitcher />
    </main>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "1.3rem", marginBottom: 14 }}>{children}</h2>;
}
