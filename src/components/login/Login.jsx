import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { loginAttempt, loginSocial, signUpSocial } from "../../actions/auth.js";
import image from "../../assets/donatuz-logo-white.png";
import imageBig from "../../assets/donatuz-logo-white-big.png";
import { Link } from "react-router-dom";

import StandardButton from "../shared/StandardButton.jsx";
import TextInput from "../shared/TextInput.jsx";
import Loading from "../shared/Loading.jsx";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROUTES } from "../../utils/routes.js";

import {
  ThirdwebProvider,
  useActiveAccount,
  ConnectButton,
  darkTheme,
  useAuth,
  useActiveWallet,
} from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { accountAbstraction, client } from "../../utils/constants.js";

import "./Login.css";

const Login = () => {
  const wallet = useActiveAccount();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (wallet && !loggedIn) {
      console.log(wallet);
      dispatch(loginSocial({ wallet: wallet.address }));
      //dispatch(signUpSocial({ wallet: wallet.address }));
      setLoggedIn(true);
    }
  }, [wallet]);

  // const [showAddress, setShowAddress] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Required field"),
    password: Yup.string().required("Required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    getFieldState,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const { loading, success } = useSelector(
    (state) => ({
      loading: state.auth.loading,
      success: state.auth.success,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (success && !loading) {
      success &&
        navigate(ROUTES.VERIFY_OTP, {
          state: {
            email: getValues("email"),
            password: getValues("password"),
            action: "login",
          },
        });
    }
  }, [success]);

  useEffect(() => {
    if (wallet) {
      navigate(ROUTES.PHOTO_SELECTOR);
    }
  }, [wallet]);

  const onSubmit = () => {
    if (Object.keys(errors).length === 0) {
      let email = getValues("email");
      let password = getValues("password");

      dispatch(loginAttempt({ email, password }));
    }
  };

  const [isPasswordTypeNewPassword, setIsPasswordTypeNewPassword] =
    useState(true);

  const handleXSignIn = () => {
    // Handle X sign in logic
  };

  const toggleNewPasswordType = useCallback(() => {
    setIsPasswordTypeNewPassword(!isPasswordTypeNewPassword);
  }, [isPasswordTypeNewPassword, setIsPasswordTypeNewPassword]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-full flex justify-center flex-col md:flex-row bg-personal-bg bg-cover bg-center">
          <div className="md:flex justify-center hidden items-center mr-6">
            <img
              className="flex h-50 w-150 rounded-3 justify-center mb-10"
              src={imageBig}
              alt="Welcome"
            />
          </div>
          <div className="flex md:flex-row flex-col items-center justify-center min-h-full px-0 py-12 sm:px-6 md:px-8">
            <div className="md:w-120 md:py-4 px-6 md:rounded-3 md:bg-dark-gray-left-gradient">
              <div className="flex justify-center md:hidden">
                <img
                  className="flex h-22 w-70 rounded-3 justify-center mb-10"
                  src={image}
                  alt="Welcome"
                />
              </div>
              <div>
                <h2 className="text-white text-8 font-black mb-6 text-center">
                  Sign In
                </h2>
                <p className="text-white text-center mb-6">
                  Sign in to manage your content, engage with your community,
                  and monetize
                </p>
              </div>
              <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                  label="email"
                  id="login-email"
                  title=""
                  name="email"
                  type="email"
                  placeholder="Email"
                  showErrorMessage={true}
                  touched={getFieldState("email").isTouched}
                  errorAsPlaceholder={true}
                  error={errors.email}
                  register={register}
                  rules={{
                    required: true,
                  }}
                />
                <TextInput
                  label="password"
                  id="sign-in-password"
                  title=""
                  name="password"
                  placeholder="Password"
                  showErrorMessage={true}
                  touched={getFieldState("password").isTouched}
                  errorAsPlaceholder={true}
                  error={errors.password}
                  register={register}
                  rules={{
                    required: true,
                  }}
                  insideButtonYMargin={"my-4"}
                  withInternalButton={true}
                  internalButtonText={
                    isPasswordTypeNewPassword ? "show" : "hide"
                  }
                  onInternalButtonClick={toggleNewPasswordType}
                  type={isPasswordTypeNewPassword ? "password" : "text"}
                  marginsStyle="mt-3"
                />

                <a
                  href={"/request-reset-password"}
                  className="text-white text-right font-light mt-3 text-4"
                >
                  Forgot Password?
                </a>

                <StandardButton
                  text="Sign In"
                  type="submit"
                  bgColorStyle="bg-primary"
                  heightStyle="h-12"
                  textSizeStyle="text-5"
                  widthStyle="w-full"
                  roundedStyle="rounded-2"
                  fontFamilyStyle="font-bold"
                  hoverStateStyle="hover:bg-blue-button-hover"
                  otherStyles="mt-5"
                />
              </form>

              <div className="flex items-center mt-4 mb-4">
                <hr className="w-full border-gray-400" />
                <p className="mx-4 text-gray-400 font-semibold">or</p>
                <hr className="w-full border-gray-400" />
              </div>

              <div className="login-container">
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
                      label: "Connect with Google",
                    }}
                    connectModal={{
                      size: "compact",
                      titleIcon: "",
                      showThirdwebBranding: false,
                    }}
                  />
                </div>
              </div>
              {/* Sign in with X button */}
              <StandardButton
                text="Connect with X"
                onClick={handleXSignIn}
                className="mt-4"
                bgColorStyle={"bg-dark-gray-left-gradient-light"}
                otherStyles={"border-slate border"}
              />

              <div className="self-center mt-4 font-normal text-3-5 text-white text-center">
                Don’t have an Account Yet?{" "}
                <Link
                  to={"/register"}
                  className="font-bold text-primary"
                  replace
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
