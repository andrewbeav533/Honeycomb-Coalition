/* Honeycomb "flower" — center bee + 6 cells, each popping in on load.
   The single orchestrated motion moment of the site. */

type Cell = {
  label: string;
  icon: string;
  x: number;
  y: number;
  delay: string;
  lit?: boolean;
};

// 6 outer cells on a ring (R=30%) at the pointy-top flower angles, + labels.
const CELLS: Cell[] = [
  { label: "Events", icon: "📅", x: 50, y: 20, delay: "delay-200", lit: true },
  { label: "Photos", icon: "📷", x: 75.98, y: 35, delay: "delay-300" },
  { label: "Classes", icon: "📚", x: 75.98, y: 65, delay: "delay-400", lit: true },
  { label: "RSVP", icon: "✓", x: 50, y: 80, delay: "delay-500" },
  { label: "Materials", icon: "📄", x: 24.02, y: 65, delay: "delay-400" },
  { label: "Chat", icon: "💬", x: 24.02, y: 35, delay: "delay-300" },
];

const CELL = 31; // width in %

export default function HoneycombHero() {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "min(460px, 92vw)",
        aspectRatio: "1 / 1",
        margin: "0 auto",
      }}
    >
      {CELLS.map((c) => (
        <div
          key={c.label}
          className={`hex animate-fade-up ${c.delay}`}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${CELL}%`,
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            background: c.lit
              ? "linear-gradient(160deg, var(--honey-bright), var(--honey-deep))"
              : "rgba(255,253,247,0.66)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 10px 30px rgba(60,40,0,0.1)",
            backdropFilter: "blur(14px) saturate(1.4)",
            WebkitBackdropFilter: "blur(14px) saturate(1.4)",
          }}
        >
          <span style={{ fontSize: "clamp(18px, 4.5vw, 26px)" }}>{c.icon}</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(9px, 2vw, 11.5px)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: c.lit ? "var(--black)" : "var(--ink)",
            }}
          >
            {c.label}
          </span>
        </div>
      ))}

      {/* center bee cell */}
      <div
        className="hex animate-fade-up float-a"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: `${CELL + 2}%`,
          transform: "translate(-50%, -50%)",
          background: "var(--black)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 16px 44px rgba(60,40,0,0.26)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" style={{ width: "64%", filter: "brightness(1.12)" }} />
      </div>
    </div>
  );
}
