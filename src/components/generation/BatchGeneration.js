import React from 'react';
import { Play, Pause, StopCircle } from 'lucide-react';
import Button from '../common/Button';

const BatchGeneration = ({ assets, formats, provider, onStart, onPause, onStop, isRunning }) => {
  const totalVariants = assets.length * formats.length;

  return (
    <div className="batch-generation">
      <div className="generation-summary">
        <h3>Batch Generation Summary</h3>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-value">{assets.length}</span>
            <span className="stat-label">Assets</span>
          </div>
          <div className="stat">
            <span className="stat-value">{formats.length}</span>
            <span className="stat-label">Formats</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalVariants}</span>
            <span className="stat-label">Total Variants</span>
          </div>
        </div>
      </div>

      <div className="generation-controls">
        {!isRunning ? (
          <Button onClick={onStart} size="lg" className="start-button">
            <Play size={20} />
            Start Generation
          </Button>
        ) : (
          <div className="running-controls">
            <Button onClick={onPause} variant="outline">
              <Pause size={20} />
              Pause
            </Button>
            <Button onClick={onStop} variant="danger">
              <StopCircle size={20} />
              Stop
            </Button>
          </div>
        )}
      </div>

      <div className="provider-info">
        <p>Using: <strong>{provider?.name}</strong></p>
        <p>{provider?.description}</p>
      </div>
    </div>
  );
};

export default BatchGeneration;
