import React, { useState, useEffect } from "react";
import {
	Link,
	useParams,
	useNavigate,
} from "react-router-dom";
import {
	editUser,
	getUserByUsername,
} from "../../actions/profile";
import StandardButton from "../shared/StandardButton";
import TextInput from "../shared/TextInput";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import imageBig from "../../assets/unknown-person.png";
import ChevronRight from "../../assets/svg/chevron-right.svg";
import { ROUTES } from "../../utils/routes";

const UserDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleCountrySelect = (selectedOption) => {
		console.log("Selected Country:", selectedOption);

		setSelectedCountry(selectedOption);
	};

	const currentUserId = useSelector(
		(state) => state.profile.id
	);

	// State to hold the selected country
	const [selectedCountry, setSelectedCountry] =
		useState("Nepal");
	const countries = [
		{ label: "Afghanistan", value: "Afghanistan" },
		{ label: "Albania", value: "Albania" },
		{ label: "Algeria", value: "Algeria" },
		{ label: "American Samoa", value: "American Samoa" },
		{ label: "Andorra", value: "Andorra" },
		{ label: "Angola", value: "Angola" },
		{ label: "Anguilla", value: "Anguilla" },
		{ label: "Antarctica", value: "Antarctica" },
		{
			label: "Antigua and Barbuda",
			value: "Antigua and Barbuda",
		},
		{ label: "Argentina", value: "Argentina" },
		{ label: "Armenia", value: "Armenia" },
		{ label: "Aruba", value: "Aruba" },
		{ label: "Australia", value: "Australia" },
		{ label: "Austria", value: "Austria" },
		{ label: "Azerbaijan", value: "Azerbaijan" },
		{ label: "Bahamas (the)", value: "Bahamas (the)" },
		{ label: "Bahrain", value: "Bahrain" },
		{ label: "Bangladesh", value: "Bangladesh" },
		{ label: "Barbados", value: "Barbados" },
		{ label: "Belarus", value: "Belarus" },
		{ label: "Belgium", value: "Belgium" },
		{ label: "Belize", value: "Belize" },
		{ label: "Benin", value: "Benin" },
		{ label: "Bermuda", value: "Bermuda" },
		{ label: "Bhutan", value: "Bhutan" },
		{
			label: "Bolivia (Plurinational State of)",
			value: "Bolivia (Plurinational State of)",
		},
		{
			label: "Bonaire, Sint Eustatius and Saba",
			value: "Bonaire, Sint Eustatius and Saba",
		},
		{
			label: "Bosnia and Herzegovina",
			value: "Bosnia and Herzegovina",
		},
		{ label: "Botswana", value: "Botswana" },
		{ label: "Bouvet Island", value: "Bouvet Island" },
		{ label: "Brazil", value: "Brazil" },
		{
			label: "British Indian Ocean Territory (the)",
			value: "British Indian Ocean Territory (the)",
		},
		{
			label: "Brunei Darussalam",
			value: "Brunei Darussalam",
		},
		{ label: "Bulgaria", value: "Bulgaria" },
		{ label: "Burkina Faso", value: "Burkina Faso" },
		{ label: "Burundi", value: "Burundi" },
		{ label: "Cabo Verde", value: "Cabo Verde" },
		{ label: "Cambodia", value: "Cambodia" },
		{ label: "Cameroon", value: "Cameroon" },
		{ label: "Canada", value: "Canada" },
		{
			label: "Cayman Islands (the)",
			value: "Cayman Islands (the)",
		},
		{
			label: "Central African Republic (the)",
			value: "Central African Republic (the)",
		},
		{ label: "Chad", value: "Chad" },
		{ label: "Chile", value: "Chile" },
		{ label: "China", value: "China" },
		{ label: "Christmas Island", value: "Christmas Island" },
		{
			label: "Cocos (Keeling) Islands (the)",
			value: "Cocos (Keeling) Islands (the)",
		},
		{ label: "Colombia", value: "Colombia" },
		{ label: "Comoros (the)", value: "Comoros (the)" },
		{
			label: "Congo (the Democratic Republic of the)",
			value: "Congo (the Democratic Republic of the)",
		},
		{ label: "Congo (the)", value: "Congo (the)" },
		{
			label: "Cook Islands (the)",
			value: "Cook Islands (the)",
		},
		{ label: "Costa Rica", value: "Costa Rica" },
		{ label: "Croatia", value: "Croatia" },
		{ label: "Cuba", value: "Cuba" },
		{ label: "Curaçao", value: "Curaçao" },
		{ label: "Cyprus", value: "Cyprus" },
		{ label: "Czechia", value: "Czechia" },
		{ label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
		{ label: "Denmark", value: "Denmark" },
		{ label: "Djibouti", value: "Djibouti" },
		{ label: "Dominica", value: "Dominica" },
		{
			label: "Dominican Republic (the)",
			value: "Dominican Republic (the)",
		},
		{ label: "Ecuador", value: "Ecuador" },
		{ label: "Egypt", value: "Egypt" },
		{ label: "El Salvador", value: "El Salvador" },
		{
			label: "Equatorial Guinea",
			value: "Equatorial Guinea",
		},
		{ label: "Eritrea", value: "Eritrea" },
		{ label: "Estonia", value: "Estonia" },
		{ label: "Eswatini", value: "Eswatini" },
		{ label: "Ethiopia", value: "Ethiopia" },
		{
			label: "Falkland Islands (the) [Malvinas]",
			value: "Falkland Islands (the) [Malvinas]",
		},
		{
			label: "Faroe Islands (the)",
			value: "Faroe Islands (the)",
		},
		{ label: "Fiji", value: "Fiji" },
		{ label: "Finland", value: "Finland" },
		{ label: "France", value: "France" },
		{ label: "French Guiana", value: "French Guiana" },
		{ label: "French Polynesia", value: "French Polynesia" },
		{
			label: "French Southern Territories (the)",
			value: "French Southern Territories (the)",
		},
		{ label: "Gabon", value: "Gabon" },
		{ label: "Gambia (the)", value: "Gambia (the)" },
		{ label: "Georgia", value: "Georgia" },
		{ label: "Germany", value: "Germany" },
		{ label: "Ghana", value: "Ghana" },
		{ label: "Gibraltar", value: "Gibraltar" },
		{ label: "Greece", value: "Greece" },
		{ label: "Greenland", value: "Greenland" },
		{ label: "Grenada", value: "Grenada" },
		{ label: "Guadeloupe", value: "Guadeloupe" },
		{ label: "Guam", value: "Guam" },
		{ label: "Guatemala", value: "Guatemala" },
		{ label: "Guernsey", value: "Guernsey" },
		{ label: "Guinea", value: "Guinea" },
		{ label: "Guinea-Bissau", value: "Guinea-Bissau" },
		{ label: "Guyana", value: "Guyana" },
		{ label: "Haiti", value: "Haiti" },
		{
			label: "Heard Island and McDonald Islands",
			value: "Heard Island and McDonald Islands",
		},
		{ label: "Holy See (the)", value: "Holy See (the)" },
		{ label: "Honduras", value: "Honduras" },
		{ label: "Hong Kong", value: "Hong Kong" },
		{ label: "Hungary", value: "Hungary" },
		{ label: "Iceland", value: "Iceland" },
		{ label: "India", value: "India" },
		{ label: "Indonesia", value: "Indonesia" },
		{
			label: "Iran (Islamic Republic of)",
			value: "Iran (Islamic Republic of)",
		},
		{ label: "Iraq", value: "Iraq" },
		{ label: "Ireland", value: "Ireland" },
		{ label: "Isle of Man", value: "Isle of Man" },
		{ label: "Israel", value: "Israel" },
		{ label: "Italy", value: "Italy" },
		{ label: "Jamaica", value: "Jamaica" },
		{ label: "Japan", value: "Japan" },
		{ label: "Jersey", value: "Jersey" },
		{ label: "Jordan", value: "Jordan" },
		{ label: "Kazakhstan", value: "Kazakhstan" },
		{ label: "Kenya", value: "Kenya" },
		{ label: "Kiribati", value: "Kiribati" },
		{
			label: "Korea (the Democratic People's Republic of)",
			value: "Korea (the Democratic People's Republic of)",
		},
		{
			label: "Korea (the Republic of)",
			value: "Korea (the Republic of)",
		},
		{ label: "Kuwait", value: "Kuwait" },
		{ label: "Kyrgyzstan", value: "Kyrgyzstan" },
		{
			label: "Lao People's Democratic Republic (the)",
			value: "Lao People's Democratic Republic (the)",
		},
		{ label: "Latvia", value: "Latvia" },
		{ label: "Lebanon", value: "Lebanon" },
		{ label: "Lesotho", value: "Lesotho" },
		{ label: "Liberia", value: "Liberia" },
		{ label: "Libya", value: "Libya" },
		{ label: "Liechtenstein", value: "Liechtenstein" },
		{ label: "Lithuania", value: "Lithuania" },
		{ label: "Luxembourg", value: "Luxembourg" },
		{ label: "Macao", value: "Macao" },
		{ label: "Madagascar", value: "Madagascar" },
		{ label: "Malawi", value: "Malawi" },
		{ label: "Malaysia", value: "Malaysia" },
		{ label: "Maldives", value: "Maldives" },
		{ label: "Mali", value: "Mali" },
		{ label: "Malta", value: "Malta" },
		{
			label: "Marshall Islands (the)",
			value: "Marshall Islands (the)",
		},
		{ label: "Martinique", value: "Martinique" },
		{ label: "Mauritania", value: "Mauritania" },
		{ label: "Mauritius", value: "Mauritius" },
		{ label: "Mayotte", value: "Mayotte" },
		{ label: "Mexico", value: "Mexico" },
		{
			label: "Micronesia (Federated States of)",
			value: "Micronesia (Federated States of)",
		},
		{
			label: "Moldova (the Republic of)",
			value: "Moldova (the Republic of)",
		},
		{ label: "Monaco", value: "Monaco" },
		{ label: "Mongolia", value: "Mongolia" },
		{ label: "Montenegro", value: "Montenegro" },
		{ label: "Montserrat", value: "Montserrat" },
		{ label: "Morocco", value: "Morocco" },
		{ label: "Mozambique", value: "Mozambique" },
		{ label: "Myanmar", value: "Myanmar" },
		{ label: "Namibia", value: "Namibia" },
		{ label: "Nauru", value: "Nauru" },
		{ label: "Nepal", value: "Nepal" },
		{
			label: "Netherlands (the)",
			value: "Netherlands (the)",
		},
		{ label: "New Caledonia", value: "New Caledonia" },
		{ label: "New Zealand", value: "New Zealand" },
		{ label: "Nicaragua", value: "Nicaragua" },
		{ label: "Niger (the)", value: "Niger (the)" },
		{ label: "Nigeria", value: "Nigeria" },
		{ label: "Niue", value: "Niue" },
		{ label: "Norfolk Island", value: "Norfolk Island" },
		{
			label: "Northern Mariana Islands (the)",
			value: "Northern Mariana Islands (the)",
		},
		{ label: "Norway", value: "Norway" },
		{ label: "Oman", value: "Oman" },
		{ label: "Pakistan", value: "Pakistan" },
		{ label: "Palau", value: "Palau" },
		{
			label: "Palestine, State of",
			value: "Palestine, State of",
		},
		{ label: "Panama", value: "Panama" },
		{ label: "Papua New Guinea", value: "Papua New Guinea" },
		{ label: "Paraguay", value: "Paraguay" },
		{ label: "Peru", value: "Peru" },
		{
			label: "Philippines (the)",
			value: "Philippines (the)",
		},
		{ label: "Pitcairn", value: "Pitcairn" },
		{ label: "Poland", value: "Poland" },
		{ label: "Portugal", value: "Portugal" },
		{ label: "Puerto Rico", value: "Puerto Rico" },
		{ label: "Qatar", value: "Qatar" },
		{
			label: "Republic of North Macedonia",
			value: "Republic of North Macedonia",
		},
		{ label: "Romania", value: "Romania" },
		{
			label: "Russian Federation (the)",
			value: "Russian Federation (the)",
		},
		{ label: "Rwanda", value: "Rwanda" },
		{ label: "Réunion", value: "Réunion" },
		{ label: "Saint Barthélemy", value: "Saint Barthélemy" },
		{
			label: "Saint Helena, Ascension and Tristan da Cunha",
			value: "Saint Helena, Ascension and Tristan da Cunha",
		},
		{
			label: "Saint Kitts and Nevis",
			value: "Saint Kitts and Nevis",
		},
		{ label: "Saint Lucia", value: "Saint Lucia" },
		{
			label: "Saint Martin (French part)",
			value: "Saint Martin (French part)",
		},
		{
			label: "Saint Pierre and Miquelon",
			value: "Saint Pierre and Miquelon",
		},
		{
			label: "Saint Vincent and the Grenadines",
			value: "Saint Vincent and the Grenadines",
		},
		{ label: "Samoa", value: "Samoa" },
		{ label: "San Marino", value: "San Marino" },
		{
			label: "Sao Tome and Principe",
			value: "Sao Tome and Principe",
		},
		{ label: "Saudi Arabia", value: "Saudi Arabia" },
		{ label: "Senegal", value: "Senegal" },
		{ label: "Serbia", value: "Serbia" },
		{ label: "Seychelles", value: "Seychelles" },
		{ label: "Sierra Leone", value: "Sierra Leone" },
		{ label: "Singapore", value: "Singapore" },
		{
			label: "Sint Maarten (Dutch part)",
			value: "Sint Maarten (Dutch part)",
		},
		{ label: "Slovakia", value: "Slovakia" },
		{ label: "Slovenia", value: "Slovenia" },
		{ label: "Solomon Islands", value: "Solomon Islands" },
		{ label: "Somalia", value: "Somalia" },
		{ label: "South Africa", value: "South Africa" },
		{
			label: "South Georgia and the South Sandwich Islands",
			value: "South Georgia and the South Sandwich Islands",
		},
		{ label: "South Sudan", value: "South Sudan" },
		{ label: "Spain", value: "Spain" },
		{ label: "Sri Lanka", value: "Sri Lanka" },
		{ label: "Sudan (the)", value: "Sudan (the)" },
		{ label: "Suriname", value: "Suriname" },
		{
			label: "Svalbard and Jan Mayen",
			value: "Svalbard and Jan Mayen",
		},
		{ label: "Sweden", value: "Sweden" },
		{ label: "Switzerland", value: "Switzerland" },
		{
			label: "Syrian Arab Republic",
			value: "Syrian Arab Republic",
		},
		{ label: "Taiwan", value: "Taiwan" },
		{ label: "Tajikistan", value: "Tajikistan" },
		{
			label: "Tanzania, United Republic of",
			value: "Tanzania, United Republic of",
		},
		{ label: "Thailand", value: "Thailand" },
		{ label: "Timor-Leste", value: "Timor-Leste" },
		{ label: "Togo", value: "Togo" },
		{ label: "Tokelau", value: "Tokelau" },
		{ label: "Tonga", value: "Tonga" },
		{
			label: "Trinidad and Tobago",
			value: "Trinidad and Tobago",
		},
		{ label: "Tunisia", value: "Tunisia" },
		{ label: "Turkey", value: "Turkey" },
		{ label: "Turkmenistan", value: "Turkmenistan" },
		{
			label: "Turks and Caicos Islands (the)",
			value: "Turks and Caicos Islands (the)",
		},
		{ label: "Tuvalu", value: "Tuvalu" },
		{ label: "Uganda", value: "Uganda" },
		{ label: "Ukraine", value: "Ukraine" },
		{
			label: "United Arab Emirates (the)",
			value: "United Arab Emirates (the)",
		},
		{
			label:
				"United Kingdom of Great Britain and Northern Ireland (the)",
			value:
				"United Kingdom of Great Britain and Northern Ireland (the)",
		},
		{
			label: "United States Minor Outlying Islands (the)",
			value: "United States Minor Outlying Islands (the)",
		},
		{
			label: "United States of America (the)",
			value: "United States of America (the)",
		},
		{ label: "Uruguay", value: "Uruguay" },
		{ label: "Uzbekistan", value: "Uzbekistan" },
		{ label: "Vanuatu", value: "Vanuatu" },
		{
			label: "Venezuela (Bolivarian Republic of)",
			value: "Venezuela (Bolivarian Republic of)",
		},
		{ label: "Viet Nam", value: "Viet Nam" },
		{
			label: "Virgin Islands (British)",
			value: "Virgin Islands (British)",
		},
		{
			label: "Virgin Islands (U.S.)",
			value: "Virgin Islands (U.S.)",
		},
		{
			label: "Wallis and Futuna",
			value: "Wallis and Futuna",
		},
		{ label: "Western Sahara", value: "Western Sahara" },
		{ label: "Yemen", value: "Yemen" },
		{ label: "Zambia", value: "Zambia" },
		{ label: "Zimbabwe", value: "Zimbabwe" },
		{ label: "Åland Islands", value: "Åland Islands" },
	];

	const [fullName, setFullName] = useState("bharat bhusal");
	const [userName, setUserName] = useState("bharat");
	const [dob, setDob] = useState("");

	const customStyles = {
		control: (provided) => ({
			...provided,
			width: "100%", // Same as w-full
			outline: "none", // Same as outline-none
			color: "white", // Same as text-white
			fontSize: "1.1rem", // Same as text-4-5
			fontWeight: "600", // Same as font-semibold
			background:
				"linear-gradient(to right, #666666, #222222)", // Same as bg-dark-gray-left-gradient-light
			paddingLeft: "0.3rem", // Same as px-4
			paddingRight: "0.3rem", // Same as px-4
			borderRadius: "0.4rem", // Same as rounded-2
			border: "none", // Remove border
			// borderColor: state.isFocused ? '#000' : '#000', // Remove border focus
			// boxShadow: state.isFocused ? '0 0 0 1px #000' : 'none' // Remove border focus
		}),
	};

	const handleUsernameChange = (value) => {
		dispatch(getUserByUsername(value));
		setUserName(value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(
				editUser({
					username: userName,
					displayName: fullName,
					dob,
					address: selectedCountry.value,
				})
			);
		} catch (error) {
			// setErrorMessage(error.message);
		}
	};

	return (
		<div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
			<div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
				<div className="relative flex flex-col items-center w-full md:w-120  md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
					<>
						<div className="flex flex-col justify-center items-center text-center md:w-5/6">
							<h1 className="font-bold text-5-5 md:text-7 text-left text-white leading-natural -tracking-0-6 w-full">
								Welcome, XXXXX !
							</h1>
							<img
								className="mt-8 h-24 w-24 rounded-3 mb-10"
								src={imageBig}
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
							<Select
								id="birthCountry"
								className="w-full border border-grey rounded-2"
								options={countries}
								onChange={handleCountrySelect}
								value={selectedCountry}
								placeholder="Select Your Country"
								styles={customStyles}
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
									type="submit"
									heightStyle="h-12"
									widthStyle="w-1/2"
									textSizeStyle="text-5"
									className="font-medium rounded-2 mt-0 self-center focus:outline-none hover:bg-primary-hover"
								/>
							</div>
						</form>
						<div
							onClick={() => navigate(`/creator-socials`)}
							className="mt-24 mb-3 py-1 px-3 border border-grey relative overflow-hidden transition duration-300 ease-in-out transform rounded-2 shadow-lg bg-gradient-to-br from-gray-500 to-gray-200 hover:from-gray-200 hover:to-gray-100 hover:scale-105 focus:outline-none"
						>
							{/* <span className="absolute inset-0 bg-white opacity-10 blur-lg"></span> */}
							<span className="relative z-10 text-white font-light">
								Sign up as a Creator{" "}
							</span>
						</div>
					</>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
