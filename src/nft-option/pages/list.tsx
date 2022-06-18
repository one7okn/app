import { FormControlLabel, Grid, Switch, Toolbar } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { NftOptionCard, NftOptionCreate } from '../components';
import { INftOptionSummary } from '../models';
import { getNftOptions } from '../service';

export interface NftOptionListProp {
  myAddress: string;
}

export const NftOptionList: FC<NftOptionListProp> = (props) => {
  const { myAddress } = props;

  const [nftOptions, setNftOptions] = useState<INftOptionSummary[]>([]);
  const [isMyOption, setIsMyOption] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [isMyOption]);

  async function fetchData() {
    const nftOptionSummaries: INftOptionSummary[] = await getNftOptions(isMyOption);
    setNftOptions(nftOptionSummaries);
  }

  const myOptionChange = (): void => {
    setIsMyOption(!isMyOption);
  };

  return (
    <>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
        <FormControlLabel control={<Switch onChange={myOptionChange} />} label="My Options" />
        <NftOptionCreate fetchData={fetchData} myAddress={myAddress} />
      </Toolbar>
      <div></div>
      <Grid container spacing={2}>
        {nftOptions.map((nftOption: INftOptionSummary) => {
          return (
            <NftOptionCard nftOption={nftOption} myAddress={myAddress} fetchData={fetchData} key={nftOption.tokenId} />
          );
        })}
      </Grid>
    </>
  );
};
