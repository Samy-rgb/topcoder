import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Zap, Download, BarChart3, Plus } from 'lucide-react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { getAssetsList } from '../services/upload';

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const assetsData = await getAssetsList({ limit: 10 });
      setAssets(assetsData.assets || []);
      setStats(assetsData.stats || {});
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color = 'primary' }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon">
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="dashboard-layout">
      <Header title="Dashboard" />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="dashboard-header">
            <h2>Welcome back!</h2>
            <Button onClick={() => navigate('/upload')} size="lg">
              <Plus size={20} />
              Upload New Asset
            </Button>
          </div>

          <div className="stats-grid">
            <StatCard icon={Upload} title="Total Assets" value={stats.totalAssets || 0} color="primary" />
            <StatCard icon={Zap} title="Generated Variants" value={stats.totalVariants || 0} color="success" />
            <StatCard icon={Download} title="Downloads" value={stats.totalDownloads || 0} color="info" />
            <StatCard icon={BarChart3} title="Success Rate" value={`${stats.successRate || 0}%`} color="warning" />
          </div>

          <div className="recent-assets">
            <div className="section-header">
              <h3>Recent Assets</h3>
              <Button variant="outline" onClick={() => navigate('/upload')}>
                View All
              </Button>
            </div>
            
            <div className="assets-grid">
              {assets.map(asset => (
                <div key={asset.id} className="asset-card">
                  <div className="asset-thumbnail">
                    <img src={asset.thumbnail} alt={asset.name} />
                  </div>
                  <div className="asset-info">
                    <h4 className="asset-name">{asset.name}</h4>
                    <p className="asset-date">
                      {new Date(asset.createdAt).toLocaleDateString()}
                    </p>
                    <div className="asset-actions">
                      <Button size="sm" onClick={() => navigate(`/editor/${asset.id}`)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate('/generation', { state: { assets: [asset] } })}>
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {assets.length === 0 && (
              <div className="empty-state">
                <Upload size={48} />
                <h3>No assets yet</h3>
                <p>Upload your first asset to get started</p>
                <Button onClick={() => navigate('/upload')}>
                  Upload Asset
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
