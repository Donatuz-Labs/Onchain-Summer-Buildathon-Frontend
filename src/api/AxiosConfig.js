import axios from "axios";

const API = axios.create({
	baseURL: process.env.REACT_APP_SERVER_API_BASE_URL,
	withCredentials: true, // Ensure credentials (cookies) are sent with requests
});

API.interceptors.request.use(async (config) => {
	try {
		const authToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("authToken="))
			?.split("=")[1];

		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}
	} catch (error) {
		console.error("Error while setting auth token:", error);
	}
	return config;
});

API.interceptors.response.use(
	(response) => response.data,
	(error) => {
		// Global error handling logic
		throw error;
	}
);

export default API;
