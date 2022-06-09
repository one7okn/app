import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../logo.png";
import { CreateNftOption } from "../../components";
import "./MenuAppBar.scss";
import { FC } from "react";

export interface MenuAppBarProps {
  fetchData: () => void;
}

export const MenuAppBar: FC<MenuAppBarProps> = (props) => {
  const { fetchData } = props;

  return (
    <AppBar position="sticky" className="AppBar">
      <Toolbar className="AppBar__Toolbar">
        <img alt="One7okn" src={logo} className="AppBar__Toolbar__img" />
        <CreateNftOption fetchData={fetchData} />
      </Toolbar>
    </AppBar>
  );
};
