import { INftOptionSummary } from "../models";

export const getNftOptions = async (): Promise<INftOptionSummary[]> => {
  return [
    {
      tokenId: "1",
      urlNftOption:
        "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
      urlNftImage:
        "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b6/Amazing_Spider-Man_-_Profile_Pic.png",
      collection: "toto",
      strikePrice: 50,
      amount: 0.1,
      term: new Date()
    },
    {
      tokenId: "2",
      urlNftOption:
        "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
      urlNftImage:
        "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg",
      collection: "toto",
      strikePrice: 50,
      amount: 0.1,
      term: new Date()
    },
    {
      tokenId: "3",
      urlNftOption:
        "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
      urlNftImage:
        "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg",
      collection: "toto",
      strikePrice: 50,
      amount: 0.1,
      term: new Date()
    },
    {
      tokenId: "4",
      urlNftOption:
        "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
      urlNftImage:
        "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg",
      collection: "toto",
      strikePrice: 50,
      amount: 0.1,
      term: new Date()
    },
    {
      tokenId: "5",
      urlNftOption:
        "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
      urlNftImage:
        "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg",
      collection: "toto",
      strikePrice: 50,
      amount: 0.1,
      term: new Date()
    },
    {
      tokenId: "6",
      urlNftOption:
        "https://testnets.opensea.io/assets/rinkeby/0x388F486dBcBe05029bA7adF784459B580b427032/12",
      urlNftImage:
        "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg",
      collection: "toto",
      strikePrice: 50,
      amount: 0.1,
      term: new Date()
    }
  ];
};
