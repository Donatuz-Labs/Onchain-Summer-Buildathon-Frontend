import React, { useState, useEffect } from "react";
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
import { sepolia } from "thirdweb/chains";
import { balanceOf, claimTo as claimNFT } from "thirdweb/extensions/erc1155";
import {
  editionDropContract,
  editionDropTokenId,
  client,
  accountAbstraction,
} from "../../utils/constants";
import { generateImage } from "../../api/AuthRequest.js";
import { uploadImageToPinanata } from "../../api/AuthRequest.js";
import { updateUserDp } from "../../actions/AuthAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PhotoSelector = () => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const wallet = useActiveAccount();
  const navigate = useNavigate();
  const [generatedImage, setGeneratedImage] = useState(
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1480&t=st=1718963064~exp=1718963664~hmac=ff9859c371bae929629cee481fdaa505f8f518f595761dc551351ad38e18cd21"
  );
  const [disable, setDisable] = useState(false);

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

  const handleGenerateImage = async () => {
    setDisable(true);
    setGeneratedImage("");
    try {
      const generateImageResponse = await generateImage({ prompt });
      console.log("Generate Image Response:", generateImageResponse);
      setGeneratedImage(generateImageResponse.url);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error generating image");
      console.error(
        "Error generating image:",
        error.response?.data?.error || error.message
      );
    }
    setDisable(false);
  };

  const handleSaveImage = async () => {
    setDisable(true);
    let uploadedImageResponse;
    try {
      uploadedImageResponse = await uploadImageToPinanata({
        url: generatedImage,
      });
      console.log("Upload to Pinata response:", uploadedImageResponse);

      if (!uploadedImageResponse || !uploadedImageResponse.IpfsHash) {
        throw new Error("Failed to upload image to Pinata");
      }

      dispatch(
        updateUserDp({
          wallet: wallet.address,
          avatar: `https://ipfs.io/ipfs/${uploadedImageResponse.IpfsHash}`,
        })
      );

      const metadataUrl = `https://ipfs.io/ipfs/${uploadedImageResponse.IpfsHash}`;
      const transactions = [
        claimNFT({
          contract: editionDropContract,
          tokenId: editionDropTokenId,
          to: wallet.address,
          quantity: 1,
          metadataUri: metadataUrl,
        }),
      ];

      sendBatch(transactions, {
        onError: (error) => {
          console.error(`Error in minting the NFT: ${error.message}`);
          alert(`Error in minting the NFT: ${error.message}`);
        },
        onSuccess: (result) => {
          refetchNFTs();
          console.log("Minting success:", result);
          alert("NFT minted successfully!");
          //navigate("/done");
        },
      });
    } catch (error) {
      toast.error("Error uploading image");
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
    setDisable(false);
  };
  return (
    <>
      {/* Spinner component */}
      {/* {disable && <Spinner fullScreen={true} />} */}
      {disable && (
        <div
          className="loading"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScaleLoader
            color="rgba(54, 215, 183, 1)"
            height={46}
            loading
            margin={2}
            radius={13}
            width={10}
          />
        </div>
      )}

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

      <div className="w-full h-full bg-personal-bg md:bg-personal-bg-one opacity-80 md:hidden">
        <div className="flex flex-col h-screen mx-6 md:mx-4 md:hidden ">
          <div className="flex justify-center">
            {/* Container for image */}
            <img
              src={generatedImage}
              alt=""
              style={{
                maxHeight: "80vh", // Adjust as needed
                marginTop: "10%", // 10% margin top
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="buttons flex justify-center mt-5 gap-10">
            {generatedImage ? (
              <StandardButton
                text="Save"
                disabled={disable}
                onClick={handleSaveImage}
                heightStyle="h-12"
                widthStyle="w-1/2"
                textSizeStyle="text-5"
                className="font-medium rounded-2 mt-0 self-center focus:outline-none hover:bg-primary-hover"
              />
            ) : (
              <>Image will appear here</>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden absolute md:relative bottom-0 bg-black flex flex-col items-center w-full md:w-120 rounded-t-4 md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
        <div className="flex flex-col justify-center items-center text-center md:w-5/6">
          <h1 className="font-bold text-5-5 md:text-7 text-center text-white leading-natural -tracking-0-6 w-full">
            Profile Photo
          </h1>
        </div>

        <div className="photo-selector flex flex-row space-x-8 md:space-x-8 mt-8 justify-center items-center">
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

          <button
            type="submit"
            className="flex flex-col"
            disabled={disable}
            onClick={handleGenerateImage}
          >
            <button className="flex justify-center items-center">
              <div className="p-4 rounded-full bg-primary flex items-center justify-center">
                {/* Flex container */}
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
          </button>
        </div>
      </div>

      <div className="w-full h-full bg-personal-bg md:bg-personal-bg-one opacity-7 hidden md:block">
        <div className="flex justify-center items-center h-screen mx-6 md:mx-4">
          <div className="absolute md:relative bottom-0 bg-black flex flex-col items-center w-full md:w-120 rounded-4 md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
            <div className="flex flex-col justify-center items-center text-center md:w-5/6">
              <h1 className="font-bold text-5-5 md:text-7 text-center text-white leading-natural -tracking-0-6 w-full">
                Profile Photo
              </h1>
            </div>

            <div className="photo-selector flex flex-row space-x-8 md:space-x-8 mt-8 justify-center items-center">
              <TextInput
                id="prompt"
                type="text"
                placeholder="Prompt"
                name="prompt"
                className="w-full"
                disabled={disable}
                onChange={setPrompt}
                value={prompt}
              />

              <button
                type="submit"
                className="flex flex-col"
                disabled={disable}
                onClick={handleGenerateImage}
              >
                <div className="p-4 rounded-full bg-primary">
                  <img
                    className="inline h-8 fill-white text-white items-right text-right ml-1 rounded-3"
                    src={GenerateIcon}
                    alt="generate-icon"
                  />
                </div>
                <span className="text-white text-center mt-1">
                  {generatedImage ? "Generate" : "Regenerate"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoSelector;
