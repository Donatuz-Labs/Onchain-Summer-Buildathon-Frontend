import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from 'react-query';
import { ThirdwebProvider } from "thirdweb/react";
import { ToastContainer } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import store from "./config/store.js";
import { ROUTES } from "./utils/routes.js";
//import { accountAbstraction, client } from "./utils/constants.js";
import Splash from "./components/home/Splash.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import Login from "./components/login/Login.jsx";
import SignUp from "./components/sign-up/SignUp.jsx";
import RequestPasswordResetPage from "./components/reset-password/RequestPasswordReset.jsx";
import ResetPasswordPage from "./components/reset-password/ResetPassword.jsx";
import VerifyOTP from "./components/reset-password/VerifyOTP.jsx";
import UserDetails from "./components/user-details/UserDetails.jsx";
import CreatorSocials from "./components/user-details/CreatorSocials.jsx";
import FinalStep from "./components/user-details/FinalStep.jsx";
import PhotoSelector from "./components/user-details/PhotoSelector.jsx";
import CreatorProfile from "./components/creator-profile/CreatorProfile.jsx";
import Feed from "./components/feed/Feed.jsx";
import AllDone from "./components/shared/AllDone.jsx";
import PwdSucessfullyChanged from "./components/shared/PwdSucessfullyChanged.jsx";
import NotFoundPage from "./components/shared/NotFoundPage.jsx";
import HeaderLayout from "./components/header/HeaderLayout.jsx";
import PromptModal from "./components/user-details/PromtModal.jsx";
import ImageSelection from "./components/user-details/ImageSelction.jsx";
import "./index.css";

// const queryClient = new QueryClient();

const App = () => {
  return (
    //<QueryClientProvider client={queryClient}>
    <ThirdwebProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.HOME} element={<Layout />}>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.PHOTO_SELECTOR} element={<PhotoSelector />} />
              <Route path={ROUTES.HOME} element={<Splash />} />
              <Route path={ROUTES.WELCOME} element={<Welcome />} />

              <Route path={ROUTES.REGISTER} element={<SignUp />} />
              <Route
                path={ROUTES.REQUEST_RESET_PASSWORD}
                element={<RequestPasswordResetPage />}
              />
              <Route
                path={ROUTES.RESET_PASSWORD}
                element={<ResetPasswordPage />}
              />
              <Route path={ROUTES.VERIFY_OTP} element={<VerifyOTP />} />
              <Route path={ROUTES.USER_DETAILS} element={<UserDetails />} />
              <Route path={ROUTES.PROFILE} element={<HeaderLayout />}>
                <Route index element={<CreatorProfile />} />
              </Route>
              <Route path={ROUTES.FEED} element={<HeaderLayout />}>
                <Route index element={<Feed />} />
              </Route>
              <Route
                path={ROUTES.CREATOR_SOCIALS}
                element={<CreatorSocials />}
              />
              <Route path={ROUTES.FINAL_STEP} element={<FinalStep />} />

              <Route path={ROUTES.DONE} element={<AllDone />} />
              <Route
                path={ROUTES.PWD_SUCCESSFULLY_CHANGED}
                element={<PwdSucessfullyChanged />}
              />
              <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
              <Route path={ROUTES.PROMPT_MODAL} element={<PromptModal />} />
              <Route
                path={ROUTES.IMAGE_SELECTION}
                element={<ImageSelection />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          bodyClassName={() =>
            "text-white text-semibold flex text-center text-4 md:text-5"
          }
          toastClassName={
            "flex flex-row items-center pl-1 md:pl-4 bg-dark-gray-left-gradient-light border-slate border rounded-2 md:bottom-0 bottom-4 md:left-0 left-4 md:right-0 right-4 md:w-auto w-11/12 justify-center"
          }
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          closeButton={false}
          pauseOnVisibilityChange={false}
          draggable={true}
          pauseOnHover={true}
          position="bottom-center"
        />
      </Provider>
    </ThirdwebProvider>
    //</QueryClientProvider>
  );
};

export default App;

const Layout = () => {
  return <Outlet />;
};
