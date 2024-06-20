import ServerApiClient from "./ServerApiClient";
import { ENDPOINTS } from "../utils/api-routes";

class UsersApi {
	static async registerPasswordUser(info) {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.REGISTER_PASSWORD_USER}`,
			info
		);

		return response;
	}
	static async registerSocialUser(info) {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.REGISTER_SOCIAL_USER}`,
			info
		);

		return response;
	}

	static async loginPasswordUser(info) {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.LOGIN_PASSWORD_USER}`,
			info
		);
		return response;
	}
	static async loginSocialUser(info) {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.LOGIN_SOCIAL_USER}`,
			info
		);
		return response;
	}

	static async otpLoginRequest(info) {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.OTP_LOGIN_REQUEST}`,
			info
		);
		const result = response.data;
		return result;
	}

	static async otpRegisterRequest(info) {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.OTP_REGISTER_REQUEST}`,
			info
		);
		const result = response.data;
		return result;
	}

	static async otpPasswordResetRequest(info) {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.OTP_PASSWORD_RESET_REQUEST}`,
			info
		);
		return response;
	}
	static async passwordReset(info) {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.PASSWORD_RESET}`,
			info
		);
		console.log(response);
		return response;
	}

	static async logout() {
		const response = await ServerApiClient.post(
			`${ENDPOINTS.LOGOUT}`
		);
		const result = response.data;
		return result;
	}

	static async getUserByUsername(username) {
		const response = await ServerApiClient.get(
			`${ENDPOINTS.USER_BY_USERNAME}/${username}`
		);

		return response;
	}

	static async updateBasicInfo(info) {
		const response = await ServerApiClient.put(
			`${ENDPOINTS.UPDATE_BASIC_INFO}`,
			info
		);
		return response;
	}

	// Uncomment and refactor other methods as needed
	// static async verifyToken() {
	//     const response = await ServerApiClient.get(
	//         VERIFY_TOKEN_PATH
	//     );
	//     const { result } = response;
	//     return result;
	// }

	// static async editPassword(userId, currentPassword, password, passwordConfirmation) {
	//     const response = await ServerApiClient.put(
	//         `${SIGNUP_PATH}${userId}${PASSWORD_PATH}`,
	//         {
	//             currentPassword,
	//             password,
	//             passwordConfirmation,
	//         }
	//     );
	//     const { result } = response;
	//     return result;
	// }

	// static async editProfile(userId, profile) {
	//     const response = await ServerApiClient.put(
	//         `/users/${userId}`,
	//         profile
	//     );
	//     const result = response.data;
	//     return result;
	// }

	// static async setUserData() {
	//     const response = await ServerApiClient.get(
	//         `${LOGGED_PATH}`
	//     );
	//     const data = response.data;
	//     return data;
	// }

	// static async requestPasswordReset(info) {
	//     const response = await ServerApiClient.post(
	//         `${RESET_PASSWORD_REQUEST_PATH}`,
	//         info
	//     );
	//     const result = response.data;
	//     return result;
	// }

	// static async resetPassword(info) {
	//     const response = await ServerApiClient.post(
	//         `${RESET_PASSWORD_PATH}`,
	//         info
	//     );
	//     const result = response.data;
	//     return result;
	// }

	// static async verifyOTP(info) {
	//     const response = await ServerApiClient.post(
	//         `${OTP_VERIFY_PATH}`,
	//         info
	//     );
	//     const result = response.data;
	//     return result;
	// }

	// static async requestOTP(info) {
	//     const response = await ServerApiClient.post(
	//         `${OTP_REQUEST_PATH}`,
	//         info
	//     );
	//     const result = response.data;
	//     return result;
	// }
}

export default UsersApi;
