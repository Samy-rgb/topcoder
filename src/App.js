import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Editor from './pages/Editor';
import Generation from './pages/Generation';
import Downloads from './pages/Downloads';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './services/auth';
import AdminDashboard from './pages/AdminDashboard';

import './styles/globals.css';
import './styles/components.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                        <Route path="/editor/:assetId" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
                        <Route path="/generation" element={<ProtectedRoute><Generation /></ProtectedRoute>} />
                        <Route path="/downloads" element={<ProtectedRoute><Downloads /></ProtectedRoute>} />
                        <Route path="/admin" element={
  <ProtectedRoute>
    <AdminDashboard />
  </ProtectedRoute>
} />
                    </Routes>

                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
