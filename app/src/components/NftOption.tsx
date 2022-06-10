import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { FC } from "react";
import { INftOptionSummary } from "../models";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { address0, purchaseNftOption } from "../services";

export interface NftOptionProp {
  nftOption: INftOptionSummary;
  myAddress: string;
  fetchData: () => void;
}

export const NftOption: FC<NftOptionProp> = (props) => {
  const { nftOption, myAddress, fetchData } = props;

  const purchase = async (e: any) => {
    e.preventDefault();
    await purchaseNftOption(nftOption.tokenId);
    fetchData();
  };

  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card>
        <CardActionArea href={nftOption.urlNftOption} target="_blank">
          <CardMedia
            component="img"
            height="200px"
            image={nftOption.urlNftImage}
            alt={nftOption.tokenId}
            className="card__img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Stack direction="row" justifyContent="space-between">
                {nftOption.strikePrice}
                <ArrowRightAltIcon />
                {nftOption.amount}
              </Stack>
            </Typography>
            {nftOption.collection}
            <Typography variant="body2" color="text.secondary">
              {nftOption.expirationDate.toDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            fullWidth={true}
            disabled={nftOption.purcharser !== myAddress}
            onClick={purchase}>
            Execute
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            fullWidth={true}
            disabled={nftOption.purcharser !== address0}
            onClick={purchase}>
            Purchase
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
