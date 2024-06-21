// utils/localStorage.js
import { useSelector } from "react-redux";

export function saveToLocalStorage(store) {
	try {
		const serializedStore = JSON.stringify(store.getState());
		window.localStorage.setItem("store", serializedStore);
	} catch (e) {
		console.error("Could not save state to localStorage", e);
	}
}

export function loadFromLocalStorage() {
	try {
		const serializedStore =
			window.localStorage.getItem("store");
		if (serializedStore === null) return undefined;
		return JSON.parse(serializedStore);
	} catch (e) {
		console.error(
			"Could not load state from localStorage",
			e
		);
		return undefined;
	}
}
