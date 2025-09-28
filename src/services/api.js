import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

export const uploadAPI = {
  uploadAsset: (formData) => api.post('/assets/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAssets: (params) => api.get('/assets', { params }),
  getAssetById: (id) => api.get(`/assets/${id}`),
  deleteAsset: (id) => api.delete(`/assets/${id}`),
};

export const generationAPI = {
  getAIProviders: () => api.get('/generation/providers'),
  getPlatforms: () => api.get('/platforms'),
  getFormats: (platformId) => api.get(`/platforms/${platformId}/formats`),
  generateAssets: (payload) => api.post('/generation/generate', payload),
  getGenerationJob: (jobId) => api.get(`/generation/jobs/${jobId}`),
  saveAssetMetadata: (assetId, metadata) => api.put(`/assets/${assetId}/metadata`, metadata),
};

export const downloadAPI = {
  downloadAsset: (assetId, formatId) => api.get(`/assets/${assetId}/download/${formatId}`, {
    responseType: 'blob'
  }),
  downloadBulk: (assetIds) => api.post('/assets/download/bulk', { assetIds }, {
    responseType: 'blob'
  }),
  getDownloadHistory: () => api.get('/downloads/history'),
};

export default api;
