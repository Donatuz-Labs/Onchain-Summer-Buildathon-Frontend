import axios from "axios";
import humps from "humps";

class ApiClient {
	static apiBaseUrl() {
		return process.env.REACT_APP_SERVER_API_BASE_URL;
	}

	static handleError(error) {
		if (axios.isCancel(error)) {
			// Request cancelled
		} else {
			throw humps.camelizeKeys(error);
		}
	}

	static getHeaders() {
		return {
			Accept: "application/json",
			"Content-Type": "application/json",
		};
	}

	async get(url, params) {
		try {
			const result = await axios.get(
				`${this.constructor.apiBaseUrl()}${url}`,
				{
					headers: this.constructor.getHeaders(),
					params: humps.decamelizeKeys(params),
					withCredentials: true, // Ensure cookies are included
				}
			);
			return humps.camelizeKeys(result.data);
		} catch (error) {
			return ApiClient.handleError(error);
		}
	}

	async post(url, body) {
		try {
			const result = await axios.post(
				`${this.constructor.apiBaseUrl()}${url}`,
				humps.decamelizeKeys(body),
				{
					headers: this.constructor.getHeaders(),
					withCredentials: true, // Ensure cookies are included
				}
			);
			return humps.camelizeKeys(result.data);
		} catch (error) {
			return ApiClient.handleError(error);
		}
	}

	async delete(url, params) {
		try {
			const result = await axios.delete(
				`${this.constructor.apiBaseUrl()}${url}`,
				{
					headers: this.constructor.getHeaders(),
					params: humps.decamelizeKeys(params),
					withCredentials: true, // Ensure cookies are included
				}
			);
			return humps.camelizeKeys(result.data);
		} catch (error) {
			return ApiClient.handleError(error);
		}
	}

	async put(url, body) {
		try {
			const result = await axios.put(
				`${this.constructor.apiBaseUrl()}${url}`,
				humps.decamelizeKeys(body),
				{
					headers: this.constructor.getHeaders(),
					withCredentials: true, // Ensure cookies are included
				}
			);
			return humps.camelizeKeys(result.data);
		} catch (error) {
			return ApiClient.handleError(error);
		}
	}
}

export default ApiClient;
