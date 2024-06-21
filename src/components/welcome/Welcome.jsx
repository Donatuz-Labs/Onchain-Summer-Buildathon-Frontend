import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/donatuz-logo-white-big.png";
import { ROUTES } from "../../utils/routes.js";
import {
	useActiveAccount,
	ConnectButton,
	darkTheme,
} from "thirdweb/react";
import {
	accountAbstraction,
	client,
} from "../../utils/constants.js";
import "./ConnectButton.css";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction.js";
import { getUserByWallet } from "../../api/AuthRequest.js";

const Welcome = () => {
	const navigate = useNavigate();
	const account = useActiveAccount();
	const dispatch = useDispatch();
	useEffect(() => {
		const autoOnboard = async () => {
			if (account) {
				try {
					await getUserByWallet({
						wallet: account.address,
					});
					dispatch(logIn({ wallet: account.address }));
					navigate(ROUTES.DONE);
				} catch (error) {
					dispatch(signUp({ wallet: account.address }));
					navigate(ROUTES.USER_DETAILS);
				}
			}
		};

		autoOnboard();
	}, [account, dispatch, navigate]);
	return (
		<div className="h-full flex flex-col bg-welcome-small md:bg-welcome bg-cover bg-center items-center justify-start">
			<div className="mt-30"></div>
			<img
				className=" h-20 w-70 md:h-50 md:w-150"
				src={image}
				alt="Welcome"
			/>
			<div className="mt-44"></div>
			<div className="px-4-5">
				<h2 className="text-white text-8 font-black mb-6 text-center">
					Let’s get Started
				</h2>
				<p className="text-white text-center mb-6">
					You can Enjoy the Videos of Your Favorite Content
					Creator and Talk and Chat With them
				</p>
			</div>
			<div className="connect-button">
				<ConnectButton
					client={client}
					accountAbstraction={accountAbstraction}
					theme={darkTheme({
						colors: {
							primaryButtonBg:
								"linear-gradient(to right, #666666, #222222)",
							primaryButtonText: "#ededef",
							borderColor: "rgb(67 87 108)",
						},
					})}
					connectButton={{
						label: "Connect",
					}}
					connectModal={{
						size: "compact",
						titleIcon: "",
						showThirdwebBranding: false,
					}}
				/>
			</div>
		</div>
	);
};

export default Welcome;
