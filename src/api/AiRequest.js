import API from "./AxiosConfig";

export const generateImage = (formData) =>
	API.post(`/ai/generate`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});
