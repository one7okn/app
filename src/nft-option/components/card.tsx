import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { INftOptionSummary } from '../models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { address0, executeNftOption, purchaseNftOption } from '../service';

export interface NftOptionProp {
  nftOption: INftOptionSummary;
  myAddress: string;
  fetchData: () => void;
}

export const NftOptionCard: FC<NftOptionProp> = (props) => {
  const { nftOption, myAddress, fetchData } = props;

  const underwrite = async (e: any) => {
    e.preventDefault();
    await purchaseNftOption(nftOption.tokenId);
    fetchData();
  };

  const execute = async (e: any) => {
    e.preventDefault();
    await executeNftOption(nftOption.tokenId);
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
                <Tooltip title="Strike Price">
                  <span>
                    {nftOption.strikePrice + ' '}
                    <FontAwesomeIcon icon={faEthereum} />
                  </span>
                </Tooltip>
                <Tooltip title={'Premium = ' + nftOption.premium}>
                  <span>
                    {Math.round(nftOption.premium * 1000) / 1000 + ' '}
                    <FontAwesomeIcon icon={faEthereum} />
                  </span>
                </Tooltip>
              </Stack>
            </Typography>
            <Tooltip title="Collection">
              <span>{nftOption.collection}</span>
            </Tooltip>
            <Tooltip title="Expiration date">
              <Typography variant="body2" color="text.secondary">
                {nftOption.expirationDate.toDateString()}
              </Typography>
            </Tooltip>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            fullWidth={true}
            disabled={nftOption.purcharser === address0 || nftOption.owner !== myAddress}
            onClick={execute}>
            Execute
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            fullWidth={true}
            disabled={nftOption.purcharser !== address0 || nftOption.owner === myAddress}
            onClick={underwrite}>
            Underwrite
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
