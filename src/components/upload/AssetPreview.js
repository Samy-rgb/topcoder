import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const AssetPreview = ({ assets, selectedAssets, onAssetSelect }) => {
  return (
    <div className="asset-preview-container">
      <div className="assets-grid">
        {assets.map(asset => (
          <div 
            key={asset.id} 
            className={`asset-card ${selectedAssets.includes(asset.id) ? 'selected' : ''}`}
            onClick={() => onAssetSelect(asset.id)}
          >
            <div className="asset-checkbox">
              {selectedAssets.includes(asset.id) ? (
                <CheckCircle size={20} className="text-blue-500" />
              ) : (
                <Circle size={20} className="text-gray-400" />
              )}
            </div>
            
            <div className="asset-thumbnail">
              <img src={asset.thumbnail || asset.url} alt={asset.name} />
            </div>
            
            <div className="asset-info">
              <h4 className="asset-name">{asset.name}</h4>
              <p className="asset-size">{(asset.size / 1024 / 1024).toFixed(2)} MB</p>
              <p className="asset-type">{asset.type || 'Image'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetPreview;
