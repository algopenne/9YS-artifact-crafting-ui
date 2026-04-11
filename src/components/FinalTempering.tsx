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
                <div style={{ padding: '1rem', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid var(--color-fire-root)', borderRadius: '8px', textAlign: 'center' }}>
                   <div className="text-fire-root" style={{ fontWeight: 'bold', color: 'var(--color-fire-root)' }}>Demon Core Passive: Telekinesis & Levitation</div>
                </div>
             )}
             {context.tier === 'FaBao' && (
                <>
                  <div style={{ padding: '1rem', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid var(--color-fire-root)', borderRadius: '8px', textAlign: 'center' }}>
                     <div className="text-fire-root" style={{ fontWeight: 'bold', color: 'var(--color-fire-root)' }}>Demon Core Passive: Telekinesis & Levitation</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(255, 0, 255, 0.1)', border: '1px solid magenta', borderRadius: '8px', textAlign: 'center' }}>
                     <div style={{ fontWeight: 'bold', color: 'magenta' }}>Awakened Spirit: Sentient Autonomous Companion</div>
                  </div>
                </>
             )}
          </div>
      </div>

      <button className="primary" onClick={onRestart} style={{ fontSize: '1.5rem', padding: '1rem 3rem', marginTop: '2rem' }}>
        Return to Anvil
      </button>
    </div>
  );
}
