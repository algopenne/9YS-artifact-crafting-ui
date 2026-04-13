import React, { useState, useEffect, useCallback } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';
import { dict, DualText, DualInline, t, parseRecipeName } from '../i18n';

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

interface HarmonizationProps {
  context: CraftingContext;
  setContext: (ctx: CraftingContext) => void;
  onConfirm: () => void;
}

interface FlawInstance {
  category: string;
  title: string;
  pickIdx: number;
  options: any[];
}

interface NodeResult {
  flawTitle: string;
  resolution: string;
  stat: string;
  buff: number;
}

type Phase = 'hub' | 'minigame' | 'summary';

const NODE_CATEGORIES = ['Offensive', 'Defensive', 'Utility / Mobility'] as const;
const NODE_ICONS = ['⚔️', '🛡️', '🦅'];
const NODE_LABELS_ZH = ['进攻', '防御', '妙用'];
const NODE_COLORS = ['var(--color-fire-root)', 'var(--color-primary)', 'var(--color-magic)'];

export default function Harmonization({ context, setContext, onConfirm }: HarmonizationProps) {
  const [flaws, setFlaws] = useState<FlawInstance[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [results, setResults] = useState<(NodeResult | null)[]>([null, null, null]);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('hub');

  const generateCardsForFlaw = useCallback((flawInst: FlawInstance) => {
    const shuffled = [...flawInst.options].sort(() => 0.5 - Math.random());
    const valid = shuffled.slice(0, 3).map(opt => {
      const resolutions = opt["Resolution / Solution Title"]?.split(', ') || ['Harmonization Applied'];
      return {
        stat: opt["Stat Name (English)"],
        buff: Math.floor(Math.random() * 15) + 5,
        resolution: resolutions[flawInst.pickIdx] || resolutions[0]
      };
    });
    setCards(valid);
  }, []);

  useEffect(() => {
    const chosen: FlawInstance[] = NODE_CATEGORIES.map(cat => {
      const options = data.Harmonization.filter(h => h["Flaw Category"] === cat);
      const random = options[Math.floor(Math.random() * options.length)];
      const titles = random["Impurity / Seal Title (The Minigame Trigger)"]?.split(', ') || ['Unknown Flaw'];
      const pickIdx = Math.floor(Math.random() * titles.length);
      return { category: cat, title: titles[pickIdx], pickIdx, options };
    });
    setFlaws(chosen);
  }, []);

  const handleNodeClick = (nodeIdx: number) => {
    if (results[nodeIdx] !== null) return; // already done
    if (flaws.length === 0) return;
    generateCardsForFlaw(flaws[nodeIdx]);
    setActiveNode(nodeIdx);
    setPhase('minigame');
  };

  const handleCardSelect = (cardIdx: number) => {
    if (activeNode === null) return;
    const card = cards[cardIdx];
    const statName = card.stat;

    const newStats = { ...context.stats };
    newStats[statName] = (newStats[statName] || 100) + card.buff;
    const newHarmonizedStats = [...(context.harmonizedStats || []), statName];

    setContext({
      ...context,
      stats: newStats,
      lastUpdatedStat: statName,
      lastUpdateTimestamp: Date.now(),
      harmonizedStats: newHarmonizedStats
    });

    const newResults = [...results] as (NodeResult | null)[];
    newResults[activeNode] = {
      flawTitle: flaws[activeNode].title,
      resolution: card.resolution,
      stat: statName,
      buff: card.buff
    };
    setResults(newResults);

    const allDone = newResults.every(r => r !== null);
    if (allDone) {
      setPhase('summary');
    } else {
      setPhase('hub');
    }
    setActiveNode(null);
  };

  const doneCount = results.filter(r => r !== null).length;
  const currentFlaw = activeNode !== null && flaws.length > 0 ? flaws[activeNode] : null;

  // ── Hub ────────────────────────────────────────────────────────────────────
  if (phase === 'hub') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="text-gold" style={{ fontSize: '2.8rem', marginBottom: '0.3rem', textAlign: 'center' }}>
          <DualText en={dict.stages.HARMONIZATION.en} zh={dict.stages.HARMONIZATION.zh} />
        </h1>
        <div className="text-magic" style={{ fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
          <DualInline en="Select a flaw node to begin purification" zh="选择一个瑕疵节点以开始修复" />
        </div>

        <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

          {/* Artifact placeholder */}
          <div style={{
            width: '200px',
            height: '200px',
            border: '2px dashed var(--color-border)',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            boxShadow: '0 0 40px rgba(0,255,200,0.06)'
          }}>
            <div style={{
                  fontSize: '3.5rem',
                  marginBottom: '0.1rem',
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 0 12px var(--color-magic))'
                }}>
              {(() => {
                const recipe = data.Recipes[context.recipeIndex || 0];
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
            <div className="text-dim" style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <DualInline en="Artifact" zh="法宝" />
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: results[i] !== null ? 'var(--color-magic)' : 'rgba(255,255,255,0.15)',
                  boxShadow: results[i] !== null ? '0 0 6px var(--color-magic)' : 'none',
                  transition: 'all 0.3s'
                }} />
              ))}
            </div>
          </div>

          {/* Connector line */}
          <div style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, var(--color-border), transparent)', margin: '-1.8rem 0' }} />

          {/* 3 Node slots */}
          <div className="item-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', width: '100%' }}>
            {NODE_CATEGORIES.map((cat, i) => {
              const done = results[i] !== null;
              const res = results[i];
              return (
                <div
                  key={cat}
                  className={`selectable-card ${done ? '' : 'hoverable'}`}
                  onClick={() => !done && handleNodeClick(i)}
                  style={{
                    cursor: done ? 'default' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1.5rem 1rem',
                    border: done
                      ? '1px solid rgba(0,255,200,0.4)'
                      : `1px solid ${NODE_COLORS[i]}55`,
                    background: done
                      ? 'rgba(0,255,200,0.05)'
                      : `${NODE_COLORS[i]}0d`,
                    position: 'relative',
                    opacity: done ? 0.85 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  {/* Done badge */}
                  {done && <div style={{
                    position: 'absolute', top: '0.5rem', right: '0.6rem',
                    fontSize: '0.7rem', color: 'var(--color-magic)',
                    letterSpacing: '0.06em', textTransform: 'uppercase'
                  }}>✓ <DualInline en="Purified" zh="已修复" /></div>}

                  <div style={{ fontSize: '2.5rem', marginBottom: '0.7rem', filter: done ? 'grayscale(0.5)' : 'none' }}>
                    {NODE_ICONS[i]}
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: NODE_COLORS[i], marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <DualInline en={cat} zh={NODE_LABELS_ZH[i]} />
                  </div>

                  {done && res ? (
                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                      <div className="text-dim" style={{ fontSize: '0.7rem', marginBottom: '0.3rem' }}>
                        <DualInline en={res.stat} zh={t(res.stat)} />
                      </div>
                      <div style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '1.1rem' }}>+{res.buff}%</div>
                    </div>
                  ) : (
                    <div className="text-dim" style={{ fontSize: '0.78rem', marginTop: '0.4rem', textAlign: 'center' }}>
                      {flaws.length > 0 ? (
                        <span style={{ fontStyle: 'italic', opacity: 0.7 }}>
                          <DualInline en="Click to purify" zh="点击修复" />
                        </span>
                      ) : '…'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="text-dim" style={{ fontSize: '0.85rem', letterSpacing: '0.06em' }}>
            <DualInline en={`${doneCount} / 3 nodes purified`} zh={`已修复 ${doneCount} / 3 个节点`} />
          </div>
        </div>
      </div>
    );
  }

  // ── Minigame ───────────────────────────────────────────────────────────────
  if (phase === 'minigame' && currentFlaw) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '0.3rem', textAlign: 'center' }}>
          <DualText en={dict.stages.HARMONIZATION.en} zh={dict.stages.HARMONIZATION.zh} />
        </h1>

        <div className="text-magic" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
          <DualInline
            en={`${currentFlaw.category} Node — Choose your remedy`}
            zh={`${NODE_LABELS_ZH[activeNode!]}节点 — 选择解决方案`}
          />
        </div>

        <div className="flaw-container" style={{ marginBottom: '2.5rem', border: '1px solid rgba(255,0,0,0.35)', background: 'rgba(255,0,0,0.06)', width: '100%', maxWidth: '700px' }}>
          <div className="text-dim" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <DualInline
              en={`${currentFlaw.category} Anomalous Pattern`}
              zh={`${NODE_LABELS_ZH[activeNode!]}异常波动`}
            />
          </div>
          <h3 className="flaw-title" style={{ margin: 0 }}>
            <DualInline en={`Detected: ${currentFlaw.title}`} zh={`检测到异常: ${t(currentFlaw.title)}`} />
          </h3>
        </div>

        <div className="item-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', width: '100%', maxWidth: '900px' }}>
          {cards.map((card, idx) => (
            <div key={idx} className="card-draw" onClick={() => handleCardSelect(idx)}>
              <h4 style={{ color: 'var(--color-magic)', fontSize: '1.4rem', marginBottom: '0.8rem', lineHeight: 1 }}>
                {NODE_ICONS[activeNode!]}
              </h4>
              <div style={{ marginBottom: '0.8rem', color: 'var(--color-primary)', fontSize: '1rem', letterSpacing: '0.03em', lineHeight: 1.3, fontWeight: 'bold' }}>
                <DualText en={card.resolution} zh={t(card.resolution)} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', marginBottom: '0.4rem' }}>
                <DualInline en="Increases" zh="提升" />
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginBottom: '0.6rem', fontWeight: 600 }}>
                <DualInline en={card.stat} zh={t(card.stat)} />
              </div>
              <div style={{ fontSize: '1.6rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>
                +{card.buff}%
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setPhase('hub'); setActiveNode(null); }}
          style={{ marginTop: '2rem', background: 'none', border: '1px solid var(--color-border)', color: 'var(--color-text-dim)', padding: '0.4rem 1.2rem', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '4px' }}
        >
          ← <DualInline en="Back to Artifact" zh="返回法宝" />
        </button>
      </div>
    );
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  return (
    <div className="wuxia-screen-enter" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '2.8rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        <DualText en="Harmonization Complete" zh="修复完成" />
      </h1>
      <div className="text-magic" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <DualText en="The artifact matrix has reached a state of perfect resonance." zh="法宝基质已达到完美共鸣的境界。" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem', width: '100%', maxWidth: '750px' }}>
        {results.map((res, i) => res && (
          <div key={i} className="panel" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1.1rem 1.4rem',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-subpanel)',
            borderLeft: `3px solid ${NODE_COLORS[i]}`
          }}>
            <div style={{ textAlign: 'left' }}>
              <div className="text-dim" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
                <DualInline en={`Flaw Purified: ${res.flawTitle}`} zh={`瑕疵修复: ${t(res.flawTitle)}`} />
              </div>
              <div className="text-primary" style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                <DualText en={res.resolution} zh={t(res.resolution)} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-text-dim)', marginBottom: '0.2rem' }}>
                <DualInline en={res.stat} zh={t(res.stat)} />
              </div>
              <div style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '1.2rem' }}>+{res.buff}%</div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="primary"
        onClick={onConfirm}
        style={{ padding: '0.6rem 4rem', fontSize: '1.1rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}
      >
        <span className="kbd-badge">F</span>
        <DualInline en="Conclude Harmonization" zh="结束修复" />
      </button>
    </div>
  );
}
