import React from 'react';
import data from '../data.json';
import type { CraftingContext } from '../types';
import { DualInline, t } from '../i18n';

interface StatSidebarProps {
  context: CraftingContext;
}

// Short display names to avoid cutoff in the sidebar
const STAT_ABBREV: Record<string, string> = {
  'Global Damage': 'Global Dmg',
  'Attack Damage': 'Atk Dmg',
  'Spell Damage': 'Spell Dmg',
  'Physical Damage': 'Phys Dmg',
  'Mental Damage': 'Mental Dmg',
  'Elemental Damage': 'Elem Dmg',
  'Poise Damage Force': 'Poise Force',
  'Barrier Penetration': 'Barrier Pen',
  'Crit Chance': 'Crit %',
  'Crit Multiplier': 'Crit Mult',
  'Spirit Sense Injury': 'Sense Inj',
  'Spirit Sense Damage Strength': 'Sense Dmg Str',
  'Spirit Sense Penetration': 'Sense Pen',
  'Spirit Sense Interference Strength': 'Sense Intf Str',
  'Elemental Damage Resist': 'Elem Resist',
  'Mental Damage Resist': 'Mental Resist',
  'Rebound': 'Rebound',
  'Poise Damage Resist': 'Poise Resist',
  'Crit Resist': 'Crit Resist',
  'Spirit Sense Resist Strength': 'Sense Resist',
  'Spirit Sense Interference Resist Strength': 'Sense Intf Res',
  'Skill Cooldown': 'Cooldown',
  'Spirit Sense Reserve': 'Sense Reserve',
  'Fabao Amplification': 'FaBao Amp',
  'Control Distance Increase': 'Ctrl Range',
  'Max Speed': 'Max Speed',
  'Acceleration': 'Accel',
  'Maneuverability': 'Maneuver',
  'Artifact Flight Mana Cost': 'Flight Cost',
};

const NODE_COLORS = ['var(--color-fire-root)', 'var(--color-primary)', 'var(--color-magic)'];

export default function StatSidebar({ context }: StatSidebarProps) {
  const { stats, lastUpdatedStat, lastUpdateTimestamp, harmonizedStats = [] } = context;

  const categories = ['Offensive', 'Defensive', 'Utility / Mobility'];

  const groupedStats = categories.map(cat => ({
    name: cat,
    items: data.Harmonization.filter(h => h["Flaw Category"] === cat)
      .map(h => h["Stat Name (English)"])
      .filter((value, index, self) => self.indexOf(value) === index)
  }));

  return (
    <div className="sidebar" style={{
      width: '390px',
      background: 'var(--color-bg-base)',
      border: '2px solid var(--color-border)',
      borderRadius: '16px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <h2 className="text-gold" style={{
        textAlign: 'center',
        marginBottom: '1rem',
        fontSize: '1.25rem',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '0.8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.15rem'
      }}>
        <span>📜 <DualInline en="Artifact Statistics" zh="法宝属性详情" /></span>
      </h2>

      {groupedStats.map((group, gi) => (
        <div key={group.name} style={{ marginBottom: '1rem' }}>
          <div style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1rem',
            color: NODE_COLORS[gi],
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 'bold'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
            <DualInline
              en={group.name}
              zh={group.name === 'Offensive' ? '进攻类' : group.name === 'Defensive' ? '防御类' : '妙用与机动'}
            />
          </div>

          <div className="stat-grid-dense" style={{ gap: '0.35rem 0.6rem' }}>
            {group.items.map(statName => {
              const isPulsing = lastUpdatedStat === statName;
              const isHarmonized = harmonizedStats.includes(statName);

              let className = 'stat-item-dense';
              if (isPulsing) className += ' stat-pulse-animation';
              else if (isHarmonized) className += ' stat-harmonized-cyan';

              const displayLabel = STAT_ABBREV[statName] ?? statName;
              const zhLabel = t(statName);

              return (
                <div
                  key={statName + (isPulsing ? lastUpdateTimestamp : '')}
                  className={className}
                  style={{
                    padding: '0.4rem 0.55rem',
                    border: isPulsing
                      ? '1px solid #00ffff'
                      : isHarmonized
                        ? '1px solid rgba(0, 255, 255, 0.4)'
                        : '1px solid rgba(255,255,255,0.04)'
                  }}
                  title={statName}
                >
                  <div className="stat-label" style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {displayLabel}
                    </div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.75, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {zhLabel}
                    </div>
                  </div>
                  <span className="stat-value" style={{ fontSize: '0.9rem', flexShrink: 0 }}>
                    {stats[statName] || 100}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
