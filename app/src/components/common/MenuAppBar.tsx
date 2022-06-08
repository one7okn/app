import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../logo.png";
import "./MenuAppBar.scss";
import { Button } from "@mui/material";

export default function MenuAppBar() {
  const connect = () => {};

  return (
    <AppBar position="sticky" className="AppBar">
      <Toolbar className="AppBar__Toolbar">
        <img alt="One7okn" src={logo} className="AppBar__Toolbar__img" />
        <Button variant="contained" onClick={connect}>
          Connect wallet
        </Button>
      </Toolbar>
    </AppBar>
  );
}
