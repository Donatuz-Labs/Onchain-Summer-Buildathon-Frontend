import {
	createThirdwebClient,
	getContract,
} from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";

// Replace this with your client ID string
const clientId = process.env.REACT_APP_CLIENT_ID;

if (!clientId) {
	throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
	clientId: clientId,
});

export const chain = baseSepolia;
export const tokenDropAddress =
	process.env.REACT_APP_TOKEN_DROP_ADDRESS;
export const editionDropAddress =
	process.env.REACT_APP_EDITION_DROP_ADDRESS;
export const editionDropTokenId =
	process.env.REACT_APP_EDITION_DROP_TOKEN_ID;

export const editionDropContract = getContract({
	address: editionDropAddress,
	chain,
	client,
});

export const tokenDropContract = getContract({
	address: tokenDropAddress,
	chain,
	client,
});

export const accountAbstraction = {
	chain,
	sponsorGas: true,
};

export const wallets = [
	inAppWallet({
		auth: {
			options: ["google"],
		},
	}),
];
