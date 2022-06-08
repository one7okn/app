import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../logo.png";
import "./MenuAppBar.scss";
import CreateOption from "./CreateOption";

export default function MenuAppBar() {
  return (
    <AppBar position="sticky" className="AppBar">
      <Toolbar className="AppBar__Toolbar">
        <img alt="One7okn" src={logo} className="AppBar__Toolbar__img" />
        <CreateOption />
      </Toolbar>
    </AppBar>
  );
}
