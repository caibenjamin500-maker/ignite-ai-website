"use client";

export default function FogBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-black" />

      {/* Fog orb 1 — Crimson, top-left */}
      <div
        className="absolute animate-fog-1"
        style={{
          top: "-15%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(ellipse at center, rgba(204, 0, 68, 0.22) 0%, rgba(176, 34, 140, 0.10) 40%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Fog orb 2 — Purple, top-right */}
      <div
        className="absolute animate-fog-2"
        style={{
          top: "-20%",
          right: "-15%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(ellipse at center, rgba(155, 48, 255, 0.18) 0%, rgba(176, 34, 140, 0.08) 45%, transparent 70%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Fog orb 3 — Cyan, bottom-right */}
      <div
        className="absolute animate-fog-3"
        style={{
          bottom: "-10%",
          right: "-5%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(ellipse at center, rgba(0, 191, 255, 0.16) 0%, rgba(0, 206, 209, 0.07) 45%, transparent 70%)",
          filter: "blur(45px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Fog orb 4 — Crimson/Magenta, bottom-left */}
      <div
        className="absolute animate-fog-4"
        style={{
          bottom: "-15%",
          left: "-10%",
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(ellipse at center, rgba(176, 34, 140, 0.14) 0%, rgba(204, 0, 68, 0.06) 50%, transparent 70%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Fog orb 5 — Cyan/Purple center blend */}
      <div
        className="absolute animate-fog-5"
        style={{
          top: "30%",
          left: "30%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at center, rgba(155, 48, 255, 0.10) 0%, rgba(0, 191, 255, 0.06) 50%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />
    </div>
  );
}
