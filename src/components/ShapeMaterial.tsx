import React, { useEffect, useState } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';
import { dict, DualText, DualInline, parseRecipeName } from '../i18n';

interface ShapeMaterialProps {
  context: CraftingContext;
  onFinishFabing: () => void;
  onProceedLingQi: () => void;
}

export default function ShapeMaterial({ context, onFinishFabing, onProceedLingQi }: ShapeMaterialProps) {
  const [stage, setStage] = useState(0);
  const recipe = data.Recipes[context.recipeIndex || 0];

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2000);
    const t2 = setTimeout(() => setStage(2), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        <DualText en={dict.stages.SHAPE.en} zh={dict.stages.SHAPE.zh} />
      </h1>
      <div className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '3rem', textAlign: 'center' }}>
        <DualText en="Watching the pure primordial energy crystallize into its true form..." zh="凝视纯粹本源能量结晶，凝化出法宝真身..." />
      </div>

      <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
        {stage === 0 && <div className="animate-pulse" style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-fire)', filter: 'blur(20px)' }}></div>}
        {stage === 1 && <div className="animate-morph" style={{ width: '150px', height: '150px', background: 'var(--color-primary-dim)', border: '2px solid var(--color-primary)' }}></div>}
        {stage === 2 && (
          <div className="animate-pulse-magic" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '6rem' }}>⭐️</div>
            <div className="text-gold" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
              <DualText {...{en: parseRecipeName(recipe["__EMPTY"] || "").baseEn, zh: parseRecipeName(recipe["__EMPTY"] || "").baseZh}} />
            </div>
          </div>
        )}
      </div>

      <div style={{ opacity: stage === 2 ? 1 : 0, transition: 'opacity 1s ease', display: 'flex', gap: '2rem' }}>
        <button className="primary" onClick={onFinishFabing}>
          <DualInline en="Complete Crafting (FaBing)" zh="完成炼制 (法兵)" />
        </button>
        {recipe["Demon Core Requirement"] && (
          <button className="danger" onClick={onProceedLingQi} style={{ border: '1px solid var(--color-magic)', color: 'var(--color-magic)' }}>
            <DualInline en="Elevate to Ling Qi (Inject Demon Core)" zh="升华至灵器 (注入妖丹)" />
          </button>
        )}
      </div>
    </div>
  );
}
