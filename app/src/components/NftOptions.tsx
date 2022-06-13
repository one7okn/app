import { Grid } from "@mui/material";
import { FC } from "react";
import { INftOptionSummary } from "../models";
import { NftOption } from "./NftOption";

export interface NftOptionsProp {
  nftOptions: INftOptionSummary[];
  myAddress: string;
  fetchData: () => void;
}

export const NftOptions: FC<NftOptionsProp> = (props) => {
  const { nftOptions, myAddress, fetchData } = props;

  return (
    <div>
      <Grid container spacing={2}>
        {nftOptions.map((nftOption: INftOptionSummary) => {
          return (
            <NftOption
              nftOption={nftOption}
              myAddress={myAddress}
              fetchData={fetchData}
              key={nftOption.tokenId}
            />
          );
        })}
      </Grid>
    </div>
  );
};
