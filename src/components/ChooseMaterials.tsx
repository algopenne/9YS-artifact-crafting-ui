import React from 'react';
import data from '../data.json';
import type { CraftingContext } from '../types';
import Inventory from './Inventory';
import { dict, DualText, DualInline, parseRecipeName, t } from '../i18n';

const getMaterialIcon = (name: string) => {
  // Specific material icons
  if (name === 'Deep Sea Iron') return '/src/assets/material-deep-sea-iron.png';
  if (name === 'Thunder Bamboo') return '/src/assets/material-thunder-bamboo.png';
  if (name === 'Magma Turtle Shell') return '/src/assets/material-magma-turtle-shell.png';
  if (name === 'Heavenly Starfall Iron') return '/src/assets/material-heavenly-starfall-iron.png';
  if (name === 'Netherflame Crystal') return '/src/assets/material-netherflame-crystal.png';
  if (name === 'Razoredge Obsidian') return '/src/assets/material-razoredge-obsidian.png';
  if (name === 'Demon Heart') return '/src/assets/material-demon-heart.png';
  if (name === 'Spirit Wolf Soul') return '/src/assets/material-spirit-wolf-soul.png';
  
  // Fallback emoji for other materials
  if (name.includes('Demon') || name.includes('Heart')) return '??';
  if (name.includes('Soul') || name.includes('Spirit')) return '??';
  if (name.includes('Iron') || name.includes('Starfall')) return '??';
  if (name.includes('Obsidian') || name.includes('Iron')) return '??';
  if (name.includes('Bamboo')) return '??';
  if (name.includes('Crystal')) return '??';
  if (name.includes('Shell') || name.includes('Turtle')) return '??';
  return '??';
};

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
    <div className="wuxia-screen-enter" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '0.2rem', textAlign: 'center' }}>
        <DualText en={dict.stages.MATERIALS.en} zh={dict.stages.MATERIALS.zh} />
      </h1>
      <div className="text-magic" style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
        <DualText en={dict.ui.confirmIngredients.en} zh={dict.ui.confirmIngredients.zh} />
      </div>

      {/* Unified Centered Constraint Wrapper */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="panel" style={{ width: '100%', marginBottom: '1rem', padding: '1.2rem 1.5rem' }}>
          <h3 className="text-gold" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', textAlign: 'center' }}>
            <DualText {...{en: parseRecipeName(recipe["__EMPTY"] || "").baseEn, zh: parseRecipeName(recipe["__EMPTY"] || "").baseZh}} />
          </h3>

          <div className="material-thumb-container">
            {materials.map((m, idx) => (
              <div key={idx} className="material-thumb">
                <div className="material-thumb-icon">
                  {(() => {
                    const icon = getMaterialIcon(m.name || '');
                    return icon.startsWith('/src/assets/') ? (
                      <img 
                        src={icon} 
                        alt={m.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      icon
                    );
                  })()}
                </div>
                <div className="material-thumb-cost">{m.cost} SS</div>

                {/* Hover Tooltip */}
                <div className="material-tooltip-content">
                  <div className="text-primary" style={{ fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    <DualInline en={(dict.materialTypes as any)[m.type]?.en || m.type} zh={(dict.materialTypes as any)[m.type]?.zh || ''} />
                  </div>
                  <div style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: 'var(--color-gold)' }}>
                    <DualInline en={m.name || ''} zh={t(m.name || '')} />
                  </div>
                  <div className="text-dim" style={{ fontSize: '0.8rem' }}>Root: <DualInline en={(dict.roots as any)[m.root + ' Root']?.en || m.root} zh={(dict.roots as any)[m.root + ' Root']?.zh || ''} /></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', background: 'var(--color-bg-base)', padding: '1rem', borderRadius: '0', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              <span className="text-dim"><DualInline en={dict.ui.calculatedRoot.en} zh={dict.ui.calculatedRoot.zh} />:</span>
              <strong className="text-primary"><DualInline en={(dict.roots as any)[finalRoot]?.en || finalRoot} zh={(dict.roots as any)[finalRoot]?.zh || ''} /></strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
              <span className="text-dim"><DualInline en={dict.ui.totalCost.en} zh={dict.ui.totalCost.zh} />:</span>
              <strong className="text-magic">{totalCost} SS</strong>
            </div>
          </div>
        </div>

        <button className="primary" onClick={onConfirm} style={{ padding: '0.6rem 2.5rem', fontSize: '1rem', marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span className="kbd-badge">F</span>
          <DualInline en={dict.ui.consumeAndConfirm.en} zh={dict.ui.consumeAndConfirm.zh} />
        </button>

        <Inventory highlightedRecipe={recipe} />
      </div>
    </div>
  );
}
