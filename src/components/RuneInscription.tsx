import React from 'react';

interface RuneInscriptionProps {
  onConfirm: () => void;
}

export default function RuneInscription({ onConfirm }: RuneInscriptionProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Rune Inscription</h1>
      <p className="text-magic" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
        Inscribe runes to enhance your artifact's final power.
      </p>

      {/* Unified Centered Constraint Wrapper */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="panel" style={{ width: '100%', marginBottom: '2rem', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="text-dim" style={{ fontStyle: 'italic', fontSize: '1.2rem' }}>
            [ Rune Inscription Content Placeholder ]
          </p>
        </div>

        <button className="primary" onClick={onConfirm} style={{ padding: '0.8rem 2.5rem', fontSize: '1rem', marginBottom: '2rem' }}>
          <span className="kbd-badge">F</span>
          Finish Inscription &amp; Proceed
        </button>
      </div>
    </div>
  );
}
