import React, { useState, useEffect } from 'react';
import type { CraftingContext } from "../types";

interface SmeltMaterialsProps {
  context: CraftingContext;
  setContext: (ctx: CraftingContext) => void;
  onConfirm: () => void;
}

const FIRES = [
  { name: 'Earth Vein Primordial Flame', stage: 'Qi Refining', cost: 100 },
  { name: 'Samadhi True Fire', stage: 'Foundation Establishment', cost: 500 },
  { name: 'Danyang Celestial Flame', stage: 'Golden Core', cost: 2000 },
  { name: 'True Void Flame', stage: 'Nascent Soul', cost: 10000 },
];

export default function SmeltMaterials({ context, setContext, onConfirm }: SmeltMaterialsProps) {
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
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Smelt Materials</h2>
      <p className="text-dim text-magic" style={{ marginBottom: '2rem' }}>Select a spiritual fire and manage the smelting process.</p>

      {!isSmelting ? (
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <div className="item-grid">
            {FIRES.map((fire, idx) => (
              <div 
                key={idx} 
                className={`selectable-card ${selectedFire === idx ? 'selected' : ''}`}
                onClick={() => setSelectedFire(idx)}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem', filter: selectedFire === idx ? 'drop-shadow(0 0 10px red)' : '' }}>🔥</div>
                <h3 className={selectedFire === idx ? 'text-gold' : ''}>{fire.name}</h3>
                <p className="text-dim" style={{ marginBottom: '0.5rem' }}>Stage: {fire.stage}</p>
                <p className="text-magic" style={{ margin: 0 }}>Base Fuel Cost: {fire.cost} SS</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="primary" onClick={handleStart} disabled={selectedFire === null}>
              Ignite Furnace
            </button>
          </div>
        </div>
      ) : (
        <div className="panel" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }} className="layer-fire-flicker">🔥</div>
          <h3 className="text-gold" style={{ marginBottom: '2rem' }}>{FIRES[selectedFire!].name} Active</h3>
          
          <div className="smelt-progress-bg">
            <div className="smelt-progress-fill" style={{ width: `${progress}%` }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', textShadow: '0 0 5px black' }}>
              {Math.floor(progress)}%
            </div>
          </div>

          {progress < 100 ? (
            <div>
              <p className="text-dim">Smelting is a long arduous process. Burn spirit stones to accelerate it.</p>
              <button className="danger" onClick={handleInvest}>
                Burn 100 Spirit Stones (Invested: {invested})
              </button>
            </div>
          ) : (
            <div>
              <p className="text-magic" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Smelting Complete!</p>
              <button className="primary" onClick={onConfirm} style={{ marginTop: '1rem' }}>
                Extract Primordial Energy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
