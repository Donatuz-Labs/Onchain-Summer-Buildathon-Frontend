import API from "./AxiosConfig";

export const updateUser = (formData) =>
	API.put(`/users/update`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const updateUserDp = (formData) =>
	API.put(`/users/update/avatar`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// API function for getting user by wallet
export const getUserByWallet = (formData) =>
	API.post("/users/wallet", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// API function for getting user by username
export const getUserByUsername = (formData) =>
	API.post("/users/username", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});
