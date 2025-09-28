import React, { useState } from 'react';
import { Download, Archive, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../common/Button';

const DownloadManager = ({ generatedAssets, jobId }) => {
  const [assets] = useState(generatedAssets || [
    {
      id: 1,
      name: 'Instagram Story 1',
      platform: 'Instagram',
      format: 'Story',
      dimensions: '1080x1920',
      thumbnailUrl: 'https://via.placeholder.com/150',
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      name: 'LinkedIn Post 1',
      platform: 'LinkedIn',
      format: 'Post',
      dimensions: '1200x628',
      thumbnailUrl: 'https://via.placeholder.com/150',
      fileSize: '1.8 MB'
    }
  ]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const handleSelectAsset = (assetId) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAssets.length === assets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(assets.map(asset => asset.id));
    }
  };

  const downloadSingleAsset = async (asset) => {
    try {
      // Mock download
      toast.success(`${asset.name} downloaded successfully`);
    } catch (error) {
      toast.error(`Failed to download ${asset.name}`);
    }
  };

  const downloadBulkAssets = async () => {
    if (selectedAssets.length === 0) {
      toast.error('Please select assets to download');
      return;
    }

    setDownloading(true);
    try {
      // Mock bulk download
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Downloaded ${selectedAssets.length} assets as ZIP file`);
    } catch (error) {
      toast.error('Failed to create ZIP file');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="download-manager">
      <div className="download-header">
        <div className="download-stats">
          <h2>Generated Assets ({assets.length})</h2>
          <p>{selectedAssets.length} selected</p>
        </div>
        
        <div className="download-controls">
          <Button onClick={handleSelectAll} variant="outline" size="sm">
            {selectedAssets.length === assets.length ? 'Deselect All' : 'Select All'}
          </Button>
          
          <Button
            onClick={downloadBulkAssets}
            disabled={selectedAssets.length === 0 || downloading}
            className="download-bulk-button"
          >
            <Archive size={18} />
            {downloading ? 'Creating ZIP...' : 'Download Selected (ZIP)'}
          </Button>
        </div>
      </div>

      <div className="assets-grid">
        {assets.map(asset => (
          <div 
            key={asset.id} 
            className={`asset-card ${selectedAssets.includes(asset.id) ? 'selected' : ''}`}
          >
            <div className="asset-checkbox">
              <input
                type="checkbox"
                checked={selectedAssets.includes(asset.id)}
                onChange={() => handleSelectAsset(asset.id)}
              />
            </div>
            
            <div className="asset-preview">
              <img src={asset.thumbnailUrl} alt={asset.name} />
              <div className="asset-overlay">
                <Button
                  onClick={() => downloadSingleAsset(asset)}
                  size="sm"
                  className="download-single-button"
                >
                  <Download size={14} />
                </Button>
              </div>
            </div>
            
            <div className="asset-info">
              <div className="asset-name">{asset.name}</div>
              <div className="asset-meta">
                <span className="platform">{asset.platform}</span>
                <span className="format">{asset.format}</span>
                <span className="dimensions">{asset.dimensions}</span>
              </div>
              <div className="download-status">
                <CheckCircle size={16} className="text-green-500" />
                <span className="file-size">{asset.fileSize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {assets.length === 0 && (
        <div className="empty-state">
          <Archive size={48} />
          <h3>No Assets Generated</h3>
          <p>Generated assets will appear here once the AI processing is complete.</p>
        </div>
      )}
    </div>
  );
};

export default DownloadManager;
