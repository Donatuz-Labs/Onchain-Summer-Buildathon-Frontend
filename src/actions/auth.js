import { toast } from "react-toastify";
import toastConfig from "../utils/toastConfig";
import Cookies from "js-cookie";

import {
	setLocalStorage,
	removeFromLocalStorage,
} from "../utils/localStorage";
import { LOGIN } from "../utils/routes";
import UsersApi from "../api/UsersApi";

import {
	loginInit,
	loginSuccess,
	loginError,
	logoutSuccess,
	verifyTokenInit,
	verifyTokenSuccess,
	verifyTokenError,
} from "../reducers/auth";

import {
	signUpInit,
	signUpSuccess,
	signUpError,
} from "../reducers/signUp";

import { setProfile } from "../reducers/profile";

export const loginAttempt = (data) => async (dispatch) => {
	try {
		dispatch(loginInit());
		const otpResponse = await UsersApi.otpLoginRequest(data);
		dispatch(loginSuccess());
	} catch (ex) {
		dispatch(loginError(ex.message));
		ex.response?.data?.errors?.map((error) => {
			toast.error(`${error.msg}`);
		});
	}
};

export const signUpAttempt = (data) => async (dispatch) => {
	try {
		dispatch(signUpInit());
		const otpResponse = await UsersApi.otpRegisterRequest(
			data
		);

		dispatch(signUpSuccess());
	} catch (ex) {
		dispatch(signUpError(ex.message));
		ex.response?.data?.errors?.map((error) => {
			toast.error(`${error.msg}`);
		});
	}
};

export const login = (info) => async (dispatch) => {
	try {
		dispatch(verifyTokenInit());
		const response = await UsersApi.loginPasswordUser(info);
		dispatch(setProfile({ profile: response.user }));
		toast.success(
			response.message || "Successful verification."
		);
		dispatch(verifyTokenSuccess());
	} catch (ex) {
		toast.error(`${ex.response?.data}`);
	}
};

export const loginSocial = (info) => async (dispatch) => {
	try {
		// dispatch(verifyTokenInit());
		const response = await UsersApi.loginSocialUser(info);
		console.log(response);
		dispatch(setProfile({ profile: response.user }));
		toast.success(
			response.message || "Successful social Login."
		);
		// dispatch(verifyTokenSuccess());
	} catch (ex) {
		if (ex.response?.data?.errors) {
			ex.response?.data?.errors?.map((error) => {
				toast.error(`${error.msg}`);
			});
		} else {
			toast.error(`${ex.response?.data}`);
		}
	}
};

export const signUp = (info) => async (dispatch) => {
	try {
		dispatch(verifyTokenInit());
		const response = await UsersApi.registerPasswordUser(
			info
		);
		dispatch(setProfile({ profile: response.newUser }));

		toast.success(
			response?.message || "Successful verification."
		);
		dispatch(verifyTokenSuccess());
	} catch (ex) {
		if (ex.response?.data?.errors) {
			ex.response?.data?.errors?.map((error) => {
				toast.error(`${error.msg}`);
			});
		} else {
			toast.error(`${ex.response?.data}`);
		}
	}
};

export const signUpSocial = (info) => async (dispatch) => {
	try {
		// dispatch(verifyTokenInit());
		const response = await UsersApi.registerSocialUser(info);
		dispatch(setProfile({ profile: response.newUser }));

		toast.success(
			response?.message || "Successful verification."
		);
		// dispatch(verifyTokenSuccess());
	} catch (ex) {
		if (ex.response?.data?.errors) {
			ex.response?.data?.errors?.map((error) => {
				toast.error(`${error.msg}`);
			});
		} else {
			toast.error(`${ex.response?.data}`);
		}
	}
};

export const logout = () => async (dispatch) => {
	removeFromLocalStorage("token");
	const response = await UsersApi.logout();
	dispatch(logoutSuccess());
};

// export const setUser = () => async (dispatch) => {
// 	try {
// 		const response = await UsersApi.setUserData();

// 		dispatch(setProfile({ profile: response.result }));
// 	} catch (ex) {
// 		toast.error(`${ex.response?.data?.message}`, toastConfig);
// 	}
// };
