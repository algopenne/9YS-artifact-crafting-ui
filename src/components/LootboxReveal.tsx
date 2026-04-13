import React, { useState, useEffect } from 'react';

interface LootboxRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function LootboxReveal({ children, delay = 0 }: LootboxRevealProps) {
  const [shouldReveal, setShouldReveal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldReveal(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={shouldReveal ? 'lootbox-reveal' : ''} style={{ opacity: shouldReveal ? 1 : 0 }}>
      {children}
    </div>
  );
}
