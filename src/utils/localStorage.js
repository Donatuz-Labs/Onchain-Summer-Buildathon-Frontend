export const setLocalStorage = (item, information) => {
	localStorage.setItem(item, information);
};

export const getLocalStorage = (item) => {
	return localStorage.getItem(item);
};

export const removeFromLocalStorage = (item) => {
	localStorage.removeItem(item);
};

export const clearLocalStorage = () => {
	localStorage.clear();
};
