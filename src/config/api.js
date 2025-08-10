// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://jow0ntjcq1.execute-api.us-east-2.amazonaws.com/v1',
    ENDPOINTS: {
        EXTRACT: '/extract',
        UPLOAD_LINK: '/upload-link',
    }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 