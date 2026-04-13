import React, { useState, useEffect } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';
import { dict, DualText, DualInline, parseRecipeName, t } from '../i18n';
import ButtonExplosionEffect from './ButtonExplosionEffect';
import LootboxReveal from './LootboxReveal';

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
  const [restartTrigger, setRestartTrigger] = useState(false);
  const recipe = data.Recipes[context.recipeIndex || 0];

  useEffect(() => {
    // Trigger loot box effect when component mounts
    setTimeout(() => {
      setRestartTrigger(true);
      setTimeout(() => setRestartTrigger(false), 100);
    }, 500);
  }, []);

  const [backgroundTrigger, setBackgroundTrigger] = useState(false);
  const [cornerCircles, setCornerCircles] = useState<{ id: number; tx: string; ty: string; size: string }[]>([]);
  useEffect(() => {
    setTimeout(() => setBackgroundTrigger(true), 100);
  }, []);

  useEffect(() => {
    if (backgroundTrigger) {
      const newCircles = Array.from({ length: 20 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const size = 20 + Math.random() * 30;
        return {
          id: Math.random(),
          tx: `${tx}px`,
          ty: `${ty}px`,
          size: `${size}px`
        };
      });
      setCornerCircles(newCircles);
      setTimeout(() => setCornerCircles([]), 800);
    }
  }, [backgroundTrigger]);

  return (
    <div className="wuxia-screen-enter flex-center" style={{ height: '100%', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      {backgroundTrigger && <div className="background-light-burst"></div>}
      {cornerCircles.map(c => (
        <div
          key={c.id}
          className="corner-circle"
          style={{
            top: '50%',
            left: '50%',
            '--tx': c.tx,
            '--ty': c.ty,
            '--size': c.size,
            '--circle-color': 'var(--color-primary)'
          } as any}
        />
      ))}
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
        padding: '2rem', minWidth: '500px',
        marginTop: '1rem'
      }}>
          <LootboxReveal delay={0}>
            <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem',
                    width: '120px',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
          </LootboxReveal>
          <h3 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '0.3rem', textAlign: 'center' }}>
            <DualText {...{en: parseRecipeName(recipe["__EMPTY"] || "").baseEn, zh: parseRecipeName(recipe["__EMPTY"] || "").baseZh}} />
          </h3>
          <div className="text-dim" style={{ marginBottom: '1rem' }}>
            <DualInline en="Tier" zh="品阶" />: <DualInline en={context.tier} zh={context.tier === 'FaBao' ? '法宝' : context.tier === 'LingQi' ? '灵器' : '法兵'} />
          </div>
          
          <div style={{ margin: '0 0 1rem 0', width: '100%', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
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

        <ButtonExplosionEffect trigger={restartTrigger} type="gold">
          <button className="primary" onClick={() => { setRestartTrigger(true); setTimeout(() => setRestartTrigger(false), 100); onRestart(); }} style={{ fontSize: '1.1rem', padding: '0.6rem 2rem', marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
            <span className="kbd-badge">R</span>
            <DualInline en="Start New Artifact" zh="炼制新法宝" />
          </button>
        </ButtonExplosionEffect>
      </div>
    </div>
  );
}
