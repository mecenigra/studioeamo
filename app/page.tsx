import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main>
      {/* Transparent nav üstte */}
      <Nav transparent={true} />

      {/* Hero — tam fotoğraf, kırpılmaz */}
      <section style={{
        position: "relative",
        width: "100%",
      }}>
        <Image
          src="/hero.jpg"
          alt="Studio EAMO — Archeo Series"
          width={4928}
          height={3280}
          priority
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
        {/* Çok hafif üst gradient — nav okunabilirliği için */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }} />
      </section>

      {/* İkinci bölüm — stüdyo tanımı */}
      <section style={{
        padding: "120px 48px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <div>
          <p style={{
            fontFamily: "var(--sans)",
            fontSize: "20px",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "var(--ink)",
            letterSpacing: "0.01em",
          }}>
            Studio EAMO is an independent contemporary design practice based in Istanbul. Working across brand identity, creative direction, objects and image-making, the studio explores the relationship between material, memory and form.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          {[
            { label: "Collectible", href: "/objects" },
            { label: "Objects", href: "/objects" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }, i, arr) => (
            <Link key={label} href={href} style={{
              fontFamily: "var(--sans)",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid var(--rule)",
              borderBottom: i === arr.length - 1 ? "1px solid var(--rule)" : "none",
              padding: "20px 0",
            }}>
              <span>{label}</span>
              <span style={{ marginLeft: "auto", opacity: 0.35 }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Objects preview */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "48px",
          borderTop: "1px solid var(--rule)",
          paddingTop: "28px",
        }}>
          <span style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-light)",
            fontWeight: 300,
          }}>Poetic Collectibles</span>
          <Link href="/objects" style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-light)",
            textDecoration: "none",
            fontWeight: 300,
          }}>View all →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {[
            { bg: "#2C2926", label: "Archeo I", mat: "Stoneware, black" },
            { bg: "#E2DED8", label: "White I", mat: "Stoneware, raw white" },
            { bg: "#3A3530", label: "Archeo II", mat: "Stoneware, black" },
          ].map((item, i) => (
            <div key={i} style={{ position: "relative" }}>
              <div style={{
                background: item.bg,
                aspectRatio: "1/1",
              }} />
              <div style={{ paddingTop: "12px" }}>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--ink)",
                  marginBottom: "4px",
                  letterSpacing: "0.02em",
                }}>{item.label}</p>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "var(--ink-light)",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}>{item.mat}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--rule)",
        padding: "40px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontFamily: "var(--sans)",
          fontSize: "12px",
          fontWeight: 300,
          color: "var(--ink-light)",
          letterSpacing: "0.06em",
        }}>Studio EAMO — Istanbul</span>
        <a href="mailto:hello@studioeamo.com" style={{
          fontFamily: "var(--sans)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--ink-light)",
          textDecoration: "none",
          fontWeight: 300,
        }}>hello@studioeamo.com</a>
        <a href="https://instagram.com/studioeamo" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "var(--sans)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--ink-light)",
          textDecoration: "none",
          fontWeight: 300,
        }}>@studioeamo</a>
      </footer>
    </main>
  );
}
