import React, { useMemo } from 'react';
import data from '../data.json';
import { getMaterialMetadata } from '../materialData';

interface InventoryProps {
  highlightedRecipe: any | null;
}

const getEmojiForMaterial = (name: string) => {
  if (name.includes('Demon') || name.includes('Heart')) return '🫀';
  if (name.includes('Soul') || name.includes('Spirit')) return '👻';
  if (name.includes('Iron') || name.includes('Starfall')) return '☄️';
  if (name.includes('Obsidian') || name.includes('Iron')) return '🪨';
  if (name.includes('Bamboo')) return '🎋';
  if (name.includes('Crystal')) return '💎';
  if (name.includes('Shell') || name.includes('Turtle')) return '🐢';
  return '📦';
};

export default function Inventory({ highlightedRecipe }: InventoryProps) {
  const recipes = data.Recipes;

  const inventory = useMemo(() => {
    const allMaterials = new Set<string>();
    recipes.forEach((r: any) => {
      if (r["Matrix Material Requirement"]) allMaterials.add(r["Matrix Material Requirement"]);
      if (r["Source Material Requirement"]) allMaterials.add(r["Source Material Requirement"]);
      if (r["Demon Core Requirement"]) allMaterials.add(r["Demon Core Requirement"]);
      if (r["Spirit Essence Requirement"]) allMaterials.add(r["Spirit Essence Requirement"]);
    });
    return Array.from(allMaterials);
  }, [recipes]);

  const isMaterialHighlighted = (matName: string) => {
    if (!highlightedRecipe) return false;
    const reqs = [
      (highlightedRecipe as any)["Matrix Material Requirement"],
      (highlightedRecipe as any)["Source Material Requirement"],
      (highlightedRecipe as any)["Demon Core Requirement"],
      (highlightedRecipe as any)["Spirit Essence Requirement"]
    ];
    return reqs.includes(matName);
  };

  return (
    <div style={{ marginTop: '0.8rem', width: '100%', background: 'var(--color-bg-panel)', border: '1px solid var(--color-border)', borderRadius: '0', padding: '0.6rem 1rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        🎒 Spatial Ring Inventory
      </h2>
      <p className="text-dim" style={{ fontSize: '0.75rem', marginBottom: '0.8rem', letterSpacing: '0.04em' }}>Player's Materials — {inventory.length} / 10 Slots Used</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: '4px',
        width: '100%',
      }}>
        {Array.from({ length: 10 }).map((_, slotIdx) => {
          const mat = inventory[slotIdx];
          if (!mat) {
            return (
              <div key={`empty-${slotIdx}`} style={{
                aspectRatio: '1',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.06)',
              }} />
            );
          }
          const highlighted = isMaterialHighlighted(mat);
          const isHoveringAny = highlightedRecipe !== null;
          const opacity = !isHoveringAny ? 1 : (highlighted ? 1 : 0.25);

          // Stable pseudo-random stack count seeded on the material name
          const stackCount = (mat.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 97) + 4;

          return (
            <div key={mat} className="has-tooltip" style={{
              opacity,
              background: highlighted ? 'var(--color-primary-dim)' : 'rgba(0,0,0,0.35)',
              aspectRatio: '1',
              border: highlighted ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.12s ease',
              boxShadow: highlighted ? '0 0 10px var(--color-primary-dim), inset 0 0 8px var(--color-primary-dim)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              borderRadius: '0',
            }}>
              <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{getEmojiForMaterial(mat)}</div>
              {/* Stack count badge — bottom-right corner */}
              <div style={{
                position: 'absolute',
                bottom: '3px',
                right: '4px',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: highlighted ? 'var(--color-primary)' : 'var(--color-text-dim)',
                fontWeight: 700,
                lineHeight: 1,
              }}>{stackCount}</div>
              <div className="custom-tooltip">
                <strong className="text-gold" style={{ display: 'block', fontSize: '1rem', marginBottom: '0.3rem' }}>{mat}</strong>
                <div style={{ color: 'var(--color-primary)', fontSize: '0.75rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{getMaterialMetadata(mat).category}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', lineHeight: '1.3' }}>{getMaterialMetadata(mat).desc}</div>
                <div style={{ marginTop: '0.4rem', color: 'var(--color-magic)', fontSize: '0.75rem' }}>Qty: {stackCount}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
