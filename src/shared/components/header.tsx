import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../logo.png';
import { FC } from 'react';
import { Profile } from '.';
import { Alert, Box } from '@mui/material';

export const Header: FC = () => {
  return (
    <AppBar position="sticky" className="AppBar">
      <Alert severity="warning" variant="filled" sx={{ justifyContent: 'center' }}>
        This is a prototype in ropsten !
      </Alert>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box component="img" alt="One7okn" src={logo} sx={{ width: { xs: 180, sm: 380 } }} />
        <Profile />
      </Toolbar>
    </AppBar>
  );
};
