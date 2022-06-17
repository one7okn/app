import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { NftOptionList } from './nft-option/pages/list';
import { getMyAddress } from './nft-option/service';
import { Header } from './shared/components';

export const App: FC = () => {
  const [myAddress, setMyAddress] = useState('');

  useEffect(() => {
    getMyAddress().then((myAddress) => setMyAddress(myAddress));
  }, []);

  return (
    <div className="App">
      <Header myAddress={myAddress} />
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
