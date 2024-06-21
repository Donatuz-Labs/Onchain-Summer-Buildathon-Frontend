import React from "react";
import image from "../../assets/mdi_tick-circle.png";
import { useSelector } from "react-redux";

const AllDone = () => {
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);

	return (
		<div className="h-full flex flex-col bg-splash bg-cover bg-center">
			<div className="flex flex-col items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
				<img
					className="flex h-20 w-20 md:h-30 md:w-30 rounded-3"
					src={image}
					alt="AllDone"
				/>
				<h1 className="flex text-center justify-center font-bold text-5-5 md:text-7 text-white leading-natural -tracking-0-6 w-full">
					All Done, {user.displayName}!
				</h1>
				<div className="flex flex-col text-center justify-center text-white mt-5">
					<p>Username: {user?.username}</p>
					<p>Address: {user?.address}</p>
					<p>
						Date of Birth:{" "}
						{new Date(user?.dob).toLocaleDateString()}
					</p>
					<p>
						Smart Wallet address:{" "}
						{`${user?.wallet.slice(0, 10)}...${user?.wallet.slice(
							-10
						)}`}
					</p>
				</div>
				<img
					className="flex h-40 w-40 md:h-60 md:w-60 rounded-full mt-5"
					src={user?.avatar}
					alt="Avatar"
				/>
			</div>
		</div>
	);
};

export default AllDone;
