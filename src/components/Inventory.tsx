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
    <div style={{ marginTop: '2rem', width: '100%', background: 'var(--color-bg-panel)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
       <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          🎒 Spatial Ring Inventory
       </h2>
       <p className="text-dim" style={{ fontSize: '0.8rem', marginBottom: '1.5rem' }}>Player's Materials</p>

       <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', 
          gap: '1rem',
          justifyContent: 'center'
       }}>
          {inventory.map(mat => {
             const highlighted = isMaterialHighlighted(mat);
             const isHoveringAny = highlightedRecipe !== null;
             
             const opacity = !isHoveringAny ? 1 : (highlighted ? 1 : 0.3);
             const border = highlighted ? '2px solid var(--color-primary)' : '2px solid var(--color-border)';
             const bg = highlighted ? 'var(--color-primary-dim)' : 'var(--color-bg-base)';
             
             return (
                <div key={mat} className="has-tooltip" style={{ 
                  opacity, 
                  border, 
                  background: bg, 
                  width: '80px',
                  height: '80px', 
                  borderRadius: '12px', 
                  transition: 'all 0.15s ease-in-out',
                  boxShadow: highlighted ? '0 0 15px var(--color-primary), inset 0 0 10px var(--color-primary)' : '0 4px 6px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                   <div style={{ fontSize: '2rem' }}>{getEmojiForMaterial(mat)}</div>
                   <div className="custom-tooltip">
                      <strong className="text-gold" style={{ display: 'block', fontSize: '1.1rem' }}>{mat}</strong>
                      <div style={{ color: 'var(--color-primary)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{getMaterialMetadata(mat).category}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.2' }}>{getMaterialMetadata(mat).desc}</div>
                   </div>
                </div>
             )
          })}
       </div>
    </div>
  );
}
