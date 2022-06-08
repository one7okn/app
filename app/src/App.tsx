import { useEffect, useState } from "react";
import "./App.scss";
import { NftOptions, Spinner } from "./components";
import { INftOptionSummary } from "./models";
import { getNftOptions } from "./services";
import logo from "./logo.png";
import {
  AppBar,
  Box,
  Button,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuAppBar from "./components/common/MenuAppBar";

const pages = ["Products", "Pricing", "Blog"];

function App() {
  const [nftOptions, setNftOptions] = useState<INftOptionSummary[]>();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    getNftOptions().then((nftOptionSummaries: INftOptionSummary[]) => {
      setNftOptions(nftOptionSummaries);
    });
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#0f85cc"
      }
    }
  });

  if (!nftOptions) return <Spinner />;

  return (
    <ThemeProvider theme={darkTheme}>
      <main className="App">
        <MenuAppBar />
        {/* <AppBar position="sticky" className="App__AppBar">
          <Toolbar disableGutters={true}>
            <img alt="One7okn" src={logo} className="App__AppBar__img" />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar> */}
        <NftOptions nftOptions={nftOptions} />
      </main>
    </ThemeProvider>
  );
}

export default App;
