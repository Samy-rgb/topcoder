import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const FormatSelector = ({ selectedFormats, onFormatChange }) => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    setPlatforms([
      {
        id: 'instagram',
        name: 'Instagram',
        icon: '📸',
        formats: [
          { id: 'ig-story', name: 'Story', width: 1080, height: 1920, platform: 'Instagram' },
          { id: 'ig-feed', name: 'Feed Post', width: 1080, height: 1080, platform: 'Instagram' },
          { id: 'ig-reel', name: 'Reels', width: 1080, height: 1920, platform: 'Instagram' }
        ]
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: '💼',
        formats: [
          { id: 'ln-post', name: 'Post', width: 1200, height: 628, platform: 'LinkedIn' },
          { id: 'ln-story', name: 'Story', width: 1080, height: 1920, platform: 'LinkedIn' },
          { id: 'ln-carousel', name: 'Carousel', width: 1080, height: 1080, platform: 'LinkedIn' }
        ]
      },
      {
        id: 'youtube',
        name: 'YouTube',
        icon: '🎥',
        formats: [
          { id: 'yt-thumbnail', name: 'Thumbnail', width: 1280, height: 720, platform: 'YouTube' },
          { id: 'yt-banner', name: 'Channel Banner', width: 2560, height: 1440, platform: 'YouTube' },
          { id: 'yt-short', name: 'Shorts', width: 1080, height: 1920, platform: 'YouTube' }
        ]
      }
    ]);
  }, []);

  const handleFormatToggle = (format) => {
    const isSelected = selectedFormats.some(f => f.id === format.id);
    let newFormats;
    
    if (isSelected) {
      newFormats = selectedFormats.filter(f => f.id !== format.id);
    } else {
      newFormats = [...selectedFormats, format];
    }
    
    onFormatChange(newFormats);
  };

  const isFormatSelected = (formatId) => {
    return selectedFormats.some(f => f.id === formatId);
  };

  return (
    <div className="format-selector">
      {platforms.map(platform => (
        <div key={platform.id} className="platform-section">
          <div className="platform-header">
            <span className="platform-icon">{platform.icon}</span>
            <h3 className="platform-name">{platform.name}</h3>
          </div>
          
          <div className="formats-grid">
            {platform.formats.map(format => (
              <div
                key={format.id}
                className={`format-card ${isFormatSelected(format.id) ? 'selected' : ''}`}
                onClick={() => handleFormatToggle(format)}
              >
                <div className="format-checkbox">
                  {isFormatSelected(format.id) && <Check size={16} />}
                </div>
                
                <div className="format-info">
                  <h4 className="format-name">{format.name}</h4>
                  <p className="format-dimensions">{format.width} × {format.height}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {selectedFormats.length > 0 && (
        <div className="selected-summary">
          <p>{selectedFormats.length} formats selected</p>
        </div>
      )}
    </div>
  );
};

export default FormatSelector;
