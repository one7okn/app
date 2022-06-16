import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { NftOptionCard } from "../components";
import { INftOptionSummary } from "../models";
import { getMyAddress, getNftOptions } from "../service";

export const NftOptionList: FC = () => {
  const [nftOptions, setNftOptions] = useState<INftOptionSummary[]>([]);
  const [myAddress, setMyAddress] = useState("");
  const [isMyOption, setIsMyOption] = useState<boolean>(false);

  useEffect(() => {
    getMyAddress().then((myAddress) => setMyAddress(myAddress));
  }, []);

  useEffect(() => {
    fetchData();
  }, [isMyOption]);

  async function fetchData() {
    const nftOptionSummaries: INftOptionSummary[] = await getNftOptions(
      isMyOption
    );
    setNftOptions(nftOptionSummaries);
  }

  const myOptionChange = (): void => {
    setIsMyOption(!isMyOption);
  };

  return (
    <Grid container spacing={2}>
      {nftOptions.map((nftOption: INftOptionSummary) => {
        return (
          <NftOptionCard
            nftOption={nftOption}
            myAddress={myAddress}
            fetchData={fetchData}
            key={nftOption.tokenId}
          />
        );
      })}
    </Grid>
  );
};
