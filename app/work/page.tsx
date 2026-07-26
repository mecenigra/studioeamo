import Link from "next/link";

export default function Work() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <section style={{ padding: "80px 48px 160px", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{
          fontFamily: "var(--sans)",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-light)",
          marginBottom: "64px",
        }}>Work</p>

        <p style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(22px, 3vw, 36px)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.4,
          color: "var(--ink)",
          maxWidth: "600px",
          marginBottom: "120px",
        }}>
          Brand identity, creative direction<br />and image-making.
        </p>

        {/* Yakında */}
        <div style={{
          borderTop: "1px solid var(--rule)",
          paddingTop: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "240px",
        }}>
          <p style={{
            fontFamily: "var(--sans)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-light)",
          }}>Coming soon</p>
        </div>
      </section>

      <footer style={{
        borderTop: "1px solid var(--rule)",
        padding: "40px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--serif)",
          fontSize: "13px",
          fontWeight: 300,
          color: "var(--ink-light)",
          textDecoration: "none",
        }}>Studio EAMO — Istanbul</Link>
        <a href="mailto:hello@studioeamo.com" style={{
          fontFamily: "var(--sans)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--ink-light)",
          textDecoration: "none",
        }}>hello@studioeamo.com</a>
        <a href="https://instagram.com/studioeamo" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "var(--sans)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--ink-light)",
          textDecoration: "none",
        }}>@studioeamo</a>
      </footer>
    </main>
  );
}
