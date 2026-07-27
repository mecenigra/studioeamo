"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string; width: number; height: number };

// Sıra bilinçli: masa üstünde çekilmiş iki kare arka arkaya gelmiyor.
// Aralarındaki doğa fotoğrafı, hizasız masa çizgilerinin geçişte
// üst üste binmesini engelliyor.
const PHOTOS: Slide[] = [
  { src: "/DSC01784.jpg", alt: "", width: 2400, height: 1600 },
  { src: "/hero.jpg", alt: "Studio EAMO — Archeo Series", width: 4928, height: 3280 },
  { src: "/DSC01781.jpg", alt: "", width: 2400, height: 1600 },
];

const INTERVAL = 5000;      // her fotoğraf 5 saniye
const FADE_FULL = 2500;     // normal geçiş
const FADE_REDUCED = 600;   // "Hareketi Azalt" açıkken kısa geçiş

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Döngü her hâlükârda çalışır; hareket ayarı yalnızca geçiş süresini kısaltır.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % PHOTOS.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  const fade = reduced ? FADE_REDUCED : FADE_FULL;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {PHOTOS.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="100vw"
          priority={i === 0}
          quality={85}
          style={{
            position: i === 0 ? "relative" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            display: "block",
            opacity: i === index ? 1 : 0,
            transition: `opacity ${fade}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
