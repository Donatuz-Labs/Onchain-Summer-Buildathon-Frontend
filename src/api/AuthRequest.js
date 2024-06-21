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
	API.put(`/auth/update`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const updateUserDp = (formData) =>
	API.put(`/auth/update/dp`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const generateImage = (formData) =>
	API.post(`/auth/generate-image`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const fetchImage = (formData) =>
	API.post(`/auth/fetch-image`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const uploadImageToPinanata = (formData) =>
	API.post(`/auth/upload-to-pinata`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// API function for logging out
export const logOut = () =>
	API.post("/auth/logout")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});

// ================ Not in Actions ===================== //
// API function for getting user by wallet
export const getUserByWallet = (formData) =>
	API.post("/auth/get-user-by-wallet", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// API function for getting user by username
export const getUserByUsername = (formData) =>
	API.post("/auth/get-user-by-username", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});
