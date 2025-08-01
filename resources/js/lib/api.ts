import axios, { isAxiosError } from 'axios';
import Cookies from 'universal-cookie';

const api = axios.create();
const cookies = new Cookies();

api.interceptors.request.use(async function (config) {
	const token = cookies.get('token');
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

api.interceptors.response.use(
	function (config) {
		return config;
	},
	function (error) {
		if (isAxiosError(error) && error.response?.status === 401) {
			cookies.remove('token');
			alert('Session expired, please re-login to continue!');
			window.location.replace('/admin/login');
			return Promise.reject(error);
		}

		return Promise.reject(error);
	}
);

export default api;
