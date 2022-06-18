import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../logo.png';
import './header.scss';
import { FC } from 'react';
import { Chip } from '@mui/material';
import Web3Modal from 'web3modal';

export interface HeaderProp {
  myAddress: string;
  web3Modal: Web3Modal;
  loadWeb3Modal: () => void;
  logoutOfWeb3Modal: () => void;
}

export const Header: FC<HeaderProp> = (props) => {
  const { myAddress, web3Modal, loadWeb3Modal, logoutOfWeb3Modal } = props;

  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(<Chip label="Logout" onClick={logoutOfWeb3Modal} variant="outlined" />);
    } else {
      modalButtons.push(<Chip label="Connect Wallet" onClick={loadWeb3Modal} variant="outlined" />);
    }
  }

  return (
    <AppBar position="sticky" className="AppBar">
      <Toolbar className="AppBar__Toolbar">
        <img alt="One7okn" src={logo} className="AppBar__Toolbar__img" />
        <span>{myAddress}</span>
        {modalButtons}
      </Toolbar>
    </AppBar>
  );
};
