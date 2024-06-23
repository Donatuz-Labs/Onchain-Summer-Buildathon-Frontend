import { toast } from "react-toastify";
import * as AuthApi from "../api/AuthRequest";
import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	LOGOUT_START,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	UPDATE_USER_START,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
} from "./ActionTypes";

// Handler function
const handleAsyncAuthAction =
	(
		apiFunction, //LOGIN
		startActionType, //AUTH_START
		successActionType, //AUTH_SUCCESS
		failActionType //AUTH_FAIL
	) =>
	async (dispatch) => {
		dispatch({ type: startActionType });
		console.log("Dispatched start action:", startActionType);

		try {
			const response = await apiFunction();
			dispatch({ type: successActionType, response });
			console.log(
				"Dispatched success action:",
				successActionType,
				"with response:",
				response
			);
			toast.success(successActionType);

			return response;
		} catch (error) {
			dispatch({ type: failActionType });
			console.log("Dispatched fail action:", failActionType);
			toast.error(failActionType);
			throw error;
		}
	};

// Auth actions
export const logIn = (formData) =>
	handleAsyncAuthAction(
		() => AuthApi.logIn(formData),
		AUTH_START,
		AUTH_SUCCESS,
		AUTH_FAIL
	);
export const signUp = (formData) =>
	handleAsyncAuthAction(
		() => AuthApi.signUp(formData),
		AUTH_START,
		AUTH_SUCCESS,
		AUTH_FAIL
	);

// Update user
export const updateUser = (formData) =>
	handleAsyncAuthAction(
		() => AuthApi.updateUser(formData),
		UPDATE_USER_START,
		UPDATE_USER_SUCCESS,
		UPDATE_USER_FAILURE
	);

export const updateUserDp = (formData) =>
	handleAsyncAuthAction(
		() => AuthApi.updateUserDp(formData),
		UPDATE_USER_START,
		UPDATE_USER_SUCCESS,
		UPDATE_USER_FAILURE
	);
