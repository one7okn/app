import { INftOptionSummary } from "./models";

declare var window: any;
// let NftOptionAddress = "0xe756C0DA1d60acF9CA8d7980D9080cB82283D112"; //ropsten
let NftOptionAddress = "0x6787E83E5Ad5b6118C21d8882E9BAf427c4a0d55"; //rinkeby
export const address0 = "0x0000000000000000000000000000000000000000";

export const getNftOptions = async (
  isMyOption: boolean
): Promise<INftOptionSummary[]> => {
  return [
    {
      tokenId: "1",
      owner: "string",
      collection: "string",
      urlNftOption: "string",
      urlNftImage: "string",
      strikePrice: 5,
      amount: 3,
      expirationDate: new Date(),
      purcharser: "string",
    },
    {
      tokenId: "2",
      owner: "string",
      collection: "string",
      urlNftOption: "string",
      urlNftImage: "string",
      strikePrice: 5,
      amount: 3,
      expirationDate: new Date(),
      purcharser: "string",
    },
  ];
};

export const getMyAddress = async (): Promise<string> => {
  return "";
};

export const purchaseNftOption = async (tokenId: string): Promise<void> => {};

export const executeNftOption = async (tokenId: string): Promise<void> => {};
