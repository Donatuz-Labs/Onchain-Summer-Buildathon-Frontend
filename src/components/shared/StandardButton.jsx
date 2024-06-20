import React from "react";
import PropTypes from "prop-types";

const StandardButton = ({
	text = "OK",
	icon = null,
	type = "button",
	onClick = null,
	bgColorStyle = "bg-primary",
	roundedStyle = "rounded-2",
	textColorStyle = "text-white",
	textSizeStyle = "text-4",
	letterSpacingStyle = "tracking-0-18",
	fontFamilyStyle = "font-semibold",
	heightStyle = "h-12",
	widthStyle = "w-full",
	otherStyles = "",
	hoverStateStyle = "hover:bg-primary-light",
	disabled = false,
	id = "0",
	hidden = false,
}) => {
	const classNames = `${
		hidden ? "hidden" : ""
	} ${roundedStyle} focus:outline-none disabled:opacity-50 disabled:cursor-default ${heightStyle} ${widthStyle} ${bgColorStyle} ${textColorStyle} ${textSizeStyle} ${letterSpacingStyle} ${fontFamilyStyle} ${otherStyles} ${
		disabled ? "" : hoverStateStyle
	}`;

	return (
		<button
			type={type}
			className={classNames}
			onClick={onClick}
			disabled={disabled}
			id={id}
		>
			{text !== "OK" ? text : null}
			{icon !== null ? icon : null}
		</button>
	);
};

StandardButton.propTypes = {
	text: PropTypes.string,
	icon: PropTypes.object,
	type: PropTypes.oneOf([
		"submit",
		"button",
		"reset",
		"next",
		"skip",
	]),
	onClick: PropTypes.func,
	hoverStateStyle: PropTypes.string,
	bgColorStyle: PropTypes.string,
	roundedStyle: PropTypes.string,
	textColorStyle: PropTypes.string,
	textSizeStyle: PropTypes.string,
	letterSpacingStyle: PropTypes.string,
	fontFamilyStyle: PropTypes.string,
	heightStyle: PropTypes.string,
	widthStyle: PropTypes.string,
	otherStyles: PropTypes.string,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	hidden: PropTypes.bool,
};

export default StandardButton;
