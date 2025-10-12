import axios from 'axios';

export const axiosConfig = {
	baseURL: 'https://dummyjson.com',
	headers: { 'Content-Type': 'application/json' },
};

export const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
	async config => {
		const token = localStorage.getItem('token');

		if (token) config.headers.Authorization = `Bearer ${token}`;

		return config;
	},
	error => Promise.reject(error.response)
);

export default axiosInstance;
