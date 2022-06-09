import { INftOptionSummary, NftOption } from "../models";
import { ethers } from "ethers";
import NftOptionContract from "../artifacts/contracts/Option.sol/Option.json";

declare var window: any;
let NftOptionAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

export const getNftOptions = async (): Promise<INftOptionSummary[]> => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(NftOptionAddress, NftOptionContract.abi, provider);
    try {
      const nftOptions = await contract.getNftOptions();
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
            : null
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
