import React, {
	useState,
	useEffect,
	useCallback,
} from "react";
import GenerateIcon from "../../assets/generate-image.svg";
import TextInput from "../shared/TextInput";
import { toast } from "react-toastify";
import StandardButton from "../shared/StandardButton";
import { ScaleLoader } from "react-spinners";
import {
	darkTheme,
	useActiveAccount,
	useSendBatchTransaction,
	useReadContract,
	ConnectButton,
} from "thirdweb/react";
import {
	balanceOf,
	claimTo as claimNFT,
} from "thirdweb/extensions/erc1155";
import {
	editionDropContract,
	editionDropTokenId,
	client,
	accountAbstraction,
} from "../../utils/constants";
import {
	generateImage,
	uploadImageToPinanata,
} from "../../api/AuthRequest.js";
import { updateUserDp } from "../../actions/AuthAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const PhotoSelector = () => {
	const dispatch = useDispatch();
	const [prompt, setPrompt] = useState("");
	const [disable, setDisable] = useState(false);
	const [generatedImage, setGeneratedImage] = useState("");
	const wallet = useActiveAccount();
	const navigate = useNavigate();
	const { user } = useSelector(
		(state) => state.authReducer.authData || { user: null }
	);

	useEffect(() => {
		if (user?.avatar) {
			setGeneratedImage(user.avatar);
		}
	}, [user]);

	useEffect(() => {
		if (!wallet) {
			console.log("No wallet found");
		}
	}, [wallet]);

	const { mutate: sendBatch, isPending: isBatchPending } =
		useSendBatchTransaction();
	const { data: nftBalance, refetch: refetchNFTs } =
		useReadContract(balanceOf, {
			contract: editionDropContract,
			owner: wallet?.address,
			tokenId: editionDropTokenId,
			queryOptions: { enabled: !!wallet },
		});

	const handleGenerateImage = useCallback(async () => {
		setDisable(true);
		setGeneratedImage("");
		try {
			const generateImageResponse = await generateImage({
				prompt,
			});
			setGeneratedImage(generateImageResponse.url);
		} catch (error) {
			toast.error(
				error.response?.data?.error || "Error generating image"
			);
			console.error(
				"Error generating image:",
				error.response?.data?.error || error.message
			);
		} finally {
			setDisable(false);
		}
	}, [prompt]);

	const mintNFT = useCallback(
		(metadataUri) => {
			setDisable(true);
			const transactions = [
				claimNFT({
					contract: editionDropContract,
					tokenId: editionDropTokenId,
					to: wallet.address,
					quantity: 1,
					metadataUri,
				}),
			];
			if (wallet && transactions.length > 0) {
				sendBatch(transactions, {
					onError: (error) => {
						console.error(
							`Error in minting the NFT: ${error.message}`
						);
						toast.error(
							`Error in minting the NFT: ${error.message}`
						);
					},
					onSuccess: (result) => {
						refetchNFTs();
						setDisable(false);
						console.log("Minting success:", result);
						toast.success("Minting success:");
						navigate("/user-details");
					},
				});
			}
		},
		[wallet, sendBatch, refetchNFTs]
	);

	const handleSaveImage = useCallback(async () => {
		setDisable(true);
		try {
			const uploadedImageResponse =
				await uploadImageToPinanata({ url: generatedImage });
			if (
				!uploadedImageResponse ||
				!uploadedImageResponse.IpfsHash
			) {
				throw new Error("Failed to upload image to Pinata");
			}
			const metadataUri = `https://ipfs.io/ipfs/${uploadedImageResponse.IpfsHash}`;
			dispatch(
				updateUserDp({
					wallet: wallet.address,
					avatar: metadataUri,
				})
			);
			mintNFT(metadataUri);
		} catch (error) {
			toast.error("Error uploading image");
			console.error(
				"Error uploading image:",
				error.response ? error.response.data : error.message
			);
		}
	}, [generatedImage, wallet, dispatch, mintNFT, navigate]);

	return (
		<>
			{disable && <LoadingIndicator />}

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
					connectButton={{ label: "Connect" }}
					connectModal={{
						size: "compact",
						titleIcon: "",
						showThirdwebBranding: false,
					}}
				/>
			</div>

			<div className="h-screen flex flex-col items-center w-full bg-black mx-auto justify-center p-5 gap-5">
				<div className="flex flex-col justify-center items-center text-center w-full bg-dark-gray-left-gradient rounded-2 p-3">
					<h1 className="font-bold text-5-5 text-7 text-center text-white leading-natural -tracking-0-6 w-full">
						Profile Photo
					</h1>
				</div>
				<div className="w-full">
					<div className="flex flex-col">
						<img
							src={generatedImage}
							alt="Generated"
							style={{ maxWidth: "100%", objectFit: "contain" }}
						/>
						<div className="flex justify-center mt-5 gap-10">
							{generatedImage ? (
								<StandardButton
									text="Save"
									disabled={disable}
									onClick={handleSaveImage}
									heightStyle="h-12"
									widthStyle="w-40"
									textSizeStyle="text-5"
									className="font-medium rounded-2 mt-0 focus:outline-none hover:bg-primary-hover"
								/>
							) : (
								<p>Image will appear here</p>
							)}
						</div>
					</div>
				</div>
				<div className="photo-selector w-full flex flex-row space-x-8 justify-center items-center px-5 py-5 bg-dark-gray-left-gradient rounded-2 rounded-t-4">
					<TextInput
						id="prompt"
						disabled={disable}
						type="text"
						placeholder="Prompt"
						name="prompt"
						className="w-full"
						onChange={setPrompt}
						value={prompt}
					/>
					<div className="flex flex-col">
						<button
							type="submit"
							className="flex justify-center items-center"
							disabled={disable}
							onClick={handleGenerateImage}
						>
							<div className="p-4 rounded-full bg-primary flex items-center justify-center">
								<img
									className="inline h-8 fill-white text-white ml-1 rounded-3"
									src={GenerateIcon}
									alt="generate-icon"
								/>
							</div>
						</button>
						<span className="text-white text-center mt-1">
							{!generatedImage ? "Generate" : "Regenerate"}
						</span>
					</div>
				</div>
			</div>

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
					connectButton={{ label: "Connect" }}
					connectModal={{
						size: "compact",
						titleIcon: "",
						showThirdwebBranding: false,
					}}
				/>
			</div>
		</>
	);
};

export default PhotoSelector;
