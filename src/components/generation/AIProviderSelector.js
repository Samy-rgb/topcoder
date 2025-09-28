import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { getAIProviders } from '../../services/generation';

const AIProviderSelector = ({ selectedProvider, onProviderChange, disabled = false }) => {
  const [providers, setProviders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      // Mock providers data
      const mockProviders = [
        {
          id: 'openai',
          name: 'OpenAI DALL-E',
          description: 'Advanced AI image generation',
          icon: '🤖',
          features: ['High Quality', 'Fast Processing'],
          isPremium: true
        },
        {
          id: 'midjourney',
          name: 'Midjourney',
          description: 'Artistic AI image creation',
          icon: '🎨',
          features: ['Artistic Style', 'Creative Output'],
          isPremium: true
        },
        {
          id: 'stable-diffusion',
          name: 'Stable Diffusion',
          description: 'Open source image generation',
          icon: '⚡',
          features: ['Open Source', 'Customizable'],
          isPremium: false
        }
      ];
      
      setProviders(mockProviders);
      
      if (!selectedProvider && mockProviders.length > 0) {
        onProviderChange(mockProviders[0]);
      }
    } catch (error) {
      console.error('Failed to load AI providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSelect = (provider) => {
    onProviderChange(provider);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="ai-provider-selector disabled">
        <div className="provider-button">
          <span>Loading providers...</span>
          <div className="spinner-small"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ai-provider-selector ${disabled ? 'disabled' : ''}`}>
      <label className="provider-label">Select AI Provider</label>
      
      <div className="provider-dropdown">
        <button
          className={`provider-button ${isOpen ? 'open' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <div className="provider-info">
            {selectedProvider ? (
              <>
                <div className="provider-icon">
                  <span>{selectedProvider.icon}</span>
                </div>
                <div className="provider-details">
                  <span className="provider-name">{selectedProvider.name}</span>
                  <span className="provider-description">{selectedProvider.description}</span>
                </div>
              </>
            ) : (
              <span>Select a provider</span>
            )}
          </div>
          <ChevronDown size={20} className={`chevron ${isOpen ? 'rotated' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="provider-options">
            {providers.map(provider => (
              <div
                key={provider.id}
                className={`provider-option ${selectedProvider?.id === provider.id ? 'selected' : ''}`}
                onClick={() => handleProviderSelect(provider)}
              >
                <div className="provider-icon">
                  <span>{provider.icon}</span>
                </div>
                <div className="provider-details">
                  <span className="provider-name">{provider.name}</span>
                  <span className="provider-description">{provider.description}</span>
                  <div className="provider-features">
                    {provider.features.map(feature => (
                      <span key={feature} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
                {provider.isPremium && (
                  <span className="premium-badge">Premium</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIProviderSelector;
