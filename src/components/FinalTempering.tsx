import React from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';

interface FinalTemperingProps {
  context: CraftingContext;
  onRestart: () => void;
}

export default function FinalTempering({ context, onRestart }: FinalTemperingProps) {
  const recipe = data.Recipes[context.recipeIndex || 0];

  return (
    <div className="flex-center" style={{ height: '100%', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      <h2 className="text-gold" style={{ fontSize: '3.5rem', textShadow: '0 0 20px var(--color-primary)', margin: 0 }}>
        Masterpiece Crafted!
      </h2>
      <p className="text-magic" style={{ fontSize: '1.2rem', margin: 0 }}>
         You have successfully forged a <strong style={{color: 'var(--color-primary)'}}>{context.tier}</strong>.
      </p>
      
      <div className="panel flex-center" style={{ 
        flexDirection: 'column', 
        background: 'linear-gradient(135deg, var(--color-bg-base), rgba(255,150,0,0.1))',
        boxShadow: '0 0 50px var(--color-primary-dim)', 
        border: '2px solid var(--color-primary)',
        padding: '3rem', minWidth: '500px',
        marginTop: '2rem'
      }}>
          <div style={{ fontSize: '6rem', margin: '1rem 0', filter: 'drop-shadow(0 0 20px var(--color-primary))' }}>
             {context.tier === 'FaBao' ? '👁️🗡️👁️' : context.tier === 'LingQi' ? '✨🗡️✨' : '🗡️'}
          </div>
          <h3 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{recipe["__EMPTY"]}</h3>
          <p className="text-dim" style={{ marginBottom: '2rem' }}>Tier: {context.tier}</p>
          
          <div style={{ margin: '0 0 2rem 0', width: '100%', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <span className="text-dim">Spirit Stones Burned</span> 
                <strong className="text-magic">{context.investedStones} SS</strong>
              </div>
              {context.chosenHarmonizationCard && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  <span className="text-dim">Harmonization Trait</span> 
                  <strong className="text-primary">{context.chosenHarmonizationCard.stat} +{context.chosenHarmonizationCard.buff}%</strong>
                </div>
              )}
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
             {context.tier === 'LingQi' && (
                <div style={{ padding: '0.8rem 1rem', background: 'hsla(5, 50%, 12%, 0.5)', border: '1px solid var(--color-fire-root)', borderLeft: '3px solid var(--color-fire-root)', borderRadius: '0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                   <span style={{ fontSize: '1.2rem' }}>🩸</span>
                   <div className="text-fire-root" style={{ fontWeight: 600, color: 'var(--color-fire-root)', fontSize: '0.9rem' }}>Demon Core Passive: Telekinesis & Levitation</div>
                </div>
             )}
             {context.tier === 'FaBao' && (
                <>
                  <div style={{ padding: '0.8rem 1rem', background: 'hsla(5, 50%, 12%, 0.5)', border: '1px solid var(--color-fire-root)', borderLeft: '3px solid var(--color-fire-root)', borderRadius: '0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                     <span style={{ fontSize: '1.2rem' }}>🩸</span>
                     <div style={{ fontWeight: 600, color: 'var(--color-fire-root)', fontSize: '0.9rem' }}>Demon Core Passive: Telekinesis & Levitation</div>
                  </div>
                  <div style={{ padding: '0.8rem 1rem', background: 'hsla(270, 40%, 12%, 0.5)', border: '1px solid var(--color-tier-4)', borderLeft: '3px solid var(--color-tier-4)', borderRadius: '0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                     <span style={{ fontSize: '1.2rem' }}>👁️</span>
                     <div style={{ fontWeight: 600, color: 'var(--color-tier-4)', fontSize: '0.9rem' }}>Awakened Spirit: Sentient Autonomous Companion</div>
                  </div>
                </>
             )}
          </div>
      </div>

      <button className="primary" onClick={onRestart} style={{ fontSize: '1.2rem', padding: '0.9rem 3rem', marginTop: '2rem' }}>
        <span className="kbd-badge">R</span>
        Return to Anvil
      </button>
    </div>
  );
}
