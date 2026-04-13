import React from 'react';
import { dict, DualText, DualInline } from '../i18n';

interface RuneInscriptionProps {
  onConfirm: () => void;
}

export default function RuneInscription({ onConfirm }: RuneInscriptionProps) {
  return (
    <div className="wuxia-screen-enter" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        <DualText en={dict.stages.RUNE_INSCRIPTION.en} zh={dict.stages.RUNE_INSCRIPTION.zh} />
      </h1>
      <div className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '3rem', textAlign: 'center' }}>
        <DualText en={dict.ui.runeInscriptionDesc.en} zh={dict.ui.runeInscriptionDesc.zh} />
      </div>

      {/* Unified Centered Constraint Wrapper */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="panel" style={{ width: '100%', marginBottom: '2rem', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-dim" style={{ fontStyle: 'italic', fontSize: '1.2rem', textAlign: 'center' }}>
            <DualText en={dict.ui.runeInscriptionPlaceholder.en} zh={dict.ui.runeInscriptionPlaceholder.zh} />
          </div>
        </div>

        <button className="primary" onClick={onConfirm} style={{ padding: '0.6rem 2.5rem', fontSize: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
          <span className="kbd-badge">F</span>
          <DualInline en={dict.ui.finishInscription.en} zh={dict.ui.finishInscription.zh} />
        </button>
      </div>
    </div>
  );
}
