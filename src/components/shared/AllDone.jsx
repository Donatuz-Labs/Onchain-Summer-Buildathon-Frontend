import React, { useEffect } from "react";
import image from "../../assets/mdi_tick-circle.png";
import { useSelector } from "react-redux";
import imageBig from "../../assets/unknown-person.png";
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

const AllDone = () => {
  const wallet = useActiveAccount();
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
  const { user } = useSelector((state) => state.authReducer.authData);
  const avatar = useSelector((state) => state.authReducer.authData?.avatar);

  const transactions = [
    claimNFT({
      contract: editionDropContract,
      tokenId: editionDropTokenId,
      to: wallet.address,
      quantity: 1,
      metadataUri: avatar,
    }),
  ];

  useEffect(() => {
    if (wallet && transactions.length > 0) {
      sendBatch(transactions, {
        onError: (error) => {
          console.error(`Error in minting the NFT: ${error.message}`);
          alert(`Error in minting the NFT: ${error.message}`);
        },
        onSuccess: (result) => {
          refetchNFTs();
          console.log("Minting success:", result);
          //alert("NFT minted successfully!");
          //navigate("/done");
        },
      });
    }
  }, [wallet, avatar]); // Add other dependencies as needed

  return (
    <div className="h-full flex flex-col bg-splash bg-cover bg-center">
      <div className="flex flex-col items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <img
          className="flex h-40 w-40 md:h-60 md:w-60 rounded-full mt-5"
          src={user?.avatar}
          alt="Avatar"
        />
        <h1 className="flex text-center justify-center font-bold text-5-5 md:text-7 text-white leading-natural -tracking-0-6 w-full">
          All Done, {user.displayName}!
        </h1>
        <br />
        <h2 className="flex text-center justify-center font-bold text-5-5 md:text-7 text-white leading-natural -tracking-0-6 w-full">
          Welcome to Donatuz
        </h2>
        {/* <div className="flex flex-col text-center justify-center text-white mt-5">
          <p>Username: {user?.username}</p>
          <p>Address: {user?.address}</p>
          <p>Date of Birth: {new Date(user?.dob).toLocaleDateString()}</p>
          <p>
            Smart Wallet address:{" "}
            {`${user?.wallet.slice(0, 10)}...${user?.wallet.slice(-10)}`}
          </p>
        </div> */}
        {/* <img
          className="flex h-40 w-40 md:h-60 md:w-60 rounded-full mt-5"
          src={user?.avatar}
          alt="Avatar"
        /> */}
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
      </div>
    </div>
  );
};

export default AllDone;
