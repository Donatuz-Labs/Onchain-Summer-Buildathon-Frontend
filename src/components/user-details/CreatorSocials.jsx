import React, { useState, useEffect } from "react";
import {
	Link,
	useParams,
	useNavigate,
} from "react-router-dom";
import { resetPassword } from "../../actions/profile";
import StandardButton from "../shared/StandardButton";
import TextInput from "../shared/TextInput";
import onboardingBar2 from "../../assets/onboarding-bar-2.png";
import onboardingBar3 from "../../assets/onboarding-bar-3.png";

import ChevronRight from "../../assets/svg/chevron-right.svg";

const CreatorSocials = () => {
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	let { token } = useParams();
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// const errorMessage = useSelector((state) => state.profile.resetPasswordError);
	// const requestResponse = useSelector((state) => state.profile.resetPasswordSuccess);

	useEffect(() => {
		// if (!token) {
		//   navigate('/login')
		// }
	}, [token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// dispatch(resetPassword({newPassword: password, token}));
			// setRequestResponse(response.message);
		} catch (error) {
			// setErrorMessage(error.message);
		}

		setIsLoading(false);
	};

	const [youtubeProfile, setYoutubeProfile] = useState("");
	const [igProfile, setIGProfile] = useState("");
	const [xProfile, setXProfile] = useState("");

	return (
		<div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
			<div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
				<div className="relative flex flex-col items-center w-full md:w-120  md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
					<>
						<div className="flex flex-col justify-center items-center text-center md:w-5/6">
							<h1 className="font-bold text-5-5 md:text-7 text-center text-white leading-natural -tracking-0-6 w-full">
								Connect Your Socials
							</h1>
							<p className="text-white text-center mb-6">
								Link Your Youtube, Instagram and X (Twitter)
								Accounts
							</p>
						</div>

						<div className="flex flex-col justify-end items-end text-right w-full">
							<StandardButton
								text="Skip for now"
								type="skip"
								onClick={() => navigate(`/final-step`)}
								heightStyle="h-8"
								widthStyle=""
								textSizeStyle="text-3-5"
								otherStyles=" px-2 font-medium rounded-2 mt-0"
							/>
						</div>

						<form
							id="reset-password-form"
							className="w-full mt-8 space-y-3"
							onSubmit={handleSubmit}
						>
							<TextInput
								id="youtube-profile"
								type="text"
								placeholder="Youtube Profile Link"
								name="youtube-profile"
								className="w-full"
								onChange={setYoutubeProfile}
								value={youtubeProfile}
							/>
							<TextInput
								id="ig-profile"
								type="text"
								placeholder="Instagram Profile Link"
								name="ig-profile"
								className="w-full"
								onChange={setIGProfile}
								value={igProfile}
							/>
							<TextInput
								id="x-profile"
								type="text"
								placeholder="X (Twitter) Profile Link"
								name="x-profile"
								className="w-full"
								onChange={setXProfile}
								value={xProfile}
							/>

							<div className="text-center flex flex-row space-x-3">
								<div
									onClick={() => navigate(`/user-details`)}
									className="bg-dark-gray-left-gradient-light w-1/2 h-12 text-5 font-medium rounded-2 mt-0 self-center focus:outline-none "
								>
									<button
										onClick={() => navigate(`/user-details`)}
										className="inline-flex justify-center items-center mt-2 space-x-1"
									>
										<img
											className="inline h-3-5 fill-white text-white mt-1"
											src={ChevronRight}
											alt={"arrow-logo"}
										/>
										<span className="text-left text-white font-semibold text-5">
											Back
										</span>
									</button>
								</div>
								<StandardButton
									text="Next"
									type="next"
									onClick={() => navigate(`/final-step`)}
									heightStyle="h-12"
									widthStyle="w-1/2"
									textSizeStyle="text-5"
									className="font-medium rounded-2 mt-0 self-center focus:outline-none hover:bg-primary-hover"
								/>
							</div>
						</form>
						<img
							className="flex h-2 w-16 rounded-3 justify-center my-6"
							src={onboardingBar2}
							alt="onboardingBar2"
						/>
					</>
				</div>
			</div>
		</div>
	);
};

export default CreatorSocials;
