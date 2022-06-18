import { FC, useEffect, useState, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { NftOptionList } from './nft-option/pages/list';
import { Header } from './shared/components';
import Web3Modal from 'web3modal';
import Portis from '@portis/web3';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  theme: 'dark',
  providerOptions: {
    portis: {
      package: Portis, // required
      options: {
        id: '8e23465f-c9a7-410a-92df-18b2e3d1c38f',
        network: 'maticMumbai',
      },
    },
  },
});

export const App: FC = () => {
  const [myAddress, setMyAddress] = useState('');
  const [injectedProvider, setInjectedProvider] = useState<ethers.providers.Web3Provider>();

  const logoutOfWeb3Modal = () => {
    web3Modal.clearCachedProvider();
    setInjectedProvider(undefined);
    setMyAddress('');
  };

  const loadWeb3Modal = useCallback(async () => {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    setInjectedProvider(provider);
    setMyAddress(await provider.getSigner().getAddress());
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  return (
    <div className="App">
      <Header
        myAddress={myAddress}
        web3Modal={web3Modal}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <Routes>
        <Route path="/" element={<NftOptionList myAddress={myAddress} />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
};
