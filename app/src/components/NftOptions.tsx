import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";
import { INftOptionSummary } from "../models";
import { NftOption } from "./NftOption";

export interface NftOptionsProp {
  nftOptions: INftOptionSummary[];
}

export const NftOptions: FC<NftOptionsProp> = (props) => {
  const { nftOptions } = props;

  return (
    <div>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Grid container spacing={2}>
        {nftOptions.map((nftOption: INftOptionSummary) => {
          return <NftOption nftOption={nftOption} key={nftOption.tokenId} />;
        })}
      </Grid>
    </div>
  );
};
