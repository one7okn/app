import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { IMyNftCollections, NftOption } from '../models';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createNftOption, getCollectionStats, getMyNftCollections } from '../service';
import NormalDistribution from 'normal-distribution';
import { differenceInDays } from 'date-fns';
import { useHttpErrorHandler } from '../../shared/services';

export interface NftOptionCreateProps {
  fetchData: () => void;
  myAddress: string;
}

export const NftOptionCreate: FC<NftOptionCreateProps> = (props) => {
  const { fetchData, myAddress } = props;
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [nftOption, setNftOption] = useState<NftOption>(new NftOption());
  const [myNftCollections, setMyNftCollections] = useState<IMyNftCollections[]>([]);
  const throwError = useHttpErrorHandler();

  useEffect(() => {
    getMyNftCollections(myAddress).then((r) => {
      if (r.isSuccess) {
        setMyNftCollections(
          r.content.map<IMyNftCollections>((myNftCollection) => {
            return {
              collection: myNftCollection.slug,
              urlNftImage: myNftCollection?.primary_asset_contracts[0]?.image_url,
              collectionName: myNftCollection?.primary_asset_contracts[0]?.name,
            };
          })
        );
      } else throwError(r);
    });
  }, [throwError]);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNftOption((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    calculPremium();
  };

  const dateChange = (value: Date | null): void => {
    setNftOption((prev) => ({ ...prev, expirationDate: value }));
    calculPremium();
  };

  const selectChange = async (e: any) => {
    const collectionStats = await getCollectionStats(e.target.value.collection);
    if (collectionStats.isSuccess) {
      setNftOption((prev) => ({
        ...prev,
        collection: e.target.value.collection,
        urlNftImage: e.target.value.urlNftImage,
        floorPrice: collectionStats.content.stats.floor_price,
      }));
      calculPremium();
    } else throwError(collectionStats);
  };

  function calculPremium() {
    const normDist = new NormalDistribution();

    setNftOption((prev) => {
      if (prev.expirationDate === null || prev.strikePrice === undefined || prev.floorPrice === 0)
        return { ...prev, premium: 0 };

      //NORMSDIST(-F8)*C7*exp(-C9*(C11-C10))-NORMSDIST(-F7)*C6
      const dayNumber = differenceInDays(prev.expirationDate, new Date()) + 1;
      const amout =
        normDist.cdf(-0.01872497997) * prev.strikePrice * Math.exp(-0.001 * dayNumber) -
        normDist.cdf(-0.4155876766) * prev.floorPrice;
      return { ...prev, premium: amout };
    });
  }

  function isValid(): boolean {
    return (
      nftOption.collection !== '' &&
      nftOption.urlNftImage !== '' &&
      nftOption.strikePrice >= 0 &&
      nftOption.premium >= 0 &&
      nftOption.expirationDate !== null
    );
  }

  const save = async (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    if (isValid()) {
      await createNftOption(nftOption);
      setNftOption(new NftOption());
      fetchData();
      closeDialog();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={openDialog}>
        Create Option
      </Button>
      <Dialog open={open} onClose={closeDialog} fullWidth={true}>
        <DialogTitle>Create a put option</DialogTitle>
        <DialogContent>
          <Stack component="form" noValidate spacing={2} paddingTop="20px">
            <FormControl variant="standard" required error={isSubmit && nftOption.collection === ''}>
              <InputLabel>Collection</InputLabel>
              <Select name="collection" defaultValue={{}} onChange={selectChange}>
                {myNftCollections.map((myNftCollection: IMyNftCollections) => {
                  return (
                    <MenuItem value={myNftCollection as any} key={myNftCollection.collection}>
                      <img height="50px" src={myNftCollection.urlNftImage}></img>&nbsp;
                      {myNftCollection.collectionName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <TextField
                variant="filled"
                label="Strike price (eth)"
                value={nftOption.strikePrice}
                name="strikePrice"
                required
                error={isSubmit && !nftOption.strikePrice}
                onChange={handleChange}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 99999,
                  type: 'number',
                }}
                fullWidth
              />
              <TextField variant="filled" label="Floor price (eth)" value={nftOption.floorPrice} disabled />
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Expiration date"
                value={nftOption.expirationDate}
                minDate={new Date()}
                onChange={dateChange}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} required error={isSubmit && !nftOption.expirationDate} />
                )}
              />
            </LocalizationProvider>
            <Alert severity="info" variant="outlined">
              <AlertTitle>Premium</AlertTitle>
              The premium is <strong>{nftOption.premium}</strong> ether.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={save}>Buy</Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
