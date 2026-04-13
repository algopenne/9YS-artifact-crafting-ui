import React from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';
import { dict, DualText, DualInline, parseRecipeName, t } from '../i18n';

const getRecipeIcon = (recipeName: string) => {
  if (recipeName === 'Tide-Severing Sword') return '/src/assets/recipe-tide-severing-sword.png';
  if (recipeName === 'Crimson Storm Feather-Fan') return '/src/assets/recipe-crimson-storm-feather-fan.png';
  if (recipeName === 'Scorched Shell Aegis') return '/src/assets/recipe-scorched-shell-aegis.png';
  if (recipeName === 'Void Star Blade') return '/src/assets/recipe-void-star-blade.png';
  
  // Fallback emojis for any unknown recipes
  if (recipeName.includes('Sword')) return '??';
  if (recipeName.includes('Fan')) return '??';
  if (recipeName.includes('Aegis') || recipeName.includes('Shield')) return '??';
  if (recipeName.includes('Blade')) return '??';
  return '??';
};

interface FinalTemperingProps {
  context: CraftingContext;
  onRestart: () => void;
}

export default function FinalTempering({ context, onRestart }: FinalTemperingProps) {
  const recipe = data.Recipes[context.recipeIndex || 0];

  return (
    <div className="flex-center" style={{ height: '100%', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      <h2 className="text-gold" style={{ fontSize: '2rem', textShadow: '0 0 20px var(--color-primary)', margin: 0, textAlign: 'center' }}>
        <DualText en="Masterpiece Crafted!" zh="绝世法宝，铸造成功！" />
      </h2>
      <div className="text-magic" style={{ fontSize: '1.2rem', margin: 0, textAlign: 'center' }}>
         <DualInline en="You have successfully forged a" zh="你成功铸造了" /> <strong style={{color: 'var(--color-primary)'}}>
           <DualInline en={context.tier} zh={context.tier === 'FaBao' ? '法宝' : context.tier === 'LingQi' ? '灵器' : '法兵'} />
         </strong>.
      </div>
      
      <div className="panel flex-center" style={{ 
        flexDirection: 'column', 
        background: 'linear-gradient(135deg, var(--color-bg-base), rgba(255,150,0,0.1))',
        boxShadow: '0 0 50px var(--color-primary-dim)', 
        border: '2px solid var(--color-primary)',
        padding: '3rem', minWidth: '500px',
        marginTop: '2rem'
      }}>
          <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.1rem',
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '1rem 0',
                  filter: 'drop-shadow(0 0 20px var(--color-primary))'
                }}>
             {(() => {
               const recipeName = parseRecipeName(recipe["__EMPTY"] || "").baseEn;
               const icon = getRecipeIcon(recipeName);
               return icon.startsWith('/src/assets/') ? (
                 <img 
                   src={icon} 
                   alt={recipeName} 
                   style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                 />
               ) : (
                 icon
               );
             })()}
          </div>
          <h3 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
            <DualText {...{en: parseRecipeName(recipe["__EMPTY"] || "").baseEn, zh: parseRecipeName(recipe["__EMPTY"] || "").baseZh}} />
          </h3>
          <div className="text-dim" style={{ marginBottom: '2rem' }}>
            <DualInline en="Tier" zh="品阶" />: <DualInline en={context.tier} zh={context.tier === 'FaBao' ? '法宝' : context.tier === 'LingQi' ? '灵器' : '法兵'} />
          </div>
          
          <div style={{ margin: '0 0 2rem 0', width: '100%', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <span className="text-dim"><DualInline en="Spirit Stones Burned" zh="灵石真火消耗" /></span> 
                <strong className="text-magic">{context.investedStones} SS</strong>
              </div>
              {context.chosenHarmonizationCard && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  <span className="text-dim"><DualInline en="Harmonization Trait" zh="修复特性" /></span> 
                  <strong className="text-primary"><DualInline en={context.chosenHarmonizationCard.stat} zh={t(context.chosenHarmonizationCard.stat)} /> +{context.chosenHarmonizationCard.buff}%</strong>
                </div>
              )}
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
             {context.tier === 'LingQi' && (
                <div style={{ padding: '0.8rem 1rem', background: 'hsla(5, 50%, 12%, 0.5)', border: '1px solid var(--color-fire-root)', borderLeft: '3px solid var(--color-fire-root)', borderRadius: '0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                   <span style={{ fontSize: '1.2rem' }}>🩸</span>
                   <div className="text-fire-root" style={{ fontWeight: 600, color: 'var(--color-fire-root)', fontSize: '0.9rem' }}>
                     <DualInline en="Demon Core Passive: Telekinesis & Levitation" zh="妖丹被动: 意念与御物之力" />
                   </div>
                </div>
             )}
             {context.tier === 'FaBao' && (
                <>
                  <div style={{ padding: '0.8rem 1rem', background: 'hsla(5, 50%, 12%, 0.5)', border: '1px solid var(--color-fire-root)', borderLeft: '3px solid var(--color-fire-root)', borderRadius: '0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                     <span style={{ fontSize: '1.2rem' }}>🩸</span>
                     <div style={{ fontWeight: 600, color: 'var(--color-fire-root)', fontSize: '0.9rem' }}>
                       <DualInline en="Demon Core Passive: Telekinesis & Levitation" zh="妖丹被动: 意念与御物之力" />
                     </div>
                  </div>
                  <div style={{ padding: '0.8rem 1rem', background: 'hsla(270, 40%, 12%, 0.5)', border: '1px solid var(--color-tier-4)', borderLeft: '3px solid var(--color-tier-4)', borderRadius: '0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                     <span style={{ fontSize: '1.2rem' }}>👁️</span>
                     <div style={{ fontWeight: 600, color: 'var(--color-tier-4)', fontSize: '0.9rem' }}>
                       <DualInline en="Awakened Spirit: Sentient Autonomous Companion" zh="器灵觉醒: 拥有自主意识的道侣级别法宝" />
                     </div>
                  </div>
                </>
             )}
          </div>
      </div>

      <button className="primary" onClick={onRestart} style={{ fontSize: '1.1rem', padding: '0.8rem 3rem', marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
        <span className="kbd-badge">R</span>
        <DualInline en="Start New Artifact" zh="炼制新法宝" />
      </button>
    </div>
  );
}
