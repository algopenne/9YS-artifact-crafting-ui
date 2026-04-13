import React from 'react';
import data from '../data.json';
import type { CraftingContext } from '../types';

interface StatSidebarProps {
  context: CraftingContext;
}

export default function StatSidebar({ context }: StatSidebarProps) {
  const { stats, lastUpdatedStat, lastUpdateTimestamp, harmonizedStats = [] } = context;

  // Group stats by category based on data.json structure
  const categories = ['Offensive', 'Defensive', 'Utility / Mobility'];
  
  const groupedStats = categories.map(cat => ({
    name: cat,
    items: data.Harmonization.filter(h => h["Flaw Category"] === cat)
      .map(h => h["Stat Name (English)"])
      // Remove duplicates
      .filter((value, index, self) => self.indexOf(value) === index)
  }));

  return (
    <div className="sidebar" style={{
      width: '320px',
      background: 'var(--color-bg-base)',
      border: '2px solid var(--color-border)',
      borderRadius: '16px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
      overflow: 'hidden'
    }}>
      <h2 className="text-gold" style={{ 
        textAlign: 'center', 
        marginBottom: '1rem', 
        fontSize: '1.4rem',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '0.8rem'
      }}>
        📜 Artifact Statistics
      </h2>
      
      {groupedStats.map(group => (
        <div key={group.name} style={{ marginBottom: '1.2rem' }}>
          <h3 style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.12rem',
            color: 'var(--color-primary)',
            marginBottom: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'currentColor' }}></span>
            {group.name}
          </h3>
          
          <div className="stat-grid-dense" style={{ gap: '0.4rem 0.8rem' }}>
            {group.items.map(statName => {
              const isPulsing = lastUpdatedStat === statName;
              const isHarmonized = harmonizedStats.includes(statName);
              
              let className = 'stat-item-dense';
              if (isPulsing) className += ' stat-pulse-animation';
              else if (isHarmonized) className += ' stat-harmonized-cyan';
              
              return (
                <div 
                  key={statName + (isPulsing ? lastUpdateTimestamp : '')} 
                  className={className}
                  style={{
                    padding: '0.4rem 0.6rem',
                    border: isPulsing ? '1px solid #00ffff' : isHarmonized ? '1px solid rgba(0, 255, 255, 0.4)' : '1px solid rgba(255,255,255,0.04)'
                  }}
                >
                  <span className="stat-label" style={{ fontSize: '0.75rem' }} title={statName}>{statName}</span>
                  <span className="stat-value" style={{ fontSize: '0.85rem' }}>
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
