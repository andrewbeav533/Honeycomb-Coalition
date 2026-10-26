import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--black)",
        color: "#f4efe3",
        padding: "56px 24px 40px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <div style={{ filter: "invert(1) brightness(1.6)", width: "fit-content" }}>
              <Logo size={30} href={null} />
            </div>
            <p style={{ marginTop: 14, color: "#b8ad98", fontSize: 14.5, lineHeight: 1.6 }}>
              One hive for your whole homeschool community — events, classes, and photos in a safe,
              invite-only space.
            </p>
          </div>
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            <FooterCol
              title="Product"
              links={["How it works", "Perks", "Safety", "For co-ops"]}
            />
            <FooterCol title="Community" links={["For families", "For students", "For volunteers"]} />
          </div>
        </div>
        <div
          style={{
            marginTop: 44,
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "space-between",
            color: "#8c8270",
            fontSize: 13,
          }}
        >
          <span className="mono">A Honeycomb Coalition project for PASE</span>
          <span>Concept demo · Peoria, Illinois</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span className="eyebrow" style={{ color: "var(--honey)" }}>{title}</span>
      {links.map((l) => (
        <span key={l} style={{ color: "#c5bca9", fontSize: 14.5 }}>{l}</span>
      ))}
    </div>
  );
}
