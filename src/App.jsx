import React from "react";
import { Provider } from "react-redux";
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
} from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { ToastContainer } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import store from "./store/index.js";
import { ROUTES } from "./utils/routes.js";
import Splash from "./components/home/Splash.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import UserDetails from "./components/user-details/UserDetails.jsx";
import PhotoSelector from "./components/user-details/PhotoSelector.jsx";

import AllDone from "./components/shared/AllDone.jsx";
import NotFoundPage from "./components/shared/NotFoundPage.jsx";
import "./index.css";

const App = () => {
	return (
		<Provider store={store}>
			<ThirdwebProvider>
				<BrowserRouter>
					<Routes>
						<Route path={ROUTES.HOME} element={<Layout />}>
							<Route
								path={ROUTES.PHOTO_SELECTOR}
								element={<PhotoSelector />}
							/>
							<Route path={ROUTES.HOME} element={<Splash />} />
							<Route path={ROUTES.WELCOME} element={<Welcome />} />

							<Route
								path={ROUTES.USER_DETAILS}
								element={<UserDetails />}
							/>
						</Route>

						<Route path={ROUTES.DONE} element={<AllDone />} />

						<Route
							path={ROUTES.NOT_FOUND}
							element={<NotFoundPage />}
						/>
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
			</ThirdwebProvider>
		</Provider>
	);
};

export default App;

const Layout = () => {
	return <Outlet />;
};
