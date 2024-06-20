import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	user: null,
	success: false,
};

export const signUpSlice = createSlice({
	name: "signUp",
	initialState,
	reducers: {
		signUpInit: (state) => {
			state.loading = true;
		},
		signUpSuccess: (state) => {
			state.success = true;
			state.error = false;
			state.loading = false;
		},
		signUpError: (state) => {
			state.loading = false;
			state.success = false;
		},
	},
});

export const { signUpInit, signUpSuccess, signUpError } =
	signUpSlice.actions;

export default signUpSlice.reducer;
