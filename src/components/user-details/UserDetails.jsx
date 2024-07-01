import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUsername } from "../../api/UserRequest";
import StandardButton from "../shared/StandardButton";
import TextInput from "../shared/TextInput";
import { ROUTES } from "../../utils/routes";
import { toast } from "react-toastify";
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { accountAbstraction, client } from "../../utils/constants.js";
import { updateUser } from "../../actions/UserAction";
import ChevronRight from "../../assets/svg/chevron-right.svg";
import { ScaleLoader } from "react-spinners";

const LoadingIndicator = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <ScaleLoader
      color="#514DFB"
      height={46}
      margin={2}
      radius={13}
      width={10}
    />
  </div>
);

const UserDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameExists, setUsernameExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const wallet = useActiveAccount();

  const { user } = useSelector(
    (state) => state.authReducer.authData || { user: {} }
  );

  const [fullName, setFullName] = useState(user?.displayName || "");
  const [userName, setUserName] = useState(user?.username || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [address, setAddress] = useState(user?.address || "");

  useEffect(() => {
    if (user) {
      setFullName(user.displayName || "");
      setUserName(user.username || "");
      setDob(user.dob || "");
      setAddress(user.address || "");
      setIsLoading(false);
    }
  }, [user]);

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

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
      <div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
        <div className="relative flex flex-col items-center w-full md:w-120  md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
          <div className="flex flex-col justify-center items-center text-center md:w-5/6">
            <h1 className="font-bold text-5-5 md:text-7 text-left text-white leading-natural -tracking-0-6 w-full">
              Welcome to Donatuz!!
            </h1>
            <img
              className="mt-8 h-24 w-24 rounded-3 mb-10"
              src={user?.avatar}
              alt="Welcome"
              onClick={() => navigate("/select-photo")}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/path/to/default-avatar.png";
              }}
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
