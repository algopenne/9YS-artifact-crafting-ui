import React, { useState } from 'react';
import data from '../data.json';
import Inventory from './Inventory';
import { dict, DualText, DualInline, parseRecipeName, t } from '../i18n';

interface SelectRecipeProps {
  onSelect: (index: number) => void;
}

const getRecipeIcon = (recipeName: string) => {
  if (recipeName === 'Tide-Severing Sword') return '/src/assets/recipe-tide-severing-sword.png';
  if (recipeName === 'Crimson Storm Feather-Fan') return '/src/assets/recipe-crimson-storm-feather-fan.png';
  if (recipeName === 'Scorched Shell Aegis') return '/src/assets/recipe-scorched-shell-aegis.png';
  if (recipeName === 'Void Star Blade') return '/src/assets/recipe-void-star-blade.png';
  
  // Fallback emojis for any unknown recipes
  if (recipeName.includes('Sword')) return '🗡️';
  if (recipeName.includes('Fan')) return '🪭';
  if (recipeName.includes('Aegis') || recipeName.includes('Shield')) return '️';
  if (recipeName.includes('Blade')) return '🗡️';
  return '🌊';

};

export default function SelectRecipe({ onSelect }: SelectRecipeProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const recipes = data.Recipes;
  const hoveredRecipe = hoveredIdx !== null ? recipes[hoveredIdx] : null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>

      {/* Main Content */}
      {/* Main Content */}
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        <DualText en={dict.stages.RECIPE.en} zh={dict.stages.RECIPE.zh} />
      </h1>
      <div className="text-magic" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', letterSpacing: '0.02em', textAlign: 'center' }}>
        <DualText en={dict.ui.materialScanComplete.en} zh={dict.ui.materialScanComplete.zh} />
      </div>

      {/* Unified Centered Constraint Wrapper */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="item-grid" style={{ width: '100%' }}>
          {recipes.map((recipe: any, idx: number) => {
            const { baseEn, baseZh, rootEn, rootZh } = parseRecipeName(recipe["__EMPTY"] || "");

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
                  fontSize: '3rem',
                  marginBottom: '0.1rem',
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {(() => {
                  const icon = getRecipeIcon(baseEn);
                  return icon.startsWith('/src/assets/') ? (
                    <img 
                      src={icon} 
                      alt={baseEn} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    icon
                  );
                })()}
                </div>
                <h3 style={{ margin: '0 0 0.3rem 0', textAlign: 'center' }}>
                  <DualText en={baseEn} zh={baseZh} />
                </h3>
                <div className="text-magic" style={{ margin: 0, fontSize: '0.9rem', textAlign: 'center' }}>
                  <DualInline en={rootEn} zh={rootZh} />
                </div>

                <div className="custom-tooltip" style={{ width: '280px' }}>
                  <div className="text-gold" style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.6rem', textAlign: 'center', fontWeight: 'bold' }}>
                    <DualText en={dict.ui.componentsNeeded.en} zh={dict.ui.componentsNeeded.zh} />
                  </div>
                  <p style={{ margin: '0 0 0.2rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>Matrix:</strong> <span style={{textAlign: 'right'}}><DualInline en={recipe["Matrix Material Requirement"]} zh={t(recipe["Matrix Material Requirement"])} /></span></p>
                  {recipe["Source Material Requirement"] && <p style={{ margin: '0 0 0.2rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>Source:</strong> <span style={{textAlign: 'right'}}><DualInline en={recipe["Source Material Requirement"]} zh={t(recipe["Source Material Requirement"])} /></span></p>}
                  {recipe["Demon Core Requirement"] && <p style={{ margin: '0 0 0.2rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>Demon Core:</strong> <span style={{textAlign: 'right'}}><DualInline en={recipe["Demon Core Requirement"]} zh={t(recipe["Demon Core Requirement"])} /></span></p>}
                  {recipe["Spirit Essence Requirement"] && <p style={{ margin: '0 0 0.2rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>Spirit Essence:</strong> <span style={{textAlign: 'right'}}><DualInline en={recipe["Spirit Essence Requirement"]} zh={t(recipe["Spirit Essence Requirement"])} /></span></p>}
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
