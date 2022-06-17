export interface INftOptionSummary {
  tokenId: string;
  owner: string;
  collection: string;
  urlNftOption: string;
  urlNftImage: string;
  strikePrice: number;
  premium: number;
  expirationDate: Date;
  purcharser: string;
}

export class NftOption {
  collection: string = '';
  urlNftOption: string = '';
  urlNftImage: string = '';
  strikePrice: number = 0;
  premium: number = 0;
  floorPrice: number = 0;
  expirationDate: Date | null = null;
}

export interface IMyNftCollections {
  collection: string;
  collectionName: string;
  urlNftImage: string;
}
