import { toast } from "react-toastify";
import * as UserApi from "../api/UserRequest";
import {
	UPDATE_USER_START,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
} from "./ActionTypes";

// Handler function
const handleAsyncUserAction =
	(
		apiFunction,
		startActionType,
		successActionType,
		failActionType
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

// Update user
export const updateUser = (formData) =>
	handleAsyncUserAction(
		() => UserApi.updateUser(formData),
		UPDATE_USER_START,
		UPDATE_USER_SUCCESS,
		UPDATE_USER_FAILURE
	);

export const updateUserDp = (formData) =>
	handleAsyncUserAction(
		() => UserApi.updateUserDp(formData),
		UPDATE_USER_START,
		UPDATE_USER_SUCCESS,
		UPDATE_USER_FAILURE
	);
