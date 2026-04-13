import React, { useState } from 'react';
import type { CraftingContext } from "../types";
import data from '../data.json';
import { dict, DualText, DualInline, parseRecipeName } from '../i18n';
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

interface SpiritEssenceProps {
  context: CraftingContext;
  onConfirm: () => void;
}

export default function SpiritEssence({ context, onConfirm }: SpiritEssenceProps) {
  const [injected, setInjected] = useState(false);
  const [infuseTrigger, setInfuseTrigger] = useState(false);
  const [proceedTrigger, setProceedTrigger] = useState(false);
  const recipe = data.Recipes[context.recipeIndex || 0];
  const essenceRequirement = recipe["Spirit Essence Requirement"];

  return (
    <div className="wuxia-screen-enter" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '2.8rem', marginBottom: '0.5rem', color: 'var(--color-tier-4)', letterSpacing: '0.06em', textAlign: 'center' }}>
        <DualText en="Awaken Spirit Essence" zh="唤醒精魂" />
      </h1>
      <div className="text-magic" style={{ fontSize: '1.1rem', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        <DualText en="Tether a true soul to the artifact. It will gain intelligence, personality, and become a sentient autonomous companion (FaBao)." zh="将真灵绑定至法宝。它将获得灵智、个性，并成为有自主意识的道侣级法宝。" />
      </div>

      {!injected ? (
        <div style={{ textAlign: 'center' }}>
          <div className="panel" style={{ width: '400px', marginBottom: '2rem', border: '1px solid var(--color-tier-4)', boxShadow: '0 0 20px hsla(270, 55%, 62%, 0.15)', borderLeft: '3px solid var(--color-tier-4)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {(() => {
                const icon = getMaterialIcon(essenceRequirement || '');
                return icon.startsWith('/src/assets/') ? (
                  <img 
                    src={icon} 
                    alt={essenceRequirement} 
                    style={{ width: '4rem', height: '4rem' }}
                  />
                ) : (
                  icon
                );
              })()}
            </div>
            <h3 style={{ color: 'var(--color-tier-4)', marginBottom: '0.4rem' }}>{essenceRequirement}</h3>
            <div className="text-dim" style={{ fontSize: '0.85rem', margin: 0 }}>
              <DualText en="A captured soul ready to accept a new vessel." zh="一个准备好接纳新躯壳的禁锢灵体。" />
            </div>
          </div>

          <ButtonExplosionEffect trigger={infuseTrigger} type="purple" cornerExplosion={true}>
            <button onClick={() => { setInfuseTrigger(true); setTimeout(() => setInfuseTrigger(false), 300); setInjected(true); }} style={{ 
              padding: '0.6rem 2.5rem', fontSize: '1rem',
              backgroundColor: 'hsla(270, 40%, 15%, 0.8)',
              color: 'var(--color-tier-4)',
              border: '1px solid var(--color-tier-4)',
              display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto'
            }}>
              <span className="kbd-badge">F</span>
              <DualInline en="Infuse Spirit Essence" zh="注入精魂" />
            </button>
          </ButtonExplosionEffect>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div className="selectable-card" style={{ 
            position: 'relative', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '300px',
            margin: '0 auto 1rem auto'
          }}>
            <LootboxReveal delay={0}>
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
            <h3 style={{ margin: '0 0 0.5rem 0', textAlign: 'center' }}>
              <DualText en={parseRecipeName(recipe["__EMPTY"] || "").baseEn} zh={parseRecipeName(recipe["__EMPTY"] || "").baseZh} />
            </h3>
            <div className="text-magic" style={{ margin: 0, fontSize: '0.9rem', textAlign: 'center' }}>
              <DualInline en={parseRecipeName(recipe["__EMPTY"] || "").rootEn} zh={parseRecipeName(recipe["__EMPTY"] || "").rootZh} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-tier-4)', letterSpacing: '0.06em' }}>
            <DualText en="FaBao Awakened!" zh="法宝已苏醒！" />
          </h3>
          <div className="text-gold" style={{ marginBottom: '3rem' }}>
            <DualText en="The weapon opens its inner eyes. It recognizes you as its master." zh="武器睁开了意识之眼。它已认你为主。" />
          </div>

          <ButtonExplosionEffect trigger={proceedTrigger} type="gold">
            <button className="primary" onClick={() => { setProceedTrigger(true); setTimeout(() => setProceedTrigger(false), 100); onConfirm(); }} style={{ padding: '0.6rem 2.5rem', fontSize: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
              <span className="kbd-badge">F</span>
              <DualInline en="Proceed to Harmonization" zh="前往修复阶段" />
            </button>
          </ButtonExplosionEffect>
        </div>
      )}
    </div>
  );
}
