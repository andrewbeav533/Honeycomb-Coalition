import { type Activity } from "@/app/activities";

export default function ActivityCard({
  a,
  onJoin,
  publicView,
}: {
  a: Activity;
  onJoin?: (a: Activity) => void;
  publicView?: boolean;
}) {
  return (
    <div className="glass lift" style={{ borderRadius: 20, padding: 24, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          className="hex"
          style={{
            width: 46,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(160deg, var(--honey-bright), var(--honey))",
            fontSize: 22,
          }}
        >
          {a.emoji}
        </span>
        <div>
          <h3 style={{ fontSize: "1.2rem" }}>{a.title}</h3>
          <p className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 3 }}>
            {a.host}
          </p>
        </div>
      </div>

      <p style={{ color: "var(--ink-soft)", marginTop: 14, fontSize: 14.5, lineHeight: 1.6, flex: 1 }}>
        {a.blurb}
      </p>

      {publicView ? (
        <div style={{ marginTop: 16 }}>
          <Tag>🔒 Date & location shared after you&apos;re approved</Tag>
        </div>
      ) : (
        <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Tag>📅 {a.when}</Tag>
          <Tag>📍 {a.location}</Tag>
        </div>
      )}

      <div
        style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>
          {publicView ? "Open to the public" : `${a.filled}/${a.spots} joined`}
        </span>
        <button className="btn btn-honey" style={{ padding: "9px 18px", fontSize: 14 }} onClick={() => onJoin?.(a)}>
          {publicView ? "Request info →" : a.type === "club" ? (a.open ? "Join" : "Request to join") : "RSVP"}
        </button>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "rgba(26,21,16,0.05)",
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: "5px 12px",
        fontSize: 12.5,
        color: "var(--ink-soft)",
      }}
    >
      {children}
    </span>
  );
}
