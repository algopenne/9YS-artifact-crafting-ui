import React, { useState } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';

interface DemonCoreProps {
  context: CraftingContext;
  onFinishLingQi: () => void;
  onProceedFaBao: () => void;
}

export default function DemonCore({ context, onFinishLingQi, onProceedFaBao }: DemonCoreProps) {
  const [injected, setInjected] = useState(false);
  const recipe = data.Recipes[context.recipeIndex || 0];
  const coreRequirement = recipe["Demon Core Requirement"];

  const handleInject = () => {
    setInjected(true);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Inject Demon Core</h1>
      <p className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        Elevate your Fabing to a Ling Qi by binding a demon's core to the artifact's matrix, granting it powers of levitation and telekinesis.
      </p>

      {!injected ? (
        <div style={{ textAlign: 'center' }}>
          <div className="panel" style={{ width: '400px', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--color-fire-root)' }}>🩸</div>
            <h3 className="text-gold">{coreRequirement}</h3>
            <p className="text-dim" style={{ fontSize: '0.9rem' }}>Contains the fierce residual will of a profound demon.</p>
          </div>

          <button className="danger" onClick={handleInject} style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderColor: 'var(--color-fire-root)' }}>
            Fuse Demon Core
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '6rem', textShadow: '0 0 40px var(--color-magic)', marginBottom: '1rem' }}>✨🗡️✨</div>
          <h3 className="text-magic" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Ling Qi Forged!</h3>
          <p className="text-gold" style={{ marginBottom: '3rem' }}>The weapon now resonates with telekinetic energy.</p>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <button className="primary" onClick={onFinishLingQi}>
              Complete Crafting (Ling Qi)
            </button>
            {recipe["Spirit Essence Requirement"] && (
              <button className="danger" onClick={onProceedFaBao} style={{ border: '1px solid magenta', color: 'magenta' }}>
                Elevate to FaBao (Inject Spirit Essence)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
