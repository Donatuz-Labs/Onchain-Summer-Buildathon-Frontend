import React, {
	useState,
	useCallback,
	useEffect,
} from "react";
import {
	Link,
	useParams,
	useNavigate,
} from "react-router-dom";
import { resetPassword } from "../../actions/profile";
import StandardButton from "../shared/StandardButton";
import TextInput from "../shared/TextInput";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// let { token } = useParams();
	// const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const errorMessage = useSelector(
		(state) => state.profile.resetPasswordError
	);
	const requestResponse = useSelector(
		(state) => state.profile.resetPasswordSuccess
	);

	// useEffect(() => {
	// if (!token) {
	//   navigate('/login')
	// }
	// }, [token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			dispatch(resetPassword({ newPassword: newPassword }));
			// setRequestResponse(response.message);
		} catch (error) {
			// setErrorMessage(error.message);
		}

		setIsLoading(false);
	};

	const [newPassword, setNewPassword] = useState("");

	const [
		isPasswordTypeNewPassword,
		setIsPasswordTypeNewPassword,
	] = useState(true);

	const toggleNewPasswordType = useCallback(() => {
		setIsPasswordTypeNewPassword(!isPasswordTypeNewPassword);
	}, [
		isPasswordTypeNewPassword,
		setIsPasswordTypeNewPassword,
	]);

	return (
		<div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
			<div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
				<div className="relative flex flex-col items-center w-full md:w-101  md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
					<>
						<div className="text-center md:w-5/6">
							<h1 className="font-bold text-5-5 md:text-7 text-white leading-natural -tracking-0-6 w-full">
								New Password
							</h1>
							<p className="mt-2 font-normal text-center text-3 md:text-3-5 text-white leading-largest -tracking-0-2">
								Enter Your New Password
							</p>
						</div>

						<form
							id="reset-password-form"
							className="w-full mt-5 space-y-3"
							onSubmit={handleSubmit}
						>
							<TextInput
								id="newPassword"
								type="newPassword"
								placeholder="Enter Your New Passoword"
								name="newPassword"
								className="w-full"
								onChange={setNewPassword}
								value={newPassword}
							/>
							<div className="text-center">
								<StandardButton
									text="Change Password"
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

export default ResetPasswordPage;
