import React, { useEffect, useState } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';

interface ShapeMaterialProps {
  context: CraftingContext;
  onFinishFabing: () => void;
  onProceedLingQi: () => void;
}

export default function ShapeMaterial({ context, onFinishFabing, onProceedLingQi }: ShapeMaterialProps) {
  const [stage, setStage] = useState(0);
  const recipe = data.Recipes[context.recipeIndex || 0];

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2000);
    const t2 = setTimeout(() => setStage(2), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Shape Material</h2>
      <p className="text-dim text-magic" style={{ marginBottom: '4rem' }}>
        Watching the pure primordial energy crystallize into its true form...
      </p>

      <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
        {stage === 0 && <div className="animate-pulse" style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-fire)', filter: 'blur(20px)' }}></div>}
        {stage === 1 && <div className="animate-morph" style={{ width: '150px', height: '150px', background: 'var(--color-primary-dim)', border: '2px solid var(--color-primary)' }}></div>}
        {stage === 2 && (
          <div className="animate-pulse-magic" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '6rem' }}>⭐️</div>
            <div className="text-gold" style={{ marginTop: '1rem', fontWeight: 'bold' }}>{recipe["__EMPTY"]}</div>
          </div>
        )}
      </div>

      <div style={{ opacity: stage === 2 ? 1 : 0, transition: 'opacity 1s ease', display: 'flex', gap: '2rem' }}>
        <button className="primary" onClick={onFinishFabing}>
          Complete Crafting (FaBing)
        </button>
        {recipe["Demon Core Requirement"] && (
          <button className="danger" onClick={onProceedLingQi} style={{ border: '1px solid var(--color-magic)', color: 'var(--color-magic)' }}>
            Elevate to Ling Qi (Inject Demon Core)
          </button>
        )}
      </div>
    </div>
  );
}
