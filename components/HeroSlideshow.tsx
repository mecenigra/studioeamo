"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string; width: number; height: number };

// hero.jpg zaten /public içinde — ilk kare olarak kalıyor.
// Diğer ikisini optimize edilmiş hâlleriyle /public içine ekle.
const PHOTOS: Slide[] = [
  { src: "/hero.jpg", alt: "Studio EAMO — Archeo Series", width: 4928, height: 3280 },
  { src: "/DSC01784.jpg", alt: "", width: 2400, height: 1600 },
  { src: "/DSC01781.jpg", alt: "", width: 2400, height: 1600 },
];

const INTERVAL = 5000; // her fotoğraf 5 saniye
const FADE = 2500;     // geçiş süresi (ms)

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOk(!query.matches);
    const onChange = (e: MediaQueryListEvent) => setMotionOk(!e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!motionOk) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % PHOTOS.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [motionOk]);

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
            // ilk fotoğraf akışta kalıp yüksekliği belirler,
            // diğerleri üstüne bindirilir — hiçbiri kırpılmaz
            position: i === 0 ? "relative" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            display: "block",
            opacity: i === index ? 1 : 0,
            transition: `opacity ${FADE}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
