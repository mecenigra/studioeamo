"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavProps {
  transparent?: boolean;
}

export default function Nav({ transparent = false }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const isLight = transparent && !scrolled;

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
      background: isLight ? "transparent" : "var(--bg)",
      transition: "background 0.3s ease",
    }}>
      <Link href="/">
        <img
          src="/logo.svg"
          alt="Studio EAMO"
          style={{
            height: "36px",
            width: "auto",
            filter: isLight ? "invert(1) brightness(10)" : "invert(0)",
            transition: "filter 0.3s ease",
          }}
        />
      </Link>

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
            color: isLight ? "rgba(255,255,255,0.9)" : (pathname === href ? "var(--ink)" : "var(--ink-light)"),
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
