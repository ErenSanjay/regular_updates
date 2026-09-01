import React, { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  id: number;
  createdAt: number;
}

export const HeartCursor: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Basic mobile check
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      setIsMobile(true);
      return;
    }

    let particleId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Add new particle occasionally
      if (Math.random() > 0.5) {
        const newParticle = {
          x: e.clientX,
          y: e.clientY,
          id: particleId++,
          createdAt: Date.now(),
        };
        
        setParticles((prev) => [...prev, newParticle].slice(-20)); // Keep max 20 particles
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setParticles((prev) => prev.filter((p) => now - p.createdAt < 1000));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-rose-400 text-xs animate-float-up-fade"
          style={{
            left: p.x,
            top: p.y,
            animationDuration: '1s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes float-up-fade {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-30px) scale(0.5); opacity: 0; }
        }
        .animate-float-up-fade {
          animation-name: float-up-fade;
        }
      `}</style>
    </div>
  );
};
