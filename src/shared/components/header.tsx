import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../logo.png";
import "./header.scss";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <AppBar position="sticky" className="AppBar">
      <Toolbar className="AppBar__Toolbar">
        <img alt="One7okn" src={logo} className="AppBar__Toolbar__img" />
      </Toolbar>
    </AppBar>
  );
};
