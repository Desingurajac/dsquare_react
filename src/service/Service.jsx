import api from "./Api";

export const apiService = {
    get: (url, params = {}) => api.get(url, { params }),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url) => api.delete(url)
};

