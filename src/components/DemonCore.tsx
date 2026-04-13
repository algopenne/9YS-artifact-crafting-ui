import React, { useState } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';
import { dict, DualText, DualInline } from '../i18n';

interface DemonCoreProps {
  context: CraftingContext;
  onFinishLingQi: () => void;
  onProceedFaBao: () => void;
}

export default function DemonCore({ context, onFinishLingQi, onProceedFaBao }: DemonCoreProps) {
  const [injected, setInjected] = useState(false);
  const recipe = data.Recipes[context.recipeIndex || 0];
  const coreRequirement = recipe["Demon Core Requirement"];

  const handleInject = () => {
    setInjected(true);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        <DualText en="Inject Demon Core" zh="注入妖丹" />
      </h1>
      <div className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        <DualText en="Elevate your Fabing to a Ling Qi by binding a demon's core to the artifact's matrix, granting it powers of levitation and telekinesis." zh="通过将妖丹绑定到法宝基质，将其提升为灵器，赋予其御物与念动力。" />
      </div>

      {!injected ? (
        <div style={{ textAlign: 'center' }}>
          <div className="panel" style={{ width: '400px', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--color-fire-root)' }}>🩸</div>
            <h3 className="text-gold">{coreRequirement}</h3>
            <p className="text-dim" style={{ fontSize: '0.9rem' }}>Contains the fierce residual will of a profound demon.</p>
          </div>

          <button className="danger" onClick={handleInject} style={{ padding: '0.6rem 2.5rem', fontSize: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <span className="kbd-badge">F</span>
            <DualInline en="Fuse Demon Core" zh="融合妖丹" />
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '6rem', textShadow: '0 0 40px var(--color-magic)', marginBottom: '1rem' }}>✨🗡️✨</div>
          <h3 className="text-magic" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
            <DualText en="Ling Qi Forged!" zh="灵器锻造成功！" />
          </h3>
          <div className="text-gold" style={{ marginBottom: '3rem' }}>
            <DualText en="The weapon now resonates with telekinetic energy." zh="武器如今与念力产生共鸣。" />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button className="primary" onClick={onFinishLingQi} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="kbd-badge">F</span>
              <DualInline en="Complete Crafting (Ling Qi)" zh="完成炼制 (灵器)" />
            </button>
            {recipe["Spirit Essence Requirement"] && (
              <button onClick={onProceedFaBao} style={{ border: '1px solid var(--color-tier-4)', color: 'var(--color-tier-4)', background: 'hsla(270, 40%, 10%, 0.5)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span className="kbd-badge">E</span>
                <DualInline en="Elevate to FaBao (Inject Spirit Essence)" zh="升华至法宝 (注入精魂)" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
