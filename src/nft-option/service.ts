import { ethers } from 'ethers';
import NftOptionContract from '../artifacts/contracts/NftOption.sol/NftOption.json';
import { RequestResponse } from '../shared/models';
import { httpGet } from '../shared/services';
import { INftOptionSummary, NftOption } from './models';

declare var window: any;
let NftOptionAddress = '0xafFAF919A146C8bDB421Ede20ef67eDf59885012'; //ropsten
// let NftOptionAddress = '0x92BF445B012fe25dff2F7aa99abc4987BC6207f8'; //rinkeby
// let NftOptionAddress = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6';
export const address0 = '0x0000000000000000000000000000000000000000';

export const getNftOptions = async (isMyOption: boolean): Promise<INftOptionSummary[]> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(NftOptionAddress, NftOptionContract.abi, signer);
  try {
    const nftOptions = await contract.getNftOptions();
    // console.log(nftOptions);
    const signerAddress = await signer.getAddress();
    return nftOptions
      .filter((nftOption: any) => nftOption.tokenId > 0)
      .filter((nftOption: any) => (isMyOption ? nftOption.owner === signerAddress : true))
      .map((nftOption: any) => ({
        ...nftOption,
        strikePrice: ethers.utils.formatEther(nftOption.strikePrice),
        premium: ethers.utils.formatEther(nftOption.premium),
        expirationDate: new Date(nftOption.expirationDate * 1000),
      }));
  } catch (err) {
    console.log(err);
  }

  return [];
};

export const createNftOption = async (nftOption: NftOption): Promise<void> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(NftOptionAddress, NftOptionContract.abi, signer);
  try {
    const transaction = await contract.createNftOption(
      {
        tokenId: 0, //Caculate by the contract
        owner: address0, //Caculate by the contract
        collection: nftOption.collection,
        urlNftOption: nftOption.urlNftOption,
        urlNftImage: nftOption.urlNftImage,
        strikePrice: ethers.utils.parseUnits(nftOption.strikePrice.toString()),
        premium: ethers.utils.parseUnits(nftOption.premium.toString()),
        expirationDate: nftOption.expirationDate ? Math.floor(nftOption.expirationDate.getTime() / 1000) : null,
        purcharser: address0,
      },
      {
        from: await signer.getAddress(),
      }
    );
    await transaction.wait();
  } catch (err) {
    console.log(err);
  }
};

export const purchaseNftOption = async (tokenId: string): Promise<void> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(NftOptionAddress, NftOptionContract.abi, signer);
  try {
    const transaction = await contract.purchaseNftOption(tokenId);
    await transaction.wait();
  } catch (err) {
    console.log(err);
  }
};

export const executeNftOption = async (tokenId: string): Promise<void> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(NftOptionAddress, NftOptionContract.abi, signer);
  try {
    const transaction = await contract.executeNftOption(tokenId);
    await transaction.wait();
  } catch (err) {
    console.log(err);
  }
};

export const getMyNftCollections = async (myAddress: string): Promise<RequestResponse<any[]>> => {
  if (myAddress === '') return { isSuccess: true, content: [], status: 0 };
  return await httpGet(`https://api.opensea.io/api/v1/collections?asset_owner=${myAddress}`);
};

export const getCollectionStats = async (collection: string): Promise<RequestResponse<any>> => {
  return await httpGet(`https://api.opensea.io/api/v1/collection/${collection}/stats`);
};
