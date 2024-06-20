import React, {
	useEffect,
	useState,
	useCallback,
	useForm,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { requestPasswordReset } from "../../actions/profile";
import StandardButton from "../shared/StandardButton";
import TextInput from "../shared/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../utils/routes";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RequestPasswordResetPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmedNewPassword, setConfirmedNewPassword] =
		useState("");
	const [isLoading, setIsLoading] = useState(false);

	const errorMessage = useSelector(
		(state) => state.profile.resetPasswordError
	);
	const requestResponse = useSelector(
		(state) => state.profile.resetPasswordSuccess
	);

	useEffect(() => {
		if (requestResponse) {
			navigate(ROUTES.VERIFY_OTP, {
				state: {
					email: email,
					password: newPassword,
					action: "reset-password",
				},
			});
		}
	}, [requestResponse]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (newPassword !== confirmedNewPassword) {
				toast.error("Passwords do not match");
				throw new Error("Passwords do not match");
			}
			dispatch(requestPasswordReset({ email }));
		} catch (error) {}

		setIsLoading(false);
	};

	const handleLoginButton = useCallback(() => {
		navigate(`/login`);
	});

	return (
		<div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
			<div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
				<div className="relative flex flex-col items-center w-full md:w-101  md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
					<>
						<div className="text-center md:w-5/6">
							<h1 className="font-bold text-6 md:text-7 text-white leading-natural -tracking-0-6 w-full">
								Forgot Password
							</h1>
							<p className="mt-2 font-normal text-center text-3 md:text-3-5 text-white leading-largest -tracking-0-2">
								Enter Your Mail to Reset Password
							</p>
						</div>

						<form
							id="reset-password-form"
							className="w-full mt-5 space-y-3"
							onSubmit={onSubmit}
						>
							<TextInput
								id="email"
								type="email"
								placeholder="Enter Your Email"
								name="email"
								className="w-full"
								onChange={setEmail}
								value={email}
							/>
							<TextInput
								id="newPassword"
								type="password"
								placeholder="Enter Your New Password"
								name="newPassword"
								className="w-full"
								onChange={setNewPassword}
								value={newPassword}
							/>
							<TextInput
								id="confirmedNewPassword"
								type="password"
								placeholder="Confirm New Password"
								name="confirmedNewPassword"
								className="w-full"
								onChange={setConfirmedNewPassword}
								value={confirmedNewPassword}
							/>
							<div className="text-center">
								<StandardButton
									text="Send OTP"
									type="submit"
									heightStyle="h-12"
									className="w-full h-12 text-4-5 font-medium rounded-2 mt-0 self-center focus:outline-none hover:bg-primary-hover"
									// disabled={isLoading || !email}
								/>
							</div>
						</form>
					</>
				</div>
			</div>
		</div>
	);
};

export default RequestPasswordResetPage;
