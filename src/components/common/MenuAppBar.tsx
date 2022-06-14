import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../logo.png";
import { CreateNftOption } from "../../components";
import "./MenuAppBar.scss";
import { FC } from "react";
import { FormControlLabel, Switch } from "@mui/material";

export interface MenuAppBarProps {
  fetchData: () => void;
  myOptionChange: () => void;
}

export const MenuAppBar: FC<MenuAppBarProps> = (props) => {
  const { fetchData, myOptionChange } = props;

  return (
    <AppBar position="sticky" className="AppBar">
      <Toolbar className="AppBar__Toolbar">
        <img alt="One7okn" src={logo} className="AppBar__Toolbar__img" />
        <div>
          <FormControlLabel control={<Switch onChange={myOptionChange} />} label="My Option" />
          <CreateNftOption fetchData={fetchData} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
