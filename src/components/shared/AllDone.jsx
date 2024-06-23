import React from "react";
import { useSelector } from "react-redux";

const AllDone = () => {
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);
	return (
		<div className="h-full flex flex-col bg-splash bg-cover bg-center">
			<div className="flex flex-col items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
				<img
					className="flex h-40 w-40 md:h-60 md:w-60 rounded-full mt-5"
					src={user?.avatar}
					alt="Avatar"
				/>
				<h1 className="flex text-center justify-center font-bold text-5-5 md:text-7 text-white leading-natural -tracking-0-6 w-full">
					All Done, {user.displayName}!
				</h1>
				<br />
				<h2 className="flex text-center justify-center font-bold text-5-5 md:text-7 text-white leading-natural -tracking-0-6 w-full">
					Welcome to Donatuz
				</h2>
			</div>
		</div>
	);
};

export default AllDone;
