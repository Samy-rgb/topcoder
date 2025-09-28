import { uploadAPI } from './api';

export const validateFile = (file) => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only PNG and JPEG files are allowed'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 50MB'
    };
  }

  return { isValid: true };
};

export const uploadAsset = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', file.name);

  try {
    const response = await uploadAPI.uploadAsset(formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Upload failed');
  }
};

export const getAssetsList = async (filters = {}) => {
  try {
    const response = await uploadAPI.getAssets(filters);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch assets');
  }
};
