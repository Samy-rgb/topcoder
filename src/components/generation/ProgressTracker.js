import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ProgressTracker = ({ jobId, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('pending');
  const [completedAssets, setCompletedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [currentAsset, setCurrentAsset] = useState('');

  useEffect(() => {
    if (!jobId) return;

    // Mock progress tracking
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 10, 100);
        
        if (newProgress >= 100) {
          setStatus('completed');
          setCompletedAssets(totalAssets || 5);
          onComplete && onComplete({
            id: jobId,
            completedAssets: totalAssets || 5,
            results: []
          });
          clearInterval(interval);
        } else {
          setStatus('processing');
          setCompletedAssets(Math.floor((newProgress / 100) * (totalAssets || 5)));
          setCurrentAsset(`Asset ${Math.floor(newProgress / 20) + 1}`);
        }
        
        return newProgress;
      });
    }, 1000);

    setTotalAssets(5); // Mock total

    return () => clearInterval(interval);
  }, [jobId, onComplete, totalAssets]);

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'processing':
        return <Clock size={20} className="text-blue-500" />;
      case 'failed':
        return <AlertCircle size={20} className="text-red-500" />;
      default:
        return <Clock size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <div className="status-info">
          {getStatusIcon()}
          <span className="status-text">
            {status === 'completed' ? 'Generation Complete' : 
             status === 'processing' ? 'Generating Assets...' : 
             'Preparing...'}
          </span>
        </div>
        <span className="progress-percentage">{Math.round(progress)}%</span>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="progress-details">
        <div className="progress-stats">
          <span>{completedAssets} of {totalAssets} assets completed</span>
          {currentAsset && <span>Processing: {currentAsset}</span>}
        </div>
      </div>

      {status === 'completed' && (
        <div className="completion-message">
          <CheckCircle size={24} className="text-green-500" />
          <span>All assets generated successfully!</span>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
