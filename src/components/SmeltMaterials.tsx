import React, { useState, useEffect } from 'react';
import type { CraftingContext } from "../types";
import { dict, DualText, DualInline } from '../i18n';

interface SmeltMaterialsProps {
  context: CraftingContext;
  setContext: (ctx: CraftingContext) => void;
  onConfirm: () => void;
}

const FIRES = [
  { name: 'Earth Vein Primordial Flame', zh: '地脉真火', stage: 'Qi Refining', stageZh: '炼气期', cost: 100, tier: 1 },
  { name: 'Samadhi True Fire', zh: '三昧真火', stage: 'Foundation Establishment', stageZh: '筑基期', cost: 500, tier: 2 },
  { name: 'Danyang Celestial Flame', zh: '丹阳天火', stage: 'Golden Core', stageZh: '金丹期', cost: 2000, tier: 3 },
  { name: 'True Void Flame', zh: '虚空业火', stage: 'Nascent Soul', stageZh: '元婴期', cost: 10000, tier: 4 },
];

export default function SmeltMaterials({ context, setContext, onConfirm }: SmeltMaterialsProps) {
  // Determine artifact tier based on recipe index
  // 0: Sword (T1), 1: Fan (T2), 2: Aegis (T2), 3: Blade (T3)
  const getArtifactTier = () => {
    if (context.recipeIndex === 3) return 3;
    if (context.recipeIndex === 1 || context.recipeIndex === 2) return 2;
    return 1;
  };

  const artifactTier = getArtifactTier();
  const [selectedFire, setSelectedFire] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isSmelting, setIsSmelting] = useState(false);
  const [invested, setInvested] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSmelting && progress < 100) {
      interval = setInterval(() => {
        // Base rate is 0.5% per tick, investing speeds it up slightly per tick
        const speedBonus = invested / 1000;
        setProgress(p => Math.min(100, p + 0.5 + speedBonus));
      }, 100);
    }
    return () => clearInterval(interval!);
  }, [isSmelting, progress, invested]);

  const handleStart = () => {
    if (selectedFire !== null) setIsSmelting(true);
  };

  const handleInvest = () => {
    if (isSmelting && progress < 100) {
      setInvested(prev => prev + 100);
      setProgress(p => Math.min(100, p + 5)); // Flat jump + speed bonus
      setContext({ ...context, investedStones: context.investedStones + 100 });
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        <DualText en={dict.stages.SMELT.en} zh={dict.stages.SMELT.zh} />
      </h1>
      <div className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '3rem', textAlign: 'center' }}>
        <DualText en="Select a spiritual fire and manage the smelting process." zh="选择灵火并掌控熔炼过程。" />
      </div>

      {!isSmelting ? (
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <div className="item-grid">
            {FIRES.map((fire, idx) => {
              const isTooWeak = fire.tier < artifactTier;
              const isSealed = fire.name === 'True Void Flame';
              const isDisabled = isTooWeak || isSealed;

              const tierColors: Record<number, string> = {
                1: 'var(--color-tier-1)',
                2: 'var(--color-tier-2)',
                3: 'var(--color-tier-3)',
                4: 'var(--color-tier-4)',
              };
              const borderColor = isSealed
                ? 'var(--color-tier-sealed)'
                : isTooWeak
                  ? 'var(--color-tier-sealed)'
                  : tierColors[fire.tier] || 'var(--color-border)';

              return (
                <div 
                  key={idx} 
                  className={`selectable-card ${selectedFire === idx ? 'selected' : ''}`}
                  onClick={() => !isDisabled && setSelectedFire(idx)}
                  style={{
                    opacity: isDisabled ? 0.45 : 1,
                    filter: isDisabled ? 'grayscale(0.7)' : 'none',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    position: 'relative',
                    borderColor: selectedFire === idx ? 'var(--color-primary)' : borderColor,
                    boxShadow: selectedFire === idx
                      ? `0 0 14px var(--color-primary-dim)`
                      : isDisabled ? 'none' : `0 0 8px ${tierColors[fire.tier]}22`
                  }}
                >
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem', 
                    height: '60px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    filter: selectedFire === idx ? `drop-shadow(0 0 10px ${tierColors[fire.tier]})` : '' 
                  }}>
                    {isSealed ? '🔒' : '🔥'}
                  </div>
                  <h3 className={selectedFire === idx ? 'text-gold' : ''} style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>
                    <DualText en={fire.name} zh={fire.zh} />
                  </h3>
                  <div className="text-dim" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <DualInline en={`Stage: ${fire.stage}`} zh={`境界: ${fire.stageZh}`} />
                  </div>
                  
                  {isTooWeak && (
                    <div style={{ color: 'var(--color-fire-root)', fontWeight: '600', fontSize: '0.82rem', margin: '0.4rem 0' }}>
                      <DualText en={`Intrinsic Heat Insufficient for Tier ${artifactTier} Artifact`} zh={`此火威力不足以熔炼${artifactTier}阶法宝`} />
                    </div>
                  )}
                  {isSealed && (
                    <div style={{ color: 'var(--color-text-dim)', fontWeight: '600', fontSize: '0.82rem', margin: '0.4rem 0' }}>
                      <DualText en="Flame Source Sealed / Unknown" zh="火源已封印/未解锁" />
                    </div>
                  )}
                  
                  {!isDisabled && <div className="text-magic" style={{ margin: 0, fontSize: '0.9rem' }}>
                    <DualInline en={`Base Cost: ${fire.cost} SS`} zh={`基础消耗: ${fire.cost} 灵石`} />
                  </div>}
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="primary" onClick={handleStart} disabled={selectedFire === null}>
              <span className="kbd-badge">Space</span>
              <DualInline en="Ignite Furnace" zh="点燃丹炉" />
            </button>
          </div>
        </div>
      ) : (
        <div className="panel" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }} className="layer-fire-flicker">🔥</div>
          <h3 className="text-gold" style={{ marginBottom: '2rem' }}>
            <DualInline en={`${FIRES[selectedFire!].name} Active`} zh={`${FIRES[selectedFire!].zh} 运行中`} />
          </h3>
          
          <div className="smelt-progress-bg">
            <div className="smelt-progress-fill" style={{ width: `${progress}%` }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', textShadow: '0 0 5px black' }}>
              {Math.floor(progress)}%
            </div>
          </div>

          {progress < 100 ? (
            <div>
              <div className="text-dim" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                <DualText en="Smelting is a long arduous process. Burn spirit stones to accelerate it." zh="熔炼需时极长。燃烧灵石可加速进度。" />
              </div>
              <button className="danger" onClick={handleInvest}>
                <span className="kbd-badge">E</span>
                <DualInline en={`Burn 100 Spirit Stones (Invested: ${invested})`} zh={`消耗100灵石 (已投入: ${invested})`} />
              </button>
            </div>
          ) : (
            <div>
              <div className="text-magic" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                <DualText en="Smelting Complete!" zh="熔炼完成！" />
              </div>
              <button className="primary" onClick={onConfirm} style={{ marginTop: '1rem' }}>
                <span className="kbd-badge">F</span>
                <DualInline en="Extract Primordial Energy" zh="提取本源真气" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
