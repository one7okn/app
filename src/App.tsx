import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NftOptionList } from './nft-option/pages/list';
import { Header } from './shared/components';
import { WagmiConfig, createClient } from 'wagmi';
import { Box } from '@mui/material';

const client = createClient();

export const App: FC = () => {
  return (
    <Box height="100vh" sx={{ backgroundColor: '#000000' }}>
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
    </Box>
  );
};
