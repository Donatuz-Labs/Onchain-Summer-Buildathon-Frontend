import React, { useMemo } from "react";
import PropTypes from "prop-types";

const TextInput = ({
	// properties
	error = {},
	errorAsPlaceholder = false,
	id = "",
	register = null,
	label = "",
	rules = {},
	name = "",
	placeholder = "",
	showErrorMessage = true,
	textArea = false,
	title = "",
	touched = false,
	type = "text",
	value = "",
	withInternalButton = false,
	internalButtonText = "",
	insideButtonYMargin = "my-3-5",
	// callbacks
	onInternalButtonClick = null,
	onChange = null,
	// styles
	backgroundStyle = "bg-dark-gray-left-gradient-light",
	borderFocusedStyle = "focus:border-primary",
	borderStyle = "border border-solid border-gray rounded-2",
	fontSizeStyle = "text-4",
	heightStyle = "h-12",
	inputStyle = "w-full outline-none text-white text-4-5 font-semibold",
	marginsStyle = "",
	paddingsStyle = "",
	placeholderStyle = "w-full outline-none text-3-5 placeholder-blue-grey -tracking-0-3",
	textStyle = "text-slate-grey text-4 -tracking-0-3",
	titleStyle = "text-blue-grey text-3-5 -tracking-0-3",
	widthStyle = "w-full",
	otherStyle = "px-4 outline-none",
	disabled = false,
	hidden = false,
	errorBorderStyle = "border-red",
}) => {
	const showError = Object.keys(error).length > 0 && touched;

	const border = showError
		? `border ${errorBorderStyle} rounded-2`
		: borderStyle;
	const placeHolderClass =
		errorAsPlaceholder && showError
			? "placeholder-red"
			: placeholderStyle;
	const insideButtonClass = ` ${
		showError ? "mr-8" : ""
	} ${insideButtonYMargin} absolute right-0 mr-4 top-0 text-3 font-medium -tracking-0-3 focus:outline-none border rounded-2 px-2 select-none capitalize cursor-pointer text-white border-white`;

	const insideButton = useMemo(() => {
		const internalButton = (
			<button
				id={`internal-button-${id}`}
				type="button"
				className={insideButtonClass}
				onClick={onInternalButtonClick}
			>
				{internalButtonText}
			</button>
		);
		return internalButton;
	}, [
		id,
		internalButtonText,
		onInternalButtonClick,
		insideButtonClass,
	]);

	return (
		<>
			<div
				id={title}
				className={`${
					hidden ? "hidden" : "relative outline-none z-0 "
				} ${marginsStyle} ${paddingsStyle} ${widthStyle} ${heightStyle} ${border} ${borderFocusedStyle} ${textStyle} ${fontSizeStyle} ${backgroundStyle} ${placeHolderClass}`}
			>
				{title && (
					<label
						className={`flex w-full mt-1 ${widthStyle}`}
						htmlFor={id}
					>
						<p className={titleStyle}>{title}</p>
					</label>
				)}
				<div
					className={`${widthStyle} ${
						!title && "h-full flex flex-row"
					}`}
				>
					{textArea ? (
						<textarea
							className={`resize-none ${inputStyle} ${backgroundStyle} ${
								!title && "pt-1"
							}`}
							name={name}
							placeholder={
								errorAsPlaceholder && showError
									? error
									: placeholder
							}
							id={id}
							disabled={disabled}
						/>
					) : onChange ? (
						<input
							type={type}
							className={`${inputStyle} ${backgroundStyle} px-4 rounded-2`}
							name={name}
							placeholder={
								errorAsPlaceholder && showError
									? error["message"]
									: placeholder
							}
							onChange={(e) => onChange(e.target.value)}
							defaultValue={value}
							aria-label={title}
							id={id}
							disabled={disabled}
						/>
					) : register !== null ? (
						<input
							type={type}
							className={`${inputStyle} ${backgroundStyle} px-4 rounded-2`}
							name={name}
							placeholder={
								errorAsPlaceholder && showError
									? error["message"]
									: placeholder
							}
							{...register(label, { ...rules })}
							defaultValue={value}
							aria-label={title}
							id={id}
							disabled={disabled}
						/>
					) : (
						<input
							type={type}
							className={`${inputStyle} ${backgroundStyle}`}
							name={name}
							placeholder={
								errorAsPlaceholder && showError
									? error["message"]
									: placeholder
							}
							defaultValue={value}
							aria-label={title}
							id={id}
							disabled={disabled}
						/>
					)}
				</div>
				{withInternalButton && insideButton}
			</div>
			{!errorAsPlaceholder &&
				showError &&
				showErrorMessage && (
					<p
						className={`${
							hidden ? "hidden" : ""
						} error-text text-2-5 text-red font-normal leading-relaxed ml-4 mt-1 place`}
					>
						{error["message"]}
					</p>
				)}
		</>
	);
};

TextInput.propTypes = {
	// properties
	error: PropTypes.object,
	errorAsPlaceholder: PropTypes.bool,
	id: PropTypes.string,
	register: PropTypes.func,
	label: PropTypes.string,
	rules: PropTypes.object,
	name: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	placeholder: PropTypes.string,
	showErrorMessage: PropTypes.bool,
	textArea: PropTypes.bool,
	title: PropTypes.string,
	touched: PropTypes.bool,
	type: PropTypes.string,
	withInternalButton: PropTypes.bool,
	internalButtonText: PropTypes.string,
	// callbacks
	onInternalButtonClick: PropTypes.func,
	onChange: PropTypes.func,
	// styles
	errorBorderStyle: PropTypes.string,
	backgroundStyle: PropTypes.string,
	borderFocusedStyle: PropTypes.string,
	borderStyle: PropTypes.string,
	fontSizeStyle: PropTypes.string,
	heightStyle: PropTypes.string,
	inputStyle: PropTypes.string,
	marginsStyle: PropTypes.string,
	paddingsStyle: PropTypes.string,
	insideButtonYMargin: PropTypes.string,
	placeholderStyle: PropTypes.string,
	textStyle: PropTypes.string,
	titleStyle: PropTypes.string,
	widthStyle: PropTypes.string,
	otherStyle: PropTypes.string,
	disabled: PropTypes.bool,
	hidden: PropTypes.bool,
};

export default TextInput;
