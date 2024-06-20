import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/donatuz-logo-white-big.png";
import StandardButton from "../shared/StandardButton.jsx";
import { ROUTES } from "../../utils/routes.js";

const Welcome = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate(ROUTES.REGISTER);
  };

  const handlESignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleLogout = async () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are included in the request
      });

      if (response.ok) {
        // Redirect to login page
        navigate(ROUTES.LOGIN);
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-welcome-small md:bg-welcome bg-cover bg-center items-center justify-start">
      {/* <div className="flex lg:flex-row flex-col items-start justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8"> */}
      <div className="mt-30"></div>
      <img className=" h-20 w-70 md:h-50 md:w-150" src={image} alt="Welcome" />
      <div className="mt-44"></div>
      <div className="px-4-5">
        <h2 className="text-white text-8 font-black mb-6 text-center">
          Let’s get Started
        </h2>
        <p className="text-white text-center mb-6">
          You can Enjoy the Videos of Your Favorite Content Creator and Talk and
          Chat With them
        </p>
      </div>
      <StandardButton
        text="Create Account"
        onClick={handleCreateAccount}
        bgColorStyle="bg-primary"
        heightStyle="h-12"
        textSizeStyle="text-5"
        widthStyle="w-11/12 md:w-50"
        roundedStyle="rounded-2"
        fontFamilyStyle="font-bold"
        otherStyles="mt-5 mx-4"
      />
      <StandardButton
        text="Sign In"
        onClick={handlESignIn}
        bgColorStyle="bg-dark-gray-left-gradient-light"
        heightStyle="h-12"
        textSizeStyle="text-5"
        widthStyle="w-11/12 md:w-50"
        roundedStyle="rounded-2"
        fontFamilyStyle="font-bold"
        otherStyles="mt-3 mx-4"
      />
      <StandardButton
        text="Logout"
        onClick={handleLogout}
        bgColorStyle="bg-dark-gray-left-gradient-light"
        heightStyle="h-12"
        textSizeStyle="text-5"
        widthStyle="w-11/12 md:w-50"
        roundedStyle="rounded-2"
        fontFamilyStyle="font-bold"
        otherStyles="mt-3 mx-4"
      />
      {/* </div> */}
    </div>
  );
};

export default Welcome;
