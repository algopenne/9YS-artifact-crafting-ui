import React, { useState } from 'react';
import './index.css';
import type { CraftingContext, GameState } from "./types";
import SelectRecipe from './components/SelectRecipe';
import ChooseMaterials from './components/ChooseMaterials';
import SmeltMaterials from './components/SmeltMaterials';
import ShapeMaterial from './components/ShapeMaterial';
import DemonCore from './components/DemonCore';
import SpiritEssence from './components/SpiritEssence';
import Harmonization from './components/Harmonization';
import FinalTempering from './components/FinalTempering';
import StatSidebar from './components/StatSidebar';
import data from './data.json';

// Initialize stats from data.json
const INITIAL_STATS: Record<string, number> = {};
data.Harmonization.forEach(h => {
  INITIAL_STATS[h["Stat Name (English)"]] = 100;
});

function App() {
  const [gameState, setGameState] = useState<GameState>('RECIPE');
  const [context, setContext] = useState<CraftingContext>({
    recipeIndex: null,
    tier: 'Fabing',
    investedStones: 0,
    chosenFlawCategory: null,
    chosenHarmonizationCard: null,
    stats: INITIAL_STATS
  });

  const resetGame = () => {
    setGameState('RECIPE');
    setContext({
      recipeIndex: null,
      tier: 'Fabing',
      investedStones: 0,
      chosenFlawCategory: null,
      chosenHarmonizationCard: null,
      stats: INITIAL_STATS
    });
  };

  return (
    <div className="layout" style={{ 
      justifyContent: 'center', 
      alignItems: 'center', 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        width: '95%', 
        maxWidth: '1600px', 
        height: '90vh',
        alignItems: 'stretch'
      }}>
        <div className="menu-box" style={{ 
           flex: 1,
           background: 'var(--color-bg-base)', 
           padding: '2rem', 
           borderRadius: '16px', 
           border: '2px solid var(--color-border)', 
           boxShadow: '0 10px 40px rgba(0,0,0,0.8)', 
           overflowY: 'auto', 
           display: 'flex', 
           flexDirection: 'column' 
        }}>
      {gameState !== 'RECIPE' && (
        <header className="layout-header">
          <button style={{ position: 'absolute', left: 0, top: 0 }} onClick={resetGame}>Back to Recipes</button>
          <h1 className="text-gold">Celestial Forge</h1>
          <p className="text-dim text-magic">Current Phase: <strong style={{color: 'var(--color-primary)'}}>{gameState.replace('_', ' ')}</strong></p>
        </header>
      )}

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {gameState === 'RECIPE' && (
          <SelectRecipe onSelect={(idx) => {
             setContext({ ...context, recipeIndex: idx });
             setGameState('MATERIALS');
          }} />
        )}
        
        {gameState === 'MATERIALS' && (
          <ChooseMaterials context={context} onConfirm={() => setGameState('SMELT')} />
        )}

        {gameState === 'SMELT' && (
          <SmeltMaterials context={context} setContext={setContext} onConfirm={() => setGameState('SHAPE')} />
        )}

        {gameState === 'SHAPE' && (
          <ShapeMaterial 
            context={context} 
            onFinishFabing={() => {
              setContext({ ...context, tier: 'Fabing' });
              setGameState('HARMONIZATION');
            }}
            onProceedLingQi={() => {
              setGameState('DEMON_CORE');
            }}
          />
        )}

        {gameState === 'DEMON_CORE' && (
          <DemonCore
            context={context}
            onFinishLingQi={() => {
              setContext({ ...context, tier: 'LingQi' });
              setGameState('HARMONIZATION');
            }}
            onProceedFaBao={() => {
               setGameState('SPIRIT_ESSENCE');
            }}
          />
        )}

        {gameState === 'SPIRIT_ESSENCE' && (
          <SpiritEssence 
            context={context}
            onConfirm={() => {
              setContext({ ...context, tier: 'FaBao' });
              setGameState('HARMONIZATION');
            }}
          />
        )}

        {gameState === 'HARMONIZATION' && (
          <Harmonization 
            context={context}
            setContext={setContext}
            onConfirm={() => setGameState('TEMPERING')}
          />
        )}

        {gameState === 'TEMPERING' && (
          <FinalTempering context={context} onRestart={resetGame} />
        )}
      </div>
      </div>
      
      {gameState !== 'RECIPE' && (
        <StatSidebar stats={context.stats} />
      )}
      </div>
    </div>
  );
}

export default App;
