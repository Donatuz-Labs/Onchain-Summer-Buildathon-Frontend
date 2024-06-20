import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CamaraIcon from "../../assets/ion_camera-sharp.svg";
import GalleryIcon from "../../assets/gallery-wide-bold.svg";
import GenerateIcon from "../../assets/generate-image.svg";
import axios from "axios";

import {
  useSendBatchTransaction,
  useReadContract,
  useActiveAccount,
  ConnectButton,
  useConnect,
} from "thirdweb/react";
import {
  editionDropContract,
  editionDropTokenId,
  client,
  accountAbstraction,
} from "../../utils/constants";
import FormData from "form-data";
import { balanceOf, claimTo as claimNFT } from "thirdweb/extensions/erc1155";
import { ROUTES } from "../../utils/routes";

const pinataApiKey = "f80ba671427622ab408a";
const pinataSecretApiKey =
  "e61c964e9261fde320325bffa1bb7124c6dbf27eb7d1e2c289f7741db5547f50";

const PhotoSelector = () => {
  const wallet = useActiveAccount();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const { mutate: sendBatch, isPending: isBatchPending } =
    useSendBatchTransaction();

  console.log("Wallet:", wallet);

  useEffect(() => {
    if (wallet) {
      console.log("Active wallet:", wallet.address);
    } else {
      console.log("No active wallet found");
    }
  }, [wallet]);

  const { data: nftBalance, refetch: refetchNFTs } = useReadContract(
    balanceOf,
    {
      contract: editionDropContract,
      owner: wallet?.address,
      tokenId: editionDropTokenId,
      queryOptions: { enabled: !!wallet },
    }
  );

  const uploadToPinata = async (imageData) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append("file", imageData);

    const metadata = JSON.stringify({
      name: "image",
    });
    data.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    data.append("pinataOptions", options);

    try {
      const response = await axios.post(url, data, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      console.log("Image uploaded to Pinata:", response.data);
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading image to Pinata:", error);
      return null;
    }
  };

  const sendIpfsCidToBackend = async (userData) => {
    const url = `http://localhost:8080/users/update`;

    const { username, display_name, dob, bio, address, category, avatar } =
      userData;

    try {
      const response = await axios.put(
        url,
        {
          username,
          display_name,
          dob,
          bio,
          avatar, // assuming ipfsCid is the new avatar path
          address,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("IPFS CID and user data sent to backend:", response.data);
    } catch (error) {
      console.error("Error sending IPFS CID and user data to backend:", error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
    }
  };

  const handleTakePhotoClick = () => {
    setCapturing(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    });
  };

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageUrl = canvasRef.current.toDataURL("image/png");
      setCapturedImage(imageUrl);
      setCapturing(false);
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const handleSaveAndReturn = async () => {
    if (capturedImage) {
      const imageBlob = await fetch(capturedImage).then((res) => res.blob());
      console.log("Image Blob:", imageBlob);
      const ipfsHash = await uploadToPinata(imageBlob);

      if (ipfsHash) {
        console.log("IPFS Hash:", ipfsHash);
        await sendIpfsCidToBackend({
          avatar: ipfsHash,
        });
        // You can now use this IPFS hash as needed, for example, to save it in your backend or smart contract
      }
    } else {
      console.log("No image to upload");
    }
    navigate(ROUTES.DONE); // Navigate back to UserDetails screen
  };

  const handleGenerate = async () => {
    navigate("/prompt-modal");
  };

  return (
    <>
      <div className="w-full h-full bg-personal-bg md:bg-personal-bg-one opacity-70 md:hidden">
        <div className="flex justify-center items-center h-screen mx-6 md:mx-4 md:hidden"></div>
      </div>
      <div className="md:hidden absolute md:relative bottom-0 bg-black flex flex-col items-center w-full md:w-120 rounded-t-4 md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
        <div className="flex flex-col justify-center items-center text-center md:w-5/6">
          <h1 className="font-bold text-5-5 md:text-7 text-center text-white leading-natural -tracking-0-6 w-full">
            Profile Photo
          </h1>
        </div>

        <div className="photo-selector flex flex-row space-x-8 md:space-x-8 mt-8">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
          <div className="flex flex-col" onClick={handleTakePhotoClick}>
            <div className="p-4 rounded-full bg-primary ">
              <img
                className="inline h-8 fill-white text-white items-center rounded-3"
                src={CamaraIcon}
                onClick={handleTakePhotoClick}
                alt="camera-icon"
              />
            </div>
            <span className="text-white text-center mt-1">Camera</span>
          </div>

          <div
            className="flex flex-col"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="p-4 rounded-full bg-primary">
              <img
                className="inline h-8 fill-white text-white items-center rounded-3"
                src={GalleryIcon}
                alt="gallery-icon"
              />
            </div>
            <span className="text-white text-center mt-1">Gallery</span>
          </div>

          <div className="flex flex-col" onClick={handleTakePhotoClick}>
            <div className="p-4 rounded-full bg-primary">
              <img
                className="inline h-8 fill-white text-white items-right text-right ml-1 rounded-3"
                src={GenerateIcon}
                alt="generate-icon"
              />
            </div>
            <span className="text-white text-center mt-1">Generate</span>
          </div>

          {capturing && (
            <div>
              <video ref={videoRef} width="320" height="240" autoPlay></video>
              <button className="text-gray-50" onClick={handleCapture}>
                Capture
              </button>
            </div>
          )}
          {capturedImage && (
            <div>
              <img
                src={capturedImage}
                alt="Captured"
                width="320"
                height="240"
              />
              <button className="text-gray-50" onClick={handleSaveAndReturn}>
                Go back
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add a hidden canvas element to capture the image */}
      <canvas
        ref={canvasRef}
        width="320"
        height="240"
        style={{ display: "none" }}
      ></canvas>

      <div className="w-full h-full bg-personal-bg md:bg-personal-bg-one opacity-7 hidden md:block">
        <div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
          <div className=" absolute md:relative bottom-0 bg-black flex flex-col items-center w-full md:w-120 rounded-4 md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">
            <div className="flex flex-col justify-center items-center text-center md:w-5/6">
              <h1 className="font-bold text-5-5 md:text-7 text-center text-white leading-natural -tracking-0-6 w-full">
                Profile Photo
              </h1>
            </div>

            <div className="photo-selector flex flex-row space-x-8 md:space-x-8 mt-8">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
              <div className="flex flex-col" onClick={handleTakePhotoClick}>
                <div className="p-4 rounded-full bg-primary t">
                  <img
                    className="inline h-8 fill-white text-white items-center rounded-3"
                    src={CamaraIcon}
                    alt="camera-icon"
                  />
                </div>
                <span className="text-white text-center mt-1">Camera</span>
              </div>

              <div
                className="flex flex-col"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="p-4 rounded-full bg-primary">
                  <img
                    className="inline h-8 fill-white text-white items-center rounded-3"
                    src={GalleryIcon}
                    onClick={() => fileInputRef.current.click()}
                    alt="gallery-icon"
                  />
                </div>
                <span className="text-white text-center mt-1">Gallery</span>
              </div>

              <div className="flex flex-col" onClick={handleGenerate}>
                <div className="p-4 rounded-full bg-primary">
                  <img
                    className="inline h-8 fill-white text-white items-right text-right ml-1 rounded-3"
                    src={GenerateIcon}
                    alt="generate-icon"
                  />
                </div>
                <span className="text-white text-center mt-1">Generate</span>
              </div>

              {capturing && (
                <div>
                  <video
                    ref={videoRef}
                    width="320"
                    height="240"
                    autoPlay
                  ></video>
                  <button className="text-gray-50" onClick={handleCapture}>
                    Capture
                  </button>
                </div>
              )}
              {capturedImage && (
                <div>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    width="320"
                    height="240"
                  />
                  <button
                    className="text-gray-50"
                    onClick={handleSaveAndReturn}
                  >
                    Save & Return
                  </button>
                </div>
              )}
              {generatedImageUrl && (
                <div className="flex flex-col items-center mt-4">
                  <img
                    src={generatedImageUrl}
                    alt="Generated"
                    width="320"
                    height="240"
                  />
                  <button
                    className="text-gray-50 mt-2"
                    onClick={handleMintAndSave}
                    disabled={minting}
                  >
                    {minting ? "Minting..." : "Mint and Save"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoSelector;
