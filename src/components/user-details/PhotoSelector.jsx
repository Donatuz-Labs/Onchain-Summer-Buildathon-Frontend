import React, { useState, useEffect, useCallback } from "react";
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
import { balanceOf, claimTo as claimNFT } from "thirdweb/extensions/erc1155";
import {
  editionDropContract,
  editionDropTokenId,
  client,
  accountAbstraction,
} from "../../utils/constants";
import { generateImage } from "../../api/AiRequest.js";
import { uploadImageToPinanata } from "../../api/PinataRequest.js";
import { updateUserDp } from "../../actions/UserAction.js";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const wallet = useActiveAccount();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state) => state.authReducer.authData || { user: null }
  );

  useEffect(() => {
    if (user?.avatar) {
      setCurrentImage(user.avatar);
    }
  }, [user]);

  useEffect(() => {
    if (!wallet) {
      console.log("No wallet found");
    }
  }, [wallet]);

  const { mutate: sendBatch, isPending: isBatchPending } =
    useSendBatchTransaction();
  const { data: nftBalance, refetch: refetchNFTs } = useReadContract(
    balanceOf,
    {
      contract: editionDropContract,
      owner: wallet?.address,
      tokenId: editionDropTokenId,
      queryOptions: { enabled: !!wallet },
    }
  );

  const handleGenerateImage = useCallback(async () => {
    setIsGenerating(true);
    setIsImageLoading(true);
    try {
      const generateImageResponse = await generateImage({
        prompt,
      });
      const newImageUrl = generateImageResponse.url;
      const img = new Image();
      img.src = newImageUrl;
      img.onload = () => {
        setCurrentImage(newImageUrl);
        setIsImageLoading(false);
        setIsGenerating(false);
      };
      img.onerror = () => {
        toast.error("Error loading the generated image");
        setIsImageLoading(false);
        setIsGenerating(false);
      };
    } catch (error) {
      toast.error(error.response?.data?.error || "Error generating image");
      console.error(
        "Error generating image:",
        error.response?.data?.error || error.message
      );
      setIsImageLoading(false);
      setIsGenerating(false);
    }
  }, [prompt]);

  const mintNFT = useCallback(
    (metadataUri) => {
      setIsSaving(true);
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
            console.error(`Error in minting the NFT: ${error.message}`);
            toast.error(`Error in minting the NFT: ${error.message}`);
          },
          onSuccess: (result) => {
            refetchNFTs();
            setIsSaving(false);
            console.log("Minting success:", result);
            toast.success("Minting success");
            navigate("/user-details");
          },
        });
      }
    },
    [wallet, sendBatch, refetchNFTs]
  );

  const handleSaveImage = useCallback(async () => {
    setIsSaving(true);
    try {
      const uploadedImageResponse = await uploadImageToPinanata({
        url: currentImage,
      });
      if (!uploadedImageResponse || !uploadedImageResponse.IpfsHash) {
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
    } finally {
      setIsSaving(false);
    }
  }, [currentImage, wallet, dispatch, sendBatch, refetchNFTs, navigate]);

  const isLoading =
    isGenerating || isSaving || isImageLoading || isBatchPending;

  return (
    <>
      {isLoading && <LoadingIndicator />}

      <div className="min-h-screen flex flex-col items-center w-full bg-black mx-auto justify-center p-5 gap-5">
        <div className="flex flex-col justify-center items-center text-center w-full bg-dark-gray-left-gradient rounded-2 p-3 max-w-md">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center text-white leading-tight">
            Profile Photo
          </h1>
        </div>
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src={currentImage}
              alt="Generated"
              className="max-w-full h-auto object-contain rounded-lg shadow-lg"
              style={{ maxHeight: "50vh" }}
            />
            <div className="flex justify-center mt-5">
              {currentImage && (
                <StandardButton
                  text="Save"
                  disabled={isLoading}
                  onClick={handleSaveImage}
                  heightStyle="h-12"
                  widthStyle="w-full md:w-40"
                  textSizeStyle="text-lg"
                  className="font-medium rounded-lg mt-0 focus:outline-none hover:bg-primary-hover"
                />
              )}
            </div>
          </div>
        </div>
        <div className="photo-selector w-full max-w-md flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center items-center px-5 py-5 bg-dark-gray-left-gradient rounded-lg">
          <TextInput
            id="prompt"
            disabled={isLoading}
            type="text"
            placeholder="Enter prompt here"
            name="prompt"
            className="w-full"
            onChange={setPrompt}
            value={prompt}
          />
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="flex justify-center items-center"
              disabled={isLoading}
              onClick={handleGenerateImage}
            >
              <div className="p-4 rounded-full bg-primary flex items-center justify-center hover:bg-primary-hover transition-colors">
                <img
                  className="h-6 w-6 fill-white text-white"
                  src={GenerateIcon}
                  alt="generate-icon"
                />
              </div>
            </button>
            <span className="text-white text-center mt-2 text-sm">
              {!currentImage ? "Generate" : "Regenerate"}
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
              primaryButtonBg: "linear-gradient(to right, #666666, #222222)",
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
