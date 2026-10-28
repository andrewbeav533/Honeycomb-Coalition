import Logo from "@/components/Logo";

export default function DashNav({
  tabs,
  active,
  badge,
}: {
  tabs: string[];
  active: string;
  badge: string;
}) {
  return (
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
          {tabs.map((t) => (
            <span
              key={t}
              className="app-tab"
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 14.5,
                fontWeight: 600,
                color: t === active ? "var(--black)" : "var(--ink-soft)",
                background: t === active ? "var(--honey)" : "transparent",
              }}
            >
              {t}
            </span>
          ))}
        </nav>
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
          {badge}
        </span>
      </div>
    </header>
  );
}
