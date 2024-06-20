import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { login, signUp } from "../../actions/auth";
import StandardButton from "../shared/StandardButton";
import TextInput from "../shared/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/profile";

import { ROUTES } from "../../utils/routes";

const VerifyOTP = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [otp, setOTP] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const currentUserId = useSelector(
		(state) => state.profile.id
	);
	const setResetPasswordSuccess = useSelector(
		(state) => state.profile.setResetPasswordSuccess
	);
	let email = location.state?.email;
	let password = location.state?.password;
	let action = location.state?.action;

	useEffect(() => {
		if (currentUserId) {
			if (action == "login") {
				navigate(ROUTES.DONE);
			} else if (action == "signup") {
				navigate(ROUTES.USER_DETAILS);
			}
		}
	}, [currentUserId]);

	useEffect(() => {
		if (setResetPasswordSuccess) {
			navigate(ROUTES.LOGIN);
		}
	}, [setResetPasswordSuccess]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (action == "login") {
				dispatch(login({ email, password, otp }));
			} else if (action == "signup") {
				dispatch(signUp({ email, password, otp }));
			} else if (action == "reset-password") {
				dispatch(resetPassword({ email, password, otp }));
			}
		} catch (error) {}

		setIsLoading(false);
	};

	return (
		<div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
			<div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
				<div className="relative flex flex-col items-center w-full md:w-101  md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
					<>
						<div className="text-center md:w-5/6">
							<h1 className="font-bold text-5-5 md:text-7 text-white leading-natural -tracking-0-6 w-full">
								Verify OTP
							</h1>
							<p className="mt-2 font-normal text-center text-3 md:text-3-5 text-white leading-largest -tracking-0-2">
								Enter the OTP Received in the Mail
							</p>
						</div>

						<form
							id="reset-password-form"
							className="w-full mt-5 space-y-3"
							onSubmit={handleSubmit}
						>
							<TextInput
								id="6-digit-otp"
								type="text"
								placeholder="Enter 6 Digit OTP"
								name="otp"
								className="w-full"
								onChange={setOTP}
								value={otp}
							/>

							<div className="text-center">
								<StandardButton
									text="Send OTP"
									type="submit"
									heightStyle="h-12"
									className="w-full h-12 text-4-5 font-medium rounded-2 mt-0 self-center focus:outline-none hover:bg-primary-hover"
								/>
							</div>
						</form>
					</>
				</div>
			</div>
		</div>
	);
};

export default VerifyOTP;
