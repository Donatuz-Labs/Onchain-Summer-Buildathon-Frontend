import ApiClient from "./ApiClient";
import humps from "humps";

import { getLocalStorage } from "../utils/localStorage";

class ServerApiClient extends ApiClient {
	static headers() {
		const authToken = document.cookie.replace(
			/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
			"$1"
		);

		if (authToken) {
			return {
				Cookie: `authToken=${authToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			};
		} else {
			return {
				Accept: "application/json",
				"Content-Type": "application/json",
			};
		}
	}

	static apiBaseUrl() {
		return process.env.REACT_APP_SERVER_API_BASE_URL;
	}

	static formatParams(params) {
		return humps.decamelizeKeys(params);
	}
}

export default new ServerApiClient();
