import { toast } from "react-toastify";
import toastConfig from "../utils/toastConfig";

import UsersApi from "../api/UsersApi";

import {
  setProfile,
  editProfile,
  editProfileDone,
  editProfileError,
  setResetPasswordSuccess,
  setResetPasswordError,
  resetProfile,
  getProfile,
  getProfileError,
  resetPasswordSuccess,
  resetPasswordError,
} from "../reducers/profile";

export const getUserByUsername = (username) => async (dispatch) => {
  try {
    dispatch(getProfile());
    const response = await UsersApi.getUserByUsername(username);
    dispatch(getProfileError("username already exists"));
    toast.error(`Username already exists`, toastConfig);
  } catch (ex) {}
};

export const editUser = (profile) => async (dispatch) => {
  try {
    dispatch(editProfile());
    const response = await UsersApi.updateBasicInfo(profile);
    dispatch(editProfileDone());

    dispatch(setProfile({ profile: response }));
    toast.success("Profile updated successfully", toastConfig);
  } catch (ex) {
    console.log(ex);
    dispatch(editProfileError(ex.message));
    if (ex.response?.data?.errors) {
      ex.response?.data?.errors?.map((error) => {
        toast.error(`${error.msg}`);
      });
    } else {
      toast.error(`${ex.response?.data}`);
    }
  }
};

// export const editPassword =
// 	(
// 		userId,
// 		currentPassword,
// 		password,
// 		passwordConfirmation
// 	) =>
// 	async (dispatch) => {
// 		try {
// 			dispatch(editPasswordInit());
// 			await UsersApi.editPassword(
// 				userId,
// 				currentPassword,
// 				password,
// 				passwordConfirmation
// 			);
// 			dispatch(editPasswordSuccess());
// 		} catch (ex) {
// 			console.log("error in profile: " + ex.message);
// 			dispatch(editPasswordError(ex.message));
// 		}
// 	};

export const requestPasswordReset = (data) => async (dispatch) => {
  try {
    const response = await UsersApi.otpPasswordResetRequest(data);
    console.log(response);
    dispatch(resetPasswordSuccess(response));
  } catch (ex) {
    dispatch(resetPasswordError(ex.message));
    if (ex.response?.data?.errors) {
      ex.response?.data?.errors?.map((error) => {
        toast.error(`${error.msg}`);
      });
    } else {
      toast.error(`${ex.response?.data}`);
    }
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await UsersApi.passwordReset(data);

    dispatch(setResetPasswordSuccess(response?.result));
    return response?.result;
  } catch (ex) {
    dispatch(setResetPasswordError(ex.message));
    if (ex.response?.data?.errors) {
      ex.response?.data?.errors?.map((error) => {
        toast.error(`${error.msg}`);
      });
    } else {
      toast.error(`${ex.response?.data}`);
    }
  }
};

export const resetInitialProfile = (data) => async (dispatch) => {
  try {
    dispatch(resetProfile());
  } catch (error) {
    const errorMessage = "Error resetting profile";
    toast.error(errorMessage, toastConfig);
  }
};
