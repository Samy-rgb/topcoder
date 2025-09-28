import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import FileUpload from '../components/upload/FileUpload';
import AssetPreview from '../components/upload/AssetPreview';
import Button from '../components/common/Button';

const Upload = () => {
  const [uploadedAssets, setUploadedAssets] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const navigate = useNavigate();

  const handleUploadSuccess = (asset) => {
    setUploadedAssets(prev => [...prev, asset]);
  };

  const handleAssetSelect = (assetId) => {
    setSelectedAssets(prev => 
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleProceedToGeneration = () => {
    const assetsToGenerate = uploadedAssets.filter(asset => 
      selectedAssets.includes(asset.id)
    );
    
    navigate('/generation', {
      state: { assets: assetsToGenerate }
    });
  };

  return (
    <div className="upload-layout">
      <Header title="Upload Assets" />
      <div className="upload-content">
        <Sidebar />
        <main className="main-content">
          <div className="upload-section">
            <h2>Upload High-Resolution Assets</h2>
            <p>Upload PNG or JPEG files up to 50MB each</p>
            
            <FileUpload onUploadSuccess={handleUploadSuccess} />
            
            {uploadedAssets.length > 0 && (
              <div className="uploaded-assets-section">
                <div className="section-header">
                  <h3>Uploaded Assets ({uploadedAssets.length})</h3>
                  {selectedAssets.length > 0 && (
                    <Button onClick={handleProceedToGeneration}>
                      Proceed with {selectedAssets.length} assets
                    </Button>
                  )}
                </div>
                
                <AssetPreview
                  assets={uploadedAssets}
                  selectedAssets={selectedAssets}
                  onAssetSelect={handleAssetSelect}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Upload;
