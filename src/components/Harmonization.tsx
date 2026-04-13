import React, { useState, useEffect, useCallback } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';

interface HarmonizationProps {
  context: CraftingContext;
  setContext: (ctx: CraftingContext) => void;
  onConfirm: () => void;
}

interface FlawInstance {
  category: string;
  title: string;
  pickIdx: number;
  options: any[];
}

export default function Harmonization({ context, setContext, onConfirm }: HarmonizationProps) {
  const [flaws, setFlaws] = useState<FlawInstance[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [cards, setCards] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Helper to generate 3 cards for a given flaw instance
  const generateCardsForFlaw = useCallback((flawInst: FlawInstance) => {
    const shuffledOptions = [...flawInst.options].sort(() => 0.5 - Math.random());
    const validCards = shuffledOptions.slice(0, 3).map(opt => {
      const cardResolutions = opt["Resolution / Solution Title"]?.split(', ') || ['Harmonization Applied'];
      return {
        stat: opt["Stat Name (English)"],
        buff: Math.floor(Math.random() * 15) + 5,
        resolution: cardResolutions[flawInst.pickIdx] || cardResolutions[0]
      };
    });
    setCards(validCards);
  }, []);

  useEffect(() => {
    // 1. Generate 3 unique flaws
    const categories = ['Offensive', 'Defensive', 'Utility / Mobility'];
    const chosen: FlawInstance[] = [];
    
    // Attempt categories sequentially for diversity
    for (let i = 0; i < 3; i++) {
      const cat = categories[i % categories.length];
      const options = data.Harmonization.filter(h => h["Flaw Category"] === cat);
      const randomOption = options[Math.floor(Math.random() * options.length)];
      
      const titles = randomOption["Impurity / Seal Title (The Minigame Trigger)"]?.split(', ') || ['Unknown Flaw'];
      const pickIdx = Math.floor(Math.random() * titles.length);
      const title = titles[pickIdx];

      chosen.push({
        category: cat,
        title,
        pickIdx,
        options
      });
    }
    
    setFlaws(chosen);
    generateCardsForFlaw(chosen[0]);
  }, [generateCardsForFlaw]);

  const handleSelect = (idx: number) => {
    const chosenCard = cards[idx];
    const newStats = { ...context.stats };
    const statName = chosenCard.stat;
    const newHarmonizedStats = [...context.harmonizedStats, statName];
    
    // Apply the buff
    newStats[statName] = (newStats[statName] || 100) + chosenCard.buff;

    const newResults = [...results, {
      flawTitle: flaws[activeIdx].title,
      resolution: chosenCard.resolution,
      stat: chosenCard.stat,
      buff: chosenCard.buff
    }];
    setResults(newResults);

    setContext({
      ...context,
      stats: newStats,
      lastUpdatedStat: statName,
      lastUpdateTimestamp: Date.now(),
      harmonizedStats: newHarmonizedStats
    });

    if (activeIdx < 2) {
      const nextIdx = activeIdx + 1;
      setActiveIdx(nextIdx);
      generateCardsForFlaw(flaws[nextIdx]);
    } else {
      setIsFinished(true);
    }
  };

  if (flaws.length === 0) return null;

  const currentFlaw = flaws[activeIdx];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '2.8rem', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>Harmonization</h1>
      
      {!isFinished ? (
        <div style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            {[0, 1, 2].map(i => (
            <div key={i} style={{ 
              width: '10px', height: '10px', borderRadius: '50%',
              background: i === activeIdx ? 'var(--color-primary)' : i < activeIdx ? 'var(--color-magic)' : 'rgba(255,255,255,0.12)',
              boxShadow: i === activeIdx ? '0 0 8px var(--color-primary)' : i < activeIdx ? '0 0 6px var(--color-magic)' : 'none'
            }}></div>
          ))}
          </div>
          
          <p className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Purification Step {activeIdx + 1} of 3
          </p>

          <div className="flaw-container" style={{ marginBottom: '3rem', border: '1px solid rgba(255,0,0,0.3)', background: 'rgba(255,0,0,0.05)' }}>
            <p className="text-dim" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{currentFlaw.category} Anomalous Pattern</p>
            <h3 className="flaw-title" style={{ margin: 0 }}>Detected: {currentFlaw.title}</h3>
          </div>

          <div className="item-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {cards.map((card, idx) => (
              <div key={idx} className="card-draw" onClick={() => handleSelect(idx)}>
                <h4 style={{ color: 'var(--color-magic)', fontSize: '1.4rem', marginBottom: '0.8rem', lineHeight: 1 }}>
                   {currentFlaw.category === 'Offensive' ? '⚔️' : currentFlaw.category === 'Defensive' ? '🛡️' : '🦅'}
                </h4>
                <h3 style={{ marginBottom: '0.8rem', color: 'var(--color-primary)', fontSize: '1rem', letterSpacing: '0.03em', lineHeight: 1.3 }}>{card.resolution}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', marginBottom: '0.4rem' }}>
                   Increases
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginBottom: '0.6rem', fontWeight: 600 }}>
                   {card.stat}
                </p>
                <div style={{ fontSize: '1.6rem', color: 'var(--color-gold)', fontWeight: 'bold', letterSpacing: '0.02em' }}>
                  +{card.buff}%
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
          <h2 className="text-gold" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Purification Complete</h2>
          <p className="text-magic" style={{ marginBottom: '3rem' }}>The artifact matrix has reached a state of perfect resonance.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {results.map((res, i) => (
              <div key={i} className="panel" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1.2rem 1.4rem',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-subpanel)',
                borderLeft: '3px solid var(--color-magic)'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <p className="text-dim" style={{ fontSize: '0.75rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Flaw Purified: {res.flawTitle}</p>
                  <h4 className="text-primary" style={{ margin: '0.25rem 0', fontSize: '1rem' }}>{res.resolution}</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>{res.stat}</p>
                  <p style={{ margin: 0, color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '1.2rem' }}>+{res.buff}%</p>
                </div>
              </div>
            ))}
          </div>

          <button className="primary" onClick={onConfirm} style={{ padding: '0.9rem 4rem', fontSize: '1.1rem' }}>
            <span className="kbd-badge">F</span>
            Conclude Harmonization
          </button>
        </div>
      )}
    </div>
  );
}
