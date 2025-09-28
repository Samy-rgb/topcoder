import React from 'react';
import { Settings, Users, Zap, BarChart } from 'lucide-react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';

const AdminDashboard = () => {
  const adminSections = [
    {
      icon: Settings,
      title: 'Platform Management',
      description: 'Manage supported platforms and formats',
      action: 'Configure Platforms'
    },
    {
      icon: Zap,
      title: 'AI Provider Settings',
      description: 'Configure AI providers and behavior',
      action: 'Manage Providers'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      action: 'View Users'
    },
    {
      icon: BarChart,
      title: 'Analytics',
      description: 'View system usage and performance metrics',
      action: 'View Analytics'
    }
  ];

  return (
    <div className="admin-layout">
      <Header title="Admin Panel" />
      <div className="admin-content">
        <Sidebar />
        <main className="main-content">
          <div className="admin-header">
            <h2>Admin Dashboard</h2>
            <p>Manage platform settings, AI providers, and user accounts</p>
          </div>
          
          <div className="admin-sections">
            {adminSections.map((section, index) => (
              <div key={index} className="admin-card">
                <div className="admin-card-header">
                  <section.icon size={32} className="admin-icon" />
                  <h3>{section.title}</h3>
                </div>
                <p className="admin-card-description">{section.description}</p>
                <Button variant="outline" size="sm">
                  {section.action}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="admin-stats">
            <h3>System Overview</h3>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">156</span>
                <span className="stat-label">Total Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1,245</span>
                <span className="stat-label">Assets Processed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98.5%</span>
                <span className="stat-label">System Uptime</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
