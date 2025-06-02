import React from 'react';
import './MoleculeViewer.css';

const MoleculeViewer = ({ molecules }) => {
  return (
    <div className="molecule-viewer">
      <h3>Molecules</h3>
      <div className="molecule-list">
        {molecules.map((molecule, index) => (
          <div key={index} className="molecule-card">
            <div className="molecule-formula">{molecule}</div>
            <div className="molecule-info">
              <p>Chemical Formula</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoleculeViewer; 