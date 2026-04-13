import React, { useState } from 'react';
import data from '../data.json';
import Inventory from './Inventory';

interface SelectRecipeProps {
  onSelect: (index: number) => void;
}

const icons = ['🌊🗡️', '🌪️🪭', '🔥🛡️', '🌌🗡️'];

export default function SelectRecipe({ onSelect }: SelectRecipeProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const recipes = data.Recipes;
  const hoveredRecipe = hoveredIdx !== null ? recipes[hoveredIdx] : null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>

      {/* Main Content */}
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Select Recipe</h1>
      <p className="text-magic" style={{ fontSize: '1.1rem', marginBottom: '2.5rem', letterSpacing: '0.02em' }}>
        Material Scan complete. You have (4) Recipes available to craft.
      </p>

      {/* Unified Centered Constraint Wrapper */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="item-grid" style={{ width: '100%' }}>
          {recipes.map((recipe: any, idx: number) => {
            const nameMatch = recipe["__EMPTY"]?.match(/^(.*?)\s*\((.*?)\)/);
            const name = nameMatch ? nameMatch[1] : recipe["__EMPTY"];
            const root = nameMatch ? nameMatch[2] : "";

            return (
              <div
                key={idx}
                className={`selectable-card has-tooltip ${hoveredIdx === idx ? 'selected' : ''}`}
                onClick={() => onSelect(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{
                  fontSize: '3.5rem',
                  marginBottom: '1rem',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {icons[idx]}
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{name}</h3>
                <p className="text-magic" style={{ margin: 0, fontSize: '0.9rem' }}>{root}</p>

                <div className="custom-tooltip" style={{ width: '250px' }}>
                  <strong className="text-gold" style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.8rem', textAlign: 'center' }}>Components Needed</strong>
                  <p style={{ margin: '0 0 0.3rem 0' }}><strong>Matrix:</strong> {recipe["Matrix Material Requirement"]}</p>
                  {recipe["Source Material Requirement"] && <p style={{ margin: '0 0 0.3rem 0' }}><strong>Source:</strong> {recipe["Source Material Requirement"]}</p>}
                  {recipe["Demon Core Requirement"] && <p style={{ margin: '0 0 0.3rem 0' }}><strong>Demon:</strong> {recipe["Demon Core Requirement"]}</p>}
                  {recipe["Spirit Essence Requirement"] && <p style={{ margin: '0 0 0.3rem 0' }}><strong>Spirit:</strong> {recipe["Spirit Essence Requirement"]}</p>}
                </div>
              </div>
            );
          })}
        </div>

        <Inventory highlightedRecipe={hoveredRecipe} />
      </div>

    </div>
  );
}
