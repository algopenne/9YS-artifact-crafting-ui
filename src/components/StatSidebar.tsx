import React from 'react';
import data from '../data.json';

interface StatSidebarProps {
  stats: Record<string, number>;
}

export default function StatSidebar({ stats }: StatSidebarProps) {
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
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
      overflow: 'hidden'
    }}>
      <h2 className="text-gold" style={{ 
        textAlign: 'center', 
        marginBottom: '1rem', 
        fontSize: '1.2rem',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '0.5rem'
      }}>
        📜 Artifact Specs
      </h2>
      
      {groupedStats.map(group => (
        <div key={group.name} style={{ marginBottom: '1rem' }}>
          <h3 style={{ 
            fontSize: '0.7rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1rem',
            color: 'var(--color-primary)',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
            {group.name}
          </h3>
          
          <div className="stat-grid-dense">
            {group.items.map(statName => (
              <div key={statName} className="stat-item-dense">
                <span className="stat-label" title={statName}>{statName}</span>
                <span className="stat-value">
                  {stats[statName] || 100}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
