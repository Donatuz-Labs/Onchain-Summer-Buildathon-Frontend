import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getUserByUsername } from "../../api/AuthRequest";
import StandardButton from "../shared/StandardButton";
import TextInput from "../shared/TextInput";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import imageBig from "../../assets/unknown-person.png";
import ChevronRight from "../../assets/svg/chevron-right.svg";
import { ROUTES } from "../../utils/routes";
import { toast } from "react-toastify";
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { accountAbstraction, client } from "../../utils/constants.js";
import { updateUser, setTempUserDetails } from "../../actions/AuthAction";

const UserDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameExists, setUsernameExists] = useState(false);

  const wallet = useActiveAccount();

  const [fullName, setFullName] = useState("Bharat Bhusal");
  const [userName, setUserName] = useState("bharatbhusal");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("Nepal");

  const handleUsernameChange = async (value) => {
    try {
      await getUserByUsername({ username: value });
      setUserName(value);
      setUsernameExists(false);
    } catch (error) {
      toast.error("Username already exists");
      setUsernameExists(true);
    }
  };

  const { user } = useSelector(
    (state) => state.authReducer.authData || { user: null }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        wallet: wallet.address,
        username: userName,
        displayName: fullName,
        dob,
        address,
      })
    );
    navigate("/done");
  };

  return (
    <div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
      <div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
        <div className="relative flex flex-col items-center w-full md:w-120  md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
          <div className="flex flex-col justify-center items-center text-center md:w-5/6">
            <h1 className="font-bold text-5-5 md:text-7 text-left text-white leading-natural -tracking-0-6 w-full">
              Welcome, XXXXX !
            </h1>
            <img
              className="mt-8 h-24 w-24 rounded-3 mb-10"
              src={user?.avatar || imageBig}
              alt="Welcome"
              onClick={() => navigate("/select-photo")}
            />
          </div>

          <form
            id="reset-password-form"
            className="w-full mt-5 space-y-3"
            onSubmit={handleSubmit}
          >
            <TextInput
              id="full-name"
              type="text"
              placeholder="Full Name"
              name="full-name"
              className="w-full"
              onChange={setFullName}
              value={fullName}
            />
            <TextInput
              id="user-name"
              type="text"
              placeholder="User Name"
              name="user-name"
              className="w-full"
              onChange={handleUsernameChange}
              value={userName}
            />
            <TextInput
              id="dob"
              type="date"
              placeholder="Enter your DOB (dd/mm/yyyy)"
              name="dob"
              className="w-full"
              onChange={setDob}
              value={dob}
            />

            <TextInput
              id="address"
              type="text"
              placeholder="Address"
              name="address"
              className="w-full"
              onChange={setAddress}
              value={address}
            />

            <div className="text-center flex flex-row space-x-3">
              <div
                onClick={() => navigate(ROUTES.HOME)}
                className="bg-dark-gray-left-gradient-light w-1/2 h-12 text-5 font-medium rounded-2 mt-0 self-center focus:outline-none "
              >
                <button
                  onClick={() => navigate(ROUTES.HOME)}
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
                text="Save"
                disabled={usernameExists}
                type="submit"
                heightStyle="h-12"
                widthStyle="w-1/2"
                textSizeStyle="text-5"
                className="font-medium rounded-2 mt-0 self-center focus:outline-none hover:bg-primary-hover"
              />
            </div>
          </form>

          <div style={{ display: "none" }}>
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
      </div>
    </div>
  );
};

export default UserDetails;
