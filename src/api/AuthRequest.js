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

export const generateImage = (formData) =>
	API.post(`/ai/generate`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const uploadImageToPinanata = (formData) =>
	API.post(`/pinata/upload`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// ================ Not in Actions ===================== //
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
