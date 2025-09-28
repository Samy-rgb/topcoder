import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import ImageEditor from '../components/editor/ImageEditor';
import Loading from '../components/common/Loading';
import { uploadAPI } from '../services/api';

const Editor = () => {
  const { assetId } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAsset();
  }, [assetId]);

  const loadAsset = async () => {
    try {
      const response = await uploadAPI.getAssetById(assetId);
      setAsset(response.data);
    } catch (error) {
      console.error('Failed to load asset:', error);
      navigate('/upload');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (savedAsset) => {
    setAsset(savedAsset);
  };

  if (loading) return <Loading message="Loading editor..." />;
  if (!asset) return <div>Asset not found</div>;

  return (
    <div className="editor-layout">
      <Header title={`Edit: ${asset.name}`} />
      <div className="editor-content">
        <Sidebar />
        <main className="main-content">
          <ImageEditor asset={asset} onSave={handleSave} />
        </main>
      </div>
    </div>
  );
};

export default Editor;
