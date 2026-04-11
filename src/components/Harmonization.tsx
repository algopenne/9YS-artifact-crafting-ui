import React, { useState, useEffect } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';

interface HarmonizationProps {
  context: CraftingContext;
  setContext: (ctx: CraftingContext) => void;
  onConfirm: () => void;
}

export default function Harmonization({ context, setContext, onConfirm }: HarmonizationProps) {
  const [flaw, setFlaw] = useState<{ category: string, title: string } | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    // 1. Pick a random category
    const categories = ['Offensive', 'Defensive', 'Utility / Mobility'];
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // 2. Filter harmonizations 
    const options = data.Harmonization.filter(h => h["Flaw Category"] === selectedCategory);
    
    // 3. Pick a random impurity title from one of the options
    const randomOption = options[Math.floor(Math.random() * options.length)];
    const titles = randomOption["Impurity / Seal Title (The Minigame Trigger)"]?.split(', ') || ['Unknown Flaw'];
    const title = titles[Math.floor(Math.random() * titles.length)];

    setFlaw({ category: selectedCategory, title });

    // 4. Generate 3 unique cards based on stats available in that category
    const shuffledOptions = [...options].sort(() => 0.5 - Math.random());
    const validCards = shuffledOptions.slice(0, 3).map(opt => ({
      stat: opt["Stat Name (English)"],
      buff: Math.floor(Math.random() * 15) + 5 // +5% to +20% buff
    }));

    setCards(validCards);
  }, []);

  const handleSelect = (idx: number) => {
    setSelectedCard(idx);
    setContext({
      ...context,
      chosenFlawCategory: flaw?.category || null,
      chosenHarmonizationCard: cards[idx]
    });
  };

  if (!flaw) return null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Harmonization</h2>
      <p className="text-dim text-magic" style={{ marginBottom: '3rem', textAlign: 'center', maxWidth: '800px' }}>
        A flaw emerges in the matrix during synthesis. Turn this imperfection into an opportunity!
      </p>

      {!selectedCard && selectedCard !== 0 ? (
        <div style={{ width: '100%', maxWidth: '1000px' }}>
          <div className="flaw-container" style={{ marginBottom: '3rem' }}>
            <h3 className="flaw-title">Flaw Detected: {flaw.title}</h3>
            <p style={{ margin: 0 }}>Category: {flaw.category}</p>
          </div>

          <div className="item-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {cards.map((card, idx) => (
              <div key={idx} className="card-draw" onClick={() => handleSelect(idx)}>
                <h4 style={{ color: 'var(--color-magic)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                  {flaw.category === 'Offensive' ? '⚔️' : flaw.category === 'Defensive' ? '🛡️' : '🦅'}
                </h4>
                <h3 style={{ marginBottom: '1rem' }}>Rewrite Matrix</h3>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text)' }}>
                   Increase <br/> <strong className="text-gold">{card.stat}</strong>
                </p>
                <div style={{ fontSize: '2rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                  +{card.buff}%
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div className="card-draw" style={{ width: '300px', margin: '0 auto 2rem auto', transform: 'none', cursor: 'default' }}>
            <h3 style={{ marginBottom: '1rem' }}>Harmonized!</h3>
            <p style={{ fontSize: '1.2rem' }}>
               <strong className="text-gold">{cards[selectedCard].stat}</strong> raised by +{cards[selectedCard].buff}%
            </p>
          </div>
          <button className="primary" onClick={onConfirm} style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            Conclude Harmonization
          </button>
        </div>
      )}
    </div>
  );
}
