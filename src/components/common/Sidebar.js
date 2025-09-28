import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Upload, Zap, Download } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/upload', icon: Upload, label: 'Upload Assets' },
    { path: '/generation', icon: Zap, label: 'AI Generation' },
    { path: '/downloads', icon: Download, label: 'Downloads' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
