import API from "./AxiosConfig";

// API function for logging in
export const logIn = (formData) =>
	API.post("/auth/login", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// API function for signing up
export const signUp = (formData) =>
	API.post("/auth/signup", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});
