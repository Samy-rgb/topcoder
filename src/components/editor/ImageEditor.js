import React, { useState } from 'react';
import { Type, Image as ImageIcon, Save, Undo, Redo } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../common/Button';

const ImageEditor = ({ asset, onSave }) => {
  const [activeMode, setActiveMode] = useState('select');
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showLogoSelector, setShowLogoSelector] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  const handleSave = async () => {
    try {
      // Mock save functionality
      toast.success('Asset saved successfully!');
      onSave && onSave(asset);
    } catch (error) {
      toast.error('Failed to save asset: ' + error.message);
    }
  };

  const addText = () => {
    setActiveMode('text');
    setShowTextEditor(true);
  };

  const addLogo = () => {
    setActiveMode('logo');
    setShowLogoSelector(true);
  };

  return (
    <div className="image-editor">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            className={`toolbar-button ${activeMode === 'select' ? 'active' : ''}`}
            onClick={() => setActiveMode('select')}
          >
            Select
          </button>
          
          <button
            className={`toolbar-button ${activeMode === 'text' ? 'active' : ''}`}
            onClick={addText}
          >
            <Type size={18} />
            Add Text
          </button>
          
          <button
            className={`toolbar-button ${activeMode === 'logo' ? 'active' : ''}`}
            onClick={addLogo}
          >
            <ImageIcon size={18} />
            Add Logo
          </button>
        </div>

        <div className="toolbar-group">
          <button className="toolbar-button" disabled={historyStep <= 0}>
            <Undo size={18} />
          </button>
          
          <button className="toolbar-button" disabled={historyStep >= history.length - 1}>
            <Redo size={18} />
          </button>
        </div>

        <div className="toolbar-group">
          <Button onClick={handleSave} className="save-button">
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="editor-canvas-container">
        <div className="canvas-placeholder">
          <img src={asset.url} alt={asset.name} style={{ maxWidth: '100%', maxHeight: '600px' }} />
          <p>Image Editor (Canvas placeholder)</p>
          <p>Asset: {asset.name}</p>
        </div>
      </div>

      {showTextEditor && (
        <div className="text-editor-modal">
          <div className="modal-content">
            <h3>Add Text</h3>
            <input type="text" placeholder="Enter text..." />
            <div className="modal-actions">
              <Button onClick={() => setShowTextEditor(false)} variant="outline">Cancel</Button>
              <Button onClick={() => setShowTextEditor(false)}>Add Text</Button>
            </div>
          </div>
        </div>
      )}

      {showLogoSelector && (
        <div className="logo-selector-modal">
          <div className="modal-content">
            <h3>Add Logo</h3>
            <p>Logo selector placeholder</p>
            <div className="modal-actions">
              <Button onClick={() => setShowLogoSelector(false)} variant="outline">Cancel</Button>
              <Button onClick={() => setShowLogoSelector(false)}>Add Logo</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
