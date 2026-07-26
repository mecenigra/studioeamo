"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import EamoLogo from "@/components/EamoLogo";

interface NavProps {
  transparent?: boolean;
}

// Hero üzerindeyken kullanılan açık ton — sitenin kırık beyazı, saf beyaz değil
const LIGHT = "#F7F6F2";

export default function Nav({ transparent = false }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Nav, hero'nun alt kenarını geçtiğinde koyu moda döner.
  // Sabit piksel eşiği yok — hero ne kadar uzunsa o kadar açık kalır.
  const update = useCallback(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setScrolled(window.scrollY > 80);
      return;
    }
    const navHeight = navRef.current?.offsetHeight ?? 92;
    setScrolled(hero.getBoundingClientRect().bottom <= navHeight);
  }, []);

  useEffect(() => {
    if (!transparent) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update(); // ilk yüklemede de doğru durumla başla
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [transparent, update]);

  const isLight = transparent && !scrolled;

  return (
    <nav
      ref={navRef}
      style={{
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
      }}
    >
      <Link href="/" style={{ display: "block", lineHeight: 0 }}>
        <EamoLogo
          height={36}
          style={{
            color: isLight ? LIGHT : "var(--ink)",
            transition: "color 0.3s ease",
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
          <Link
            key={label}
            href={href}
            style={{
              fontFamily: "var(--sans)",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.14em",
              color: isLight
                ? LIGHT
                : pathname === href
                ? "var(--ink)"
                : "var(--ink-light)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
