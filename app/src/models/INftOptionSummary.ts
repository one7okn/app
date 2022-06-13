export interface INftOptionSummary {
  tokenId: string;
  owner: string;
  collection: string;
  urlNftOption: string;
  urlNftImage: string;
  strikePrice: number;
  amount: number;
  expirationDate: Date;
  purcharser: string;
}
