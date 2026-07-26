"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  transparent?: boolean;
}

export default function Nav({ transparent = false }: NavProps) {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "28px 48px",
      background: transparent ? "transparent" : "var(--bg)",
    }}>
      {/* Sol — Logo */}
      <Link href="/">
        <img
          src="/logo.svg"
          alt="Studio EAMO"
          style={{
            height: "36px",
            width: "auto",
            filter: transparent ? "invert(1) brightness(10)" : "invert(0)",
          }}
        />
      </Link>

      {/* Sağ — Nav linkleri */}
      <div style={{ display: "flex", gap: "40px" }}>
        {[
          { label: "COLLECTIBLE", href: "/objects" },
          { label: "OBJECTS", href: "/objects" },
          { label: "ABOUT", href: "/about" },
          { label: "CONTACT", href: "/contact" },
        ].map(({ label, href }) => (
          <Link key={label} href={href} style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.14em",
            color: transparent ? "rgba(255,255,255,0.9)" : (pathname === href ? "var(--ink)" : "var(--ink-light)"),
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
