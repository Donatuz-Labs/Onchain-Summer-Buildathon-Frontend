import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loggedIn: false,
	id: "",
	displayName: "",
	userName: "",
	firstName: "",
	lastName: "",
	bio: "",
	email: "",
	role: "",
	height: "",
	dob: "",
	phone: "",
	avatarUrl: "",
	gender: "",
	subscribedCards: [],
	socials: [],
	isCreator: false,
	isLoading: false,
	isErrorProfile: false,
	errorMessage: "",
};

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfile: (state, action) => {
			state.loggedIn = true;
			state.id = action.payload.profile.id;
			state.isCreator = action.payload.profile.isCreator;
			state.subscribedCards =
				action.payload.profile.subscribedCards;
			state.socials = action.payload.profile.socials;
			state.displayName = action.payload.profile.displayName;
			state.userName = action.payload.profile.userName;
			state.firstName = action.payload.profile.firstName;
			state.lastName = action.payload.profile.lastName;
			state.email = action.payload.profile.email;
			state.role = action.payload.profile.role;
			state.height = action.payload.profile.height;
			state.dob = action.payload.profile.dob;
			state.bio = action.payload.profile.bio;
			state.phone = action.payload.profile.phone;
			state.avatarUrl = action.payload.profile.avatarUrl;
			state.isLoadingProfile = false;
			state.isDoneProfile = true;
			state.isErrorProfile = false;
		},
		getProfile: (state) => {
			state.isLoadingProfile = true;
			state.isDoneProfile = false;
			state.isErrorProfile = false;
		},
		getProfileError: (state) => {
			state.isLoadingProfile = false;
			state.isDoneProfile = true;
			state.isErrorProfile = true;
		},
		editProfile: (state) => {
			state.isLoading = true;
			state.isErrorProfile = false;
			state.errorMessage = "";
		},
		editProfileDone: (state) => {
			state.isLoading = false;
		},
		editProfileError: (state, message) => {
			state.isLoading = false;
			state.isErrorProfile = true;
			state.errorMessage = message;
		},
		resetPasswordInit: (state) => {
			state.loading = true;
		},
		resetPasswordSuccess: (state) => {
			state.success = true;
			state.loading = false;
			state.passwordEdited = true;
		},
		resetPasswordError: (state, action) => {
			state.errorMessage = action.payload;
			state.loading = false;
			state.success = false;
		},
		setResetPasswordSuccess: (state, action) => {
			state.resetPasswordSuccess = action.payload;
			state.resetPasswordError = ""; // Reset resetPasswordError on resetPasswordSuccess
		},
		setResetPasswordError: (state, action) => {
			state.resetPasswordSuccess = false; // Reset resetPasswordSuccess on resetPasswordError
			state.resetPasswordError = action.payload;
		},
		resetProfile: () => initialState,
	},
});

export const {
	setProfile,
	getProfile,
	getProfileError,
	editProfile,
	editProfileDone,
	editProfileError,
	resetPasswordError,
	resetPasswordInit,
	resetPasswordSuccess,
	setResetPasswordSuccess,
	setResetPasswordError,
	resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
