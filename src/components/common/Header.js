import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../services/auth';
import Button from './Button';

const Header = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">Creative Asset Automation</h1>
          {title && <span className="page-title">{title}</span>}
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <User size={20} />
            <span className="username">{user?.username || 'User'}</span>
            <span className="user-role">{user?.role || 'user'}</span>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="logout-button"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
