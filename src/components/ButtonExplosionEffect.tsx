import React, { useState, useRef, useEffect } from 'react';

interface ButtonExplosionEffectProps {
  trigger: boolean;
  type: 'orange' | 'red' | 'purple' | 'gold' | 'cyan';
  children: React.ReactNode;
  cornerExplosion?: boolean;
}

const colorMap = {
  orange: 'var(--color-fire)',
  red: 'var(--color-fire-root)',
  purple: 'var(--color-tier-4)',
  gold: 'var(--color-primary)',
  cyan: 'var(--color-magic)'
};

export default function ButtonExplosionEffect({ trigger, type, children, cornerExplosion = false }: ButtonExplosionEffectProps) {
  const [particles, setParticles] = useState<{ id: number; tx: string; ty: string }[]>([]);
  const [rings, setRings] = useState<{ id: number }[]>([]);
  const [cornerCircles, setCornerCircles] = useState<{ id: number; tx: string; ty: string; size: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);
  const prevTriggerRef = useRef(false);

  useEffect(() => {
    if (trigger && !prevTriggerRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Create particles
      const newParticles = Array.from({ length: 16 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        return {
          id: particleIdRef.current++,
          tx: `${tx}px`,
          ty: `${ty}px`
        };
      });

      // Create rings
      const newRings = Array.from({ length: 3 }, (_, i) => ({
        id: particleIdRef.current++
      }));

      setParticles(newParticles);
      setRings(newRings);

      // Create corner circles if enabled
      if (cornerExplosion) {
        const newCornerCircles = Array.from({ length: 15 }, () => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 100 + Math.random() * 250;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;
          const size = 15 + Math.random() * 25;
          return {
            id: particleIdRef.current++,
            tx: `${tx}px`,
            ty: `${ty}px`,
            size: `${size}px`
          };
        });
        setCornerCircles(newCornerCircles);
      }

      // Clean up after animation
      setTimeout(() => {
        setParticles([]);
        setRings([]);
        setCornerCircles([]);
      }, 800);
    }
    prevTriggerRef.current = trigger;
  }, [trigger, cornerExplosion]);

  const color = colorMap[type];

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      {particles.map(p => (
        <div
          key={p.id}
          className="button-particle"
          style={{
            left: '50%',
            top: '50%',
            '--tx': p.tx,
            '--ty': p.ty,
            '--particle-color': color
          } as any}
        />
      ))}
      {rings.map((r, i) => (
        <div
          key={r.id}
          className="button-ring"
          style={{
            left: '50%',
            top: '50%',
            width: '20px',
            height: '20px',
            marginLeft: '-10px',
            marginTop: '-10px',
            '--ring-color': color,
            animationDelay: `${i * 0.1}s`
          } as any}
        />
      ))}
      {cornerCircles.map(c => (
        <div
          key={c.id}
          className="corner-circle"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            '--tx': c.tx,
            '--ty': c.ty,
            '--size': c.size,
            '--circle-color': color
          } as any}
        />
      ))}
    </div>
  );
}
