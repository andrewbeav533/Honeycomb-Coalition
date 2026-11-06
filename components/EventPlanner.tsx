"use client";
import { useState } from "react";

export type EventPlan = {
  id: string;
  title: string;
  status: string;
  date: string;
  time: string;
  location: string;
  address: string;
  capacity: number;
  rsvps: number;
  roles: { role: string; need: number; filled: string[] }[];
  materials: { item: string; qty: string; who: string; where: string; done: boolean }[];
  schedule: { time: string; item: string }[];
};

const VOL_POOL = ["Dana Holt", "Marcus Reyes", "Priya Shah", "Tom Avery", "Lena Cole", "Sam Ruiz", "Nina Patel"];

const SOCIALS = [
  { key: "facebook", label: "Facebook", icon: "📘" },
  { key: "instagram", label: "Instagram", icon: "📸" },
  { key: "x", label: "X", icon: "𝕏" },
  { key: "nextdoor", label: "Nextdoor", icon: "🏡" },
];

export default function EventPlanner({ plan }: { plan: EventPlan }) {
  const [roles, setRoles] = useState(plan.roles);
  const [materials, setMaterials] = useState(plan.materials);
  const [schedule, setSchedule] = useState(plan.schedule);
  const [adding, setAdding] = useState<"role" | "material" | "time" | null>(null);
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [autoPush, setAutoPush] = useState(false);
  const [pushed, setPushed] = useState(false);

  function toggleSocial(name: string) {
    setConnected((c) => {
      const next = new Set(c);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
    setPushed(false);
  }

  const assignedEverywhere = roles.flatMap((r) => r.filled);
  const available = VOL_POOL.filter((v) => !assignedEverywhere.includes(v));

  function assign(roleIdx: number, name: string) {
    if (!name) return;
    setRoles((rs) => rs.map((r, i) => (i === roleIdx ? { ...r, filled: [...r.filled, name] } : r)));
  }
  function unassign(roleIdx: number, name: string) {
    setRoles((rs) => rs.map((r, i) => (i === roleIdx ? { ...r, filled: r.filled.filter((n) => n !== name) } : r)));
  }
  function toggleMaterial(idx: number) {
    setMaterials((ms) => ms.map((m, i) => (i === idx ? { ...m, done: !m.done } : m)));
  }

  const rolesFilled = roles.reduce((s, r) => s + Math.min(r.filled.length, r.need), 0);
  const rolesNeeded = roles.reduce((s, r) => s + r.need, 0);
  const materialsDone = materials.filter((m) => m.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Header / details ─────────────────────────────────── */}
      <div
        className="hex-field"
        style={{
          borderRadius: 20,
          overflow: "hidden",
          background: "linear-gradient(135deg, var(--honey) 0%, var(--honey-deep) 100%)",
          padding: 24,
          color: "var(--black)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.6rem" }}>{plan.title}</h2>
          <span className="mono" style={{ fontSize: 11, fontWeight: 700, background: "rgba(21,18,14,0.16)", borderRadius: 999, padding: "4px 12px" }}>
            {plan.status}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginTop: 18 }}>
          <Detail icon="📅" label="Date" value={plan.date} />
          <Detail icon="🕒" label="Time" value={plan.time} />
          <Detail icon="📍" label="Location" value={plan.location} sub={plan.address} />
          <Detail icon="👥" label="RSVPs" value={`${plan.rsvps} / ${plan.capacity}`} sub={`${plan.capacity - plan.rsvps} spots left`} />
        </div>
      </div>

      {/* ── Readiness summary ────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        <Progress label="Volunteer roles filled" done={rolesFilled} total={rolesNeeded} />
        <Progress label="Materials secured" done={materialsDone} total={materials.length} />
        <Progress label="Attendance" done={plan.rsvps} total={plan.capacity} />
      </div>

      {/* ── Volunteer roles ──────────────────────────────────── */}
      <section>
        <SectionHead>Volunteer roles</SectionHead>
        <div className="glass" style={{ borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {roles.map((r, idx) => {
            const open = r.need - r.filled.length;
            return (
              <div key={r.role} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{r.role}</span>
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: open <= 0 ? "#2E8B57" : "var(--honey-deep)",
                      background: open <= 0 ? "rgba(46,139,87,0.12)" : "rgba(244,190,18,0.16)",
                      borderRadius: 6,
                      padding: "3px 9px",
                    }}
                  >
                    {open <= 0 ? "✓ fully staffed" : `${open} open of ${r.need}`}
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                  {r.filled.map((name) => (
                    <span
                      key={name}
                      style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--honey)", borderRadius: 999, padding: "5px 6px 5px 12px", fontSize: 13, fontWeight: 600 }}
                    >
                      {name}
                      <button
                        onClick={() => unassign(idx, name)}
                        title="Remove"
                        style={{ border: "none", cursor: "pointer", background: "rgba(21,18,14,0.18)", color: "var(--black)", borderRadius: 999, width: 18, height: 18, fontSize: 12, lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {open > 0 &&
                    Array.from({ length: open }).map((_, i) => (
                      <span key={i} style={{ border: "1.5px dashed var(--line)", borderRadius: 999, padding: "5px 12px", fontSize: 12.5, color: "var(--ink-soft)" }}>
                        open slot
                      </span>
                    ))}
                </div>

                {open > 0 && available.length > 0 && (
                  <select
                    className="field"
                    value=""
                    onChange={(e) => assign(idx, e.target.value)}
                    style={{ marginTop: 12, fontSize: 13.5, maxWidth: 260 }}
                  >
                    <option value="">+ Assign a volunteer…</option>
                    {available.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}

          {adding === "role" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.currentTarget;
                const role = (f.elements.namedItem("role") as HTMLInputElement).value;
                const need = Number((f.elements.namedItem("need") as HTMLInputElement).value) || 1;
                if (role) setRoles((rs) => [...rs, { role, need, filled: [] }]);
                setAdding(null);
              }}
              style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: 4 }}
            >
              <input className="field" name="role" placeholder="Role name" autoFocus style={{ flex: 2, minWidth: 160 }} />
              <input className="field" name="need" type="number" min="1" defaultValue="1" placeholder="#" style={{ width: 80 }} />
              <button type="submit" className="btn btn-honey" style={{ padding: "8px 16px", fontSize: 13 }}>Add</button>
              <button type="button" className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setAdding(null)}>Cancel</button>
            </form>
          ) : (
            <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13, alignSelf: "flex-start" }} onClick={() => setAdding("role")}>
              + Add role
            </button>
          )}
        </div>
      </section>

      {/* ── Materials ────────────────────────────────────────── */}
      <section>
        <SectionHead>Materials & supplies</SectionHead>
        <div className="glass" style={{ borderRadius: 18, padding: 8 }}>
          {materials.map((m, idx) => (
            <div
              key={m.item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderBottom: idx < materials.length - 1 ? "1px solid var(--line)" : "none",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 14.5, fontWeight: 600 }}>
                  {m.item} <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 400 }}>×{m.qty}</span>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                  {m.who} · 📍 {m.where}
                </div>
              </div>
              <button
                onClick={() => toggleMaterial(idx)}
                className="mono"
                style={{
                  cursor: "pointer",
                  border: "none",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 7,
                  padding: "6px 12px",
                  color: m.done ? "#2E8B57" : "var(--honey-deep)",
                  background: m.done ? "rgba(46,139,87,0.12)" : "rgba(244,190,18,0.16)",
                }}
              >
                {m.done ? "✓ Secured" : "Needed"}
              </button>
            </div>
          ))}
          <div style={{ padding: 10 }}>
            {adding === "material" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = e.currentTarget;
                  const g = (n: string) => (f.elements.namedItem(n) as HTMLInputElement).value;
                  if (g("item")) setMaterials((ms) => [...ms, { item: g("item"), qty: g("qty") || "1", who: g("who"), where: g("where"), done: false }]);
                  setAdding(null);
                }}
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
              >
                <input className="field" name="item" placeholder="Item" autoFocus style={{ flex: 2, minWidth: 140 }} />
                <input className="field" name="qty" placeholder="Qty" style={{ width: 70 }} />
                <input className="field" name="who" placeholder="Who brings it" style={{ flex: 1, minWidth: 120 }} />
                <input className="field" name="where" placeholder="Where" style={{ flex: 1, minWidth: 110 }} />
                <button type="submit" className="btn btn-honey" style={{ padding: "8px 16px", fontSize: 13 }}>Add</button>
                <button type="button" className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setAdding(null)}>Cancel</button>
              </form>
            ) : (
              <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setAdding("material")}>+ Add item</button>
            )}
          </div>
        </div>
      </section>

      {/* ── Run of show ──────────────────────────────────────── */}
      <section>
        <SectionHead>Run of show</SectionHead>
        <div className="glass" style={{ borderRadius: 18, padding: 20 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {schedule.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "stretch" }}>
                  <span className="hex" style={{ width: 12, background: "var(--honey)", flexShrink: 0, marginTop: 4 }} />
                  {i < schedule.length - 1 && <span style={{ width: 2, flex: 1, background: "var(--line)", margin: "2px 0" }} />}
                </div>
                <div style={{ paddingBottom: i < schedule.length - 1 ? 16 : 0 }}>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--honey-deep)" }}>{s.time}</span>
                  <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 1 }}>{s.item}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: schedule.length ? 12 : 0 }}>
            {adding === "time" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = e.currentTarget;
                  const g = (n: string) => (f.elements.namedItem(n) as HTMLInputElement).value;
                  if (g("item")) setSchedule((ss) => [...ss, { time: g("time"), item: g("item") }]);
                  setAdding(null);
                }}
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
              >
                <input className="field" name="time" placeholder="Time (e.g. 6:00 PM)" autoFocus style={{ width: 150 }} />
                <input className="field" name="item" placeholder="What happens" style={{ flex: 1, minWidth: 160 }} />
                <button type="submit" className="btn btn-honey" style={{ padding: "8px 16px", fontSize: 13 }}>Add</button>
                <button type="button" className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setAdding(null)}>Cancel</button>
              </form>
            ) : (
              <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setAdding("time")}>+ Add time</button>
            )}
          </div>
        </div>
      </section>

      {/* ── Promote on social ────────────────────────────────── */}
      <section>
        <SectionHead>Promote on social</SectionHead>
        <div className="glass" style={{ borderRadius: 18, padding: 20 }}>
          <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            Connect accounts to post this event automatically. For safety, posts share only a
            <strong> public-safe teaser</strong> — title and a &ldquo;request info&rdquo; link. The
            date, time, and location are never published; interested people reach out and you approve them.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
            {SOCIALS.map((s) => {
              const on = connected.has(s.key);
              return (
                <button
                  key={s.key}
                  onClick={() => toggleSocial(s.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    borderRadius: 12,
                    padding: "12px 14px",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    border: "1.5px solid",
                    borderColor: on ? "var(--honey)" : "var(--line)",
                    background: on ? "rgba(244,190,18,0.14)" : "var(--surface)",
                    color: "var(--ink)",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span style={{ flex: 1, textAlign: "left" }}>{s.label}</span>
                  <span className="mono" style={{ fontSize: 10.5, fontWeight: 700, color: on ? "#2E8B57" : "var(--ink-soft)" }}>
                    {on ? "✓" : "Connect"}
                  </span>
                </button>
              );
            })}
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, cursor: "pointer" }}>
            <input type="checkbox" checked={autoPush} onChange={(e) => setAutoPush(e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--honey-deep)" }} />
            <span style={{ fontSize: 14 }}>Auto-publish future events to connected accounts</span>
          </label>

          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <button
              className="btn btn-honey"
              disabled={connected.size === 0}
              style={{ opacity: connected.size === 0 ? 0.5 : 1, cursor: connected.size === 0 ? "not-allowed" : "pointer" }}
              onClick={() => setPushed(true)}
            >
              Push teaser to {connected.size || "…"} account{connected.size === 1 ? "" : "s"}
            </button>
            {pushed && connected.size > 0 && (
              <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "#2E8B57" }}>
                ✓ Posted to {SOCIALS.filter((s) => connected.has(s.key)).map((s) => s.label).join(", ")}
              </span>
            )}
          </div>
        </div>
      </section>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-honey">Publish updates</button>
        <button className="btn btn-ghost">Message volunteers</button>
      </div>
    </div>
  );
}

/* ── helpers ──────────────────────────────────────────────────── */
function Detail({ icon, label, value, sub }: { icon: string; label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.7 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{value}</div>
      {sub && <div className="mono" style={{ fontSize: 10.5, opacity: 0.7, marginTop: 1 }}>{sub}</div>}
    </div>
  );
}
function Progress({ label, done, total }: { label: string; done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="glass" style={{ borderRadius: 14, padding: 16 }}>
      <div className="eyebrow" style={{ fontSize: 10.5 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
        <span style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>{done}</span>
        <span className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>/ {total}</span>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: "var(--line)", marginTop: 8, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: pct >= 100 ? "#2E8B57" : "var(--honey)" }} />
      </div>
    </div>
  );
}
function SectionHead({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: "1.15rem", marginBottom: 12 }}>{children}</h3>;
}
