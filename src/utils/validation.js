import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from './constants';

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 6;
};

export const validateFile = (file) => {
    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
        return {
            isValid: false,
            error: 'Only PNG and JPEG files are supported'
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            isValid: false,
            error: 'File size must be less than 50MB'
        };
    }

    return { isValid: true };
};

export const validateAssetName = (name) => {
    return name && name.trim().length > 0 && name.length <= 100;
};
