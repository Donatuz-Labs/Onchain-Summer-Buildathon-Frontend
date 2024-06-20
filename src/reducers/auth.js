import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	token: null,
	user: null,
	success: false,
	isLoggedIn: false,
	passwordEdited: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginInit: (state) => {
			state.loading = true;
		},
		loginSuccess: (state) => {
			state.success = true;
			state.loading = false;
			state.isLoggedIn = true;
		},
		loginError: (state) => {
			state.loading = false;
			state.success = false;
			state.isLoggedIn = false;
		},
		verifyTokenInit: (state) => {
			state.loading = true;
		},
		verifyTokenSuccess: (state) => {
			state.success = true;
			state.loading = false;
			state.isLoggedIn = true;
		},
		verifyTokenError: (state) => {
			state.loading = false;
			state.success = false;
			state.isLoggedIn = false;
		},
		logoutSuccess: () => initialState,
	},
});

export const {
	loginInit,
	loginSuccess,
	loginError,
	logoutSuccess,
	verifyTokenInit,
	verifyTokenSuccess,
	verifyTokenError,
} = authSlice.actions;

export default authSlice.reducer;
