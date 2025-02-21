import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Set the base URL for your API
    headers: {
        "Content-Type": "application/json"
    },

});

const sendRequest = async(method, url, data = null) => {

    try {
        const response = await axiosInstance({
            method: method,
            url: url,
            data: data,
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            console.error("No refresh token found");
            return null;
        }

        const response = await axiosInstance.post("refresh_token", {
            refresh_token: refreshToken
        });        
        const newAccessToken = response.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("refresh_token");
        return null;
    }
};

// Request Interceptor: Attach token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Axios Error:", error.response ? error.response.data : error.message);
        return Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use(
    (response) => response, // Return response if no errors
    async(error) => {
        const originalRequest = error.config;
    
        if (error.response ?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newToken = await refreshAccessToken();
            if (newToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest); // Retry request with new token
            }
        }

        return Promise.reject(error); // Reject if refresh fails
    }
);

export { sendRequest, axiosInstance };