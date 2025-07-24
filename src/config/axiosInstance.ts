import axios from 'axios';

import { getLocalStorage } from '@/utils/localStorage.js';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar el token dinámicamente
api.interceptors.request.use(
    (config) => {
        const token = getLocalStorage('token');
        if (token) {
            // Aseguramos que headers exista
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;