import API from "./AxiosConfig";

export const uploadImageToPinanata = (formData) =>
	API.post(`/pinata/upload`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});
