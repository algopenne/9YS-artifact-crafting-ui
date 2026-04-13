import React, { useState } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';

interface SpiritEssenceProps {
  context: CraftingContext;
  onConfirm: () => void;
}

export default function SpiritEssence({ context, onConfirm }: SpiritEssenceProps) {
  const [injected, setInjected] = useState(false);
  const recipe = data.Recipes[context.recipeIndex || 0];
  const essenceRequirement = recipe["Spirit Essence Requirement"];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '2.8rem', marginBottom: '0.5rem', color: 'var(--color-tier-4)', letterSpacing: '0.06em' }}>Awaken Spirit Essence</h1>
      <p className="text-magic" style={{ fontSize: '1.1rem', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        Tether a true soul to the artifact. It will gain intelligence, personality, and become a sentient autonomous companion (FaBao).
      </p>

      {!injected ? (
        <div style={{ textAlign: 'center' }}>
          <div className="panel" style={{ width: '400px', marginBottom: '2rem', border: '1px solid var(--color-tier-4)', boxShadow: '0 0 20px hsla(270, 55%, 62%, 0.15)', borderLeft: '3px solid var(--color-tier-4)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐺</div>
            <h3 style={{ color: 'var(--color-tier-4)', marginBottom: '0.4rem' }}>{essenceRequirement}</h3>
            <p className="text-dim" style={{ fontSize: '0.85rem', margin: 0 }}>A captured soul ready to accept a new vessel.</p>
          </div>

          <button onClick={() => setInjected(true)} style={{ 
            padding: '0.8rem 2.5rem', fontSize: '1rem',
            backgroundColor: 'hsla(270, 40%, 15%, 0.8)',
            color: 'var(--color-tier-4)',
            border: '1px solid var(--color-tier-4)',
          }}>
            <span className="kbd-badge">F</span>
            Infuse Spirit Soul
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '6rem', textShadow: '0 0 40px var(--color-tier-4)', marginBottom: '1rem' }}>👁️🗡️👁️</div>
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-tier-4)', letterSpacing: '0.06em' }}>FaBao Awakened!</h3>
          <p className="text-gold" style={{ marginBottom: '3rem' }}>The weapon opens its inner eyes. It recognizes you as its master.</p>

          <button className="primary" onClick={onConfirm} style={{ padding: '0.8rem 2.5rem', fontSize: '1rem' }}>
            <span className="kbd-badge">F</span>
            Proceed to Harmonization
          </button>
        </div>
      )}
    </div>
  );
}
