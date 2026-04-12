import React from 'react';
import data from '../data.json';
import type { CraftingContext } from '../types';
import Inventory from './Inventory';

interface ChooseMaterialsProps {
  context: CraftingContext;
  onConfirm: () => void;
}

export default function ChooseMaterials({ context, onConfirm }: ChooseMaterialsProps) {
  const recipe = data.Recipes[context.recipeIndex || 0];

  const materials = [
    { type: 'Matrix Material', name: recipe["Matrix Material Requirement"], cost: 250, root: 'Physical' },
    { type: 'Source Material', name: recipe["Source Material Requirement"], cost: 500, root: 'Spiritual' },
    { type: 'Demon Core', name: recipe["Demon Core Requirement"], cost: 1200, root: 'Demonic' },
    { type: 'Spirit Essence', name: recipe["Spirit Essence Requirement"], cost: 3000, root: 'Divine' },
  ].filter(m => m.name);

  // Extract root alignment from the recipe name e.g. (Water Root)
  const rootMatch = recipe["__EMPTY"]?.match(/\((.*?)\)/);
  const finalRoot = rootMatch ? rootMatch[1] : 'Neutral Root';
  const totalCost = materials.reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Gather Materials</h1>
      <p className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>Confirm the required ingredients to begin.</p>
      
      {/* Unified Centered Constraint Wrapper */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="panel" style={{ width: '100%', marginBottom: '2rem' }}>
          <h3 className="text-gold" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', textAlign: 'center' }}>
            {recipe["__EMPTY"]}
          </h3>

          <div className="material-thumb-container">
            {materials.map((m, idx) => (
              <div key={idx} className="material-thumb">
                <div className="material-thumb-icon">
                  {idx === 0 ? '💎' : idx === 1 ? '🌿' : idx === 2 ? '🌀' : '🔮'}
                </div>
                <div className="material-thumb-cost">{m.cost} SS</div>
                
                {/* Hover Tooltip */}
                <div className="material-tooltip-content">
                  <div className="text-primary" style={{ fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{m.type}</div>
                  <div style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: 'var(--color-gold)' }}>{m.name}</div>
                  <div className="text-dim" style={{ fontSize: '0.8rem' }}>Root: {m.root}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '1.5rem', background: 'var(--color-bg-base)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              <span className="text-dim">Calculated Elemental Root:</span>
              <strong className="text-primary">{finalRoot}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
              <span className="text-dim">Total Spirit Stone Cost:</span>
              <strong className="text-magic">{totalCost} SS</strong>
            </div>
          </div>
        </div>

        <button className="primary" onClick={onConfirm} style={{ padding: '1rem 3rem', fontSize: '1.2rem', marginBottom: '2rem' }}>
          Consume Materials & Confirm
        </button>

        <Inventory highlightedRecipe={recipe} />
      </div>
    </div>
  );
}
