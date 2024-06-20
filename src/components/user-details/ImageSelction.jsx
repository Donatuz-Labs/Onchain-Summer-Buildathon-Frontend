import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  useActiveAccount,
  useSendBatchTransaction,
  useReadContract,
  ConnectButton,
} from "thirdweb/react";
import {
  editionDropContract,
  editionDropTokenId,
  client,
  accountAbstraction,
} from "../../utils/constants";
import { balanceOf, claimTo as claimNFT } from "thirdweb/extensions/erc1155";
import "./Modal.css"; // Import the CSS for styling

const pinataApiKey = "f80ba671427622ab408a";
const pinataSecretApiKey =
  "e61c964e9261fde320325bffa1bb7124c6dbf27eb7d1e2c289f7741db5547f50";

const ImageSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const generatedImageUrl = location.state?.generatedImageUrl;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const wallet = useActiveAccount();

  useEffect(() => {
    if (!wallet) {
      console.log("No wallet found");
    }
  }, [wallet]);

  useEffect(() => {
    if (generatedImageUrl) {
      const img = new Image();
      img.src = generatedImageUrl;
      img.onload = () => setImageLoaded(true);
    }
  }, [generatedImageUrl]);

  const { mutate: sendBatch } = useSendBatchTransaction();
  const { refetch: refetchNFTs } = useReadContract(balanceOf, {
    contract: editionDropContract,
    owner: wallet?.address,
    tokenId: editionDropTokenId,
    queryOptions: { enabled: !!wallet },
  });

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

  const handleSelect = async () => {
    if (!generatedImageUrl) return;

    setMinting(true);

    try {
      console.log("Fetching image from:", generatedImageUrl);
      const encodedUrl = encodeURIComponent(generatedImageUrl);
      const response = await axios.get(
        `http://localhost:5000/api/fetch-image`,
        {
          params: { url: encodedUrl },
          responseType: "arraybuffer",
        }
      );
      console.log("Fetched image:", response);

      const formData = new FormData();
      formData.append(
        "file",
        new Blob([response.data], { type: "image/png" }),
        "image.png"
      );

      const pinataResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        }
      );

      const metadataUrl = `https://ipfs.io/ipfs/${pinataResponse.data.IpfsHash}`;
      if (metadataUrl) {
        console.log("IPFS Hash:", metadataUrl);
        await sendIpfsCidToBackend({
          avatar: metadataUrl,
        });
        // You can now use this IPFS hash as needed, for example, to save it in your backend or smart contract
      }

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
          console.error(`Error: ${error.message}`);
          alert(`Error: ${error.message}`);
        },
        onSuccess: (result) => {
          refetchNFTs();
          console.log("Minting success:", result);
          alert("NFT minted successfully!");
          navigate("/done");
        },
      });
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    } finally {
      setMinting(false);
    }
  };

  const handleRegenerate = () => {
    navigate("/prompt-modal");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={() => navigate("/select-photo")}
        >
          ✕
        </button>
        {generatedImageUrl && imageLoaded ? (
          <img
            src={generatedImageUrl}
            alt="Generated"
            className="generated-image"
          />
        ) : (
          <div className="spinner"></div> // Show spinner while loading the image
        )}
        <div className="buttons-container">
          <button
            className="select-button"
            onClick={handleSelect}
            disabled={minting}
          >
            {minting ? "Minting..." : "Select"}
          </button>
          <button className="generate-button" onClick={handleRegenerate}>
            Re Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSelection;
