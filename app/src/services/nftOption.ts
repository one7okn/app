import { INftOptionSummary, NftOption } from "../models";
import { ethers } from "ethers";
import NftOptionContract from "../artifacts/contracts/Option.sol/Option.json";

declare var window: any;
let NftOptionAddress = "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E";
export const address0 = "0x0000000000000000000000000000000000000000";

export const getNftOptions = async (): Promise<INftOptionSummary[]> => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(NftOptionAddress, NftOptionContract.abi, provider);
    try {
      const nftOptions = await contract.getNftOptions();
      // console.log(nftOptions);
      return nftOptions.map((nftOption: any) => ({
        ...nftOption,
        strikePrice: nftOption.strikePrice.toNumber(),
        amount: nftOption.amount.toNumber(),
        expirationDate: new Date(nftOption.expirationDate * 1000)
      }));
    } catch (err) {
      console.log(err);
    }
  }

  return [];
};

export const createNftOption = async (nftOption: NftOption): Promise<void> => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NftOptionAddress, NftOptionContract.abi, signer);
    try {
      const transaction = await contract.createNftOption(
        {
          tokenId: 0, //Caculate by the contract
          collection: nftOption.collection,
          urlNftOption: nftOption.urlNftOption,
          urlNftImage: nftOption.urlNftImage,
          strikePrice: nftOption.strikePrice,
          amount: nftOption.amount,
          expirationDate: nftOption.expirationDate
            ? Math.floor(nftOption.expirationDate.getTime() / 1000)
            : null,
          purcharser: "0x0000000000000000000000000000000000000000"
        },
        {
          from: await signer.getAddress()
        }
      );
      await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  }
};

export const purchaseNftOption = async (tokenId: string): Promise<void> => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NftOptionAddress, NftOptionContract.abi, signer);
    try {
      const transaction = await contract.purchaseNftOption(tokenId);
      await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  }
};

export const getMyAddress = async (): Promise<string> => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return await provider.getSigner().getAddress();
  }

  return "";
};
