import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-dark-gray-left-gradient bg-blue-500">
			<div className="flex justify-center items-center bg-blue-700 rounded-full w-24 h-24 mb-6">
				{/* You can add an icon or image here */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-12 w-12 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={5}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
			<h1 className="text-4xl font-bold mb-3 text-white">
				Are you lost?
			</h1>
			<p className="text-lg mb-8 text-white">
				This page does not exist.
			</p>
			<Link
				to="/"
				className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:text-primary"
			>
				Go Home
			</Link>
		</div>
	);
};

export default NotFoundPage;
