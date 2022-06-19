import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { NftOptionList } from './nft-option/pages/list';
import { Header } from './shared/components';
import { WagmiConfig, createClient, useAccount } from 'wagmi';

const client = createClient();

export const App: FC = () => {
  return (
    <div className="App">
      <WagmiConfig client={client}>
        <Header />
        <Routes>
          <Route path="/" element={<NftOptionList />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </WagmiConfig>
    </div>
  );
};
