import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { toast } from 'react-toastify';
import AIProviderSelector from '../components/generation/AIProviderSelector';
import FormatSelector from '../components/upload/FormatSelector';
import BatchGeneration from '../components/generation/BatchGeneration';
import ProgressTracker from '../components/generation/ProgressTracker';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';
import { generateAssets } from '../services/generation';

const Generation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedAssets] = useState(location.state?.assets || []);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [generationJob, setGenerationJob] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (selectedAssets.length === 0) {
            navigate('/upload');
            return;
        }
    }, [selectedAssets, navigate]);

    const handleFormatChange = (formats) => {
        setSelectedFormats(formats);
        generatePreviews(formats);
    };

    const generatePreviews = (formats) => {
        const newPreviews = [];
        selectedAssets.forEach(asset => {
            formats.forEach(format => {
                newPreviews.push({
                    id: `${asset.id}-${format.id}`,
                    assetId: asset.id,
                    formatId: format.id,
                    assetName: asset.name,
                    formatName: format.name,
                    platformName: format.platform,
                    dimensions: `${format.width}x${format.height}`,
                    previewUrl: asset.thumbnail
                });
            });
        });
        setPreviews(newPreviews);
    };

    const handleGenerateWithAI = async () => {
        if (!selectedProvider) {
            toast.error('Please select an AI provider');
            return;
        }
        if (selectedFormats.length === 0) {
            toast.error('Please select at least one format');
            return;
        }

        setIsGenerating(true);
        try {
            const response = await generateAssets({
                assetIds: selectedAssets.map(a => a.id),
                formatIds: selectedFormats.map(f => f.id),
                providerId: selectedProvider.id,
                settings: { quality: 'high', optimization: true }
            });
            setGenerationJob(response.job);
            toast.success('Asset generation started!');
        } catch (error) {
            toast.error('Failed to start generation: ' + error.message);
            setIsGenerating(false);
        }
    };

    const handleJobComplete = (job) => {
        setIsGenerating(false);
        toast.success(`Generated ${job.completedAssets} assets successfully!`);
        navigate('/downloads', { state: { jobId: job.id, generatedAssets: job.results }});
    };

    return (
        <div className="generation-layout">
            <Header title="AI Asset Generation" />
            <div className="generation-content">
                <Sidebar />
                <main className="main-content">
                    <div className="section">
                        <h2>Selected Assets ({selectedAssets.length})</h2>
                        <div className="asset-grid">
                            {selectedAssets.map(asset => (
                                <div key={asset.id} className="asset-item">
                                    <img src={asset.thumbnail} alt={asset.name} />
                                    <span>{asset.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="section">
                        <h2>Select Platforms and Formats</h2>
                        <FormatSelector selectedFormats={selectedFormats} onFormatChange={handleFormatChange} />
                    </div>

                    {previews.length > 0 && (
                        <div className="section">
                            <h2>Preview Variants ({previews.length})</h2>
                            <div className="preview-grid">
                                {previews.map(preview => (
                                    <div key={preview.id} className="preview-item">
                                        <div className="preview-image">
                                            <img src={preview.previewUrl} alt={preview.formatName} />
                                        </div>
                                        <div className="preview-info">
                                            <span className="format-name">{preview.formatName}</span>
                                            <span className="platform-name">{preview.platformName}</span>
                                            <span className="dimensions">{preview.dimensions}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="section">
                        <AIProviderSelector selectedProvider={selectedProvider} onProviderChange={setSelectedProvider} disabled={isGenerating} />
                    </div>

                    <div className="section generation-controls">
                        <Button onClick={handleGenerateWithAI} disabled={!selectedProvider || selectedFormats.length === 0 || isGenerating} className="generate-button" size="large">
                            <Play size={20} />
                            {isGenerating ? 'Generating...' : 'Generate With AI'}
                        </Button>
                        <div className="generation-summary">
                            <span>{previews.length} variants will be generated</span>
                        </div>
                    </div>

                    {generationJob && (
                        <div className="section">
                            <h2>Generation Progress</h2>
                            <ProgressTracker jobId={generationJob.id} onComplete={handleJobComplete} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Generation;
