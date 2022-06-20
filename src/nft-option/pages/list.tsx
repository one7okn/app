import { FormControlLabel, Grid, Switch, Toolbar } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { NftOptionCard, NftOptionCreate } from '../components';
import { INftOptionSummary } from '../models';
import { getNftOptions } from '../service';

export const NftOptionList: FC = () => {
  const { data: account } = useAccount();
  const [nftOptions, setNftOptions] = useState<INftOptionSummary[]>([]);
  const [isMyOption, setIsMyOption] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<string>('');

  useEffect(() => {
    setMyAddress(account?.address || '');
  }, [account]);

  useEffect(() => {
    fetchData().then();
  }, [isMyOption, myAddress]);

  async function fetchData() {
    setNftOptions(myAddress ? await getNftOptions(isMyOption) : []);
  }

  const myOptionChange = (): void => {
    setIsMyOption(!isMyOption);
  };

  return (
    <>
      {myAddress && (
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
          <FormControlLabel control={<Switch onChange={myOptionChange} />} label="My Options" />
          <NftOptionCreate fetchData={fetchData} myAddress={myAddress} />
        </Toolbar>
      )}
      <Grid container spacing={2} bgcolor="black">
        {nftOptions.map((nftOption: INftOptionSummary) => {
          return (
            <NftOptionCard nftOption={nftOption} myAddress={myAddress} fetchData={fetchData} key={nftOption.tokenId} />
          );
        })}
      </Grid>
    </>
  );
};
