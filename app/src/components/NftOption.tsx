import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import { FC } from "react";
import { INftOptionSummary } from "../models";

export interface NftOptionProp {
  nftOption: INftOptionSummary;
}

export const NftOption: FC<NftOptionProp> = (props) => {
  const { nftOption } = props;

  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card>
        <CardActionArea href={nftOption.urlNftOption}>
          <CardMedia
            component="img"
            height="200px"
            image={nftOption.urlNftImage}
            alt={nftOption.tokenId}
            className="card__img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {nftOption.strikePrice}
              <FontAwesomeIcon icon={faArrowRight} />
              {nftOption.amount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Collection: {nftOption.collection}
              Term: {nftOption.term.getDate()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" variant="contained" fullWidth={true}>
            Purchase
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
