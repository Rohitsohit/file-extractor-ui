// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000',
    ENDPOINTS: {
        UPLOAD: '/upload',
        UPLOAD_LINK: '/upload-link',
    }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 