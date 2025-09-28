import { generationAPI } from './api';

export const getAIProviders = async () => {
  try {
    const response = await generationAPI.getAIProviders();
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch AI providers');
  }
};

export const generateAssets = async (payload) => {
  try {
    const response = await generationAPI.generateAssets(payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Generation failed');
  }
};

export const getGenerationJob = async (jobId) => {
  try {
    const response = await generationAPI.getGenerationJob(jobId);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch job status');
  }
};
