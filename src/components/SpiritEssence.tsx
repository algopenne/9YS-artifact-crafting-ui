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
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'magenta' }}>Awaken Spirit Essence</h1>
      <p className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        Tether a true soul to the artifact. It will gain intelligence, personality, and become a sentient autonomous companion (FaBao).
      </p>

      {!injected ? (
        <div style={{ textAlign: 'center' }}>
          <div className="panel" style={{ width: '400px', marginBottom: '2rem', border: '1px solid magenta', boxShadow: '0 0 20px rgba(255, 0, 255, 0.2)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'magenta' }}>🐺</div>
            <h3 style={{ color: 'magenta' }}>{essenceRequirement}</h3>
            <p className="text-dim" style={{ fontSize: '0.9rem' }}>A captured soul ready to accept a new vessel.</p>
          </div>

          <button onClick={() => setInjected(true)} style={{ padding: '1rem 3rem', fontSize: '1.2rem', backgroundColor: 'magenta', color: 'white', border: 'none', boxShadow: '0 0 20px magenta' }}>
            Infuse Spirit Soul
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div className="animate-orb" style={{ fontSize: '6rem', textShadow: '0 0 40px magenta', marginBottom: '1rem' }}>👁️🗡️👁️</div>
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'magenta' }}>FaBao Awakened!</h3>
          <p className="text-gold" style={{ marginBottom: '3rem' }}>The weapon opens its inner eyes. It recognizes you as its master.</p>

          <button className="primary" onClick={onConfirm} style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            Proceed to Harmonization
          </button>
        </div>
      )}
    </div>
  );
}
