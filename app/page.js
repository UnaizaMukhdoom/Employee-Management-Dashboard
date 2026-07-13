"use client";

import { useRef, useState } from "react";
import Link from "next/link";


const pageStyles = `
  .animated-gradient {
    background: linear-gradient(135deg, #7e22ce, #1e1b4b, #000000, #1e1b4b, #7e22ce);
    background-size: 300% 300%;
    animation: gradientShift 12s ease infinite;
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-14px); }
  }
  .float-slow { animation: floatY 5s ease-in-out infinite; }
  @keyframes floatIcon {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-16px) translateX(8px); }
  }
  .float-icon { animation: floatIcon 6s ease-in-out infinite; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.9s ease-out both; }
`;


function FloatingIcons() {
  return (
    <>
      <span className="absolute top-16 left-[8%] text-3xl opacity-30 float-icon" style={{ animationDelay: "0s" }}>👥</span>
      <span className="absolute top-1/3 right-[10%] text-3xl opacity-30 float-icon" style={{ animationDelay: "1.5s" }}>📊</span>
      <span className="absolute bottom-1/4 left-[12%] text-3xl opacity-30 float-icon" style={{ animationDelay: "3s" }}>🏢</span>
      <span className="absolute bottom-16 right-[14%] text-3xl opacity-30 float-icon" style={{ animationDelay: "4.5s" }}>🌍</span>
    </>
  );
}


function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs text-purple-200 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
      Real-time employee insights
    </div>
  );
}

// Title, subtitle, and the "Go to Dashboard" button
function HeroText() {
  return (
    <>
      <StatusBadge />

      <h1 className="text-3xl font-medium text-white mb-2 leading-snug">
        Meet your team's <br />
        <span className="italic text-purple-300">Employee Hub</span>
      </h1>

      <p className="text-sm text-purple-200 mb-8 max-w-xs mx-auto leading-relaxed">
        Manage employees smarter.
      </p>

      <Link
        href="/dashboard"
        className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-950 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(196,181,253,0.6)]"
      >
        Go to Dashboard
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </>
  );
}

// the red,gree,yellow circles
function BrowserDots() {
  return (
    <div className="flex gap-1.5 px-3 py-2.5 border-b border-white/10">
      <span className="w-2 h-2 rounded-full bg-red-400" />
      <span className="w-2 h-2 rounded-full bg-yellow-400" />
      <span className="w-2 h-2 rounded-full bg-green-400" />
    </div>
  );
}

// The skeleton block
function MockupContent() {
  const cardNumbers = [1, 2, 3, 4];

  return (
    <div className="p-4 text-left">
      <div className="flex justify-between items-center mb-3">
        <p className="text-white text-xs font-medium">Employee Dashboard</p>
        <div className="w-14 h-4 bg-white/10 rounded" />
      </div>

      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {cardNumbers.map((num) => (
          <div key={num} className="h-6 bg-white/10 rounded" />
        ))}
      </div>

      <div className="h-16 bg-white/10 rounded-md mb-3" />

      <div className="flex flex-col gap-1.5">
        <div className="h-3.5 bg-white/10 rounded w-full" />
        <div className="h-3.5 bg-white/10 rounded w-full" />
        <div className="h-3.5 bg-white/10 rounded w-4/5" />
      </div>
    </div>
  );
}

// The skeleton of dashboard with tilted effect
function DashboardMockup({ tilt }) {
  const mockupStyle = {
    background: "rgba(24, 24, 27, 0.55)",
    backdropFilter: "blur(12px)",
    border: "0.5px solid rgba(255,255,255,0.15)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
    transition: "transform 0.15s ease-out",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto"
  };

  return (
    <div className="relative mt-12" style={{ perspective: "800px" }}>
      <div className="absolute -inset-8 bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="relative float-slow rounded-xl overflow-hidden" style={mockupStyle}>
        <BrowserDots />
        <MockupContent />
      </div>
    </div>
  );
}

function calculateTilt(mouseEvent, containerElement) {
  const box = containerElement.getBoundingClientRect();


  const mouseXFraction = (mouseEvent.clientX - box.left) / box.width;
  const mouseYFraction = (mouseEvent.clientY - box.top) / box.height;

  
  const xOffset = mouseXFraction - 0.5;
  const yOffset = mouseYFraction - 0.5;

  
  return {
    x: xOffset * 10,
    y: yOffset * -10
  };
}

export default function LandingPage() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  function handleMouseMove(mouseEvent) {
    const newTilt = calculateTilt(mouseEvent, containerRef.current);
    setTilt(newTilt);
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20 animated-gradient"
    >
      <style>{pageStyles}</style>

      <FloatingIcons />

      <div className="relative text-center max-w-xl fade-up">
        <HeroText />
        <DashboardMockup tilt={tilt} />
      </div>
    </div>
  );
}