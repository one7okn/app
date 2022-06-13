import { useEffect, useState } from "react";
import "./App.scss";
import { NftOptions, Spinner } from "./components";
import { INftOptionSummary } from "./models";
import { getMyAddress, getNftOptions } from "./services";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MenuAppBar } from "./components";

function App() {
  const [nftOptions, setNftOptions] = useState<INftOptionSummary[]>([]);
  const [myAddress, setMyAddress] = useState("");
  const [isMyOption, setIsMyOption] = useState<boolean>(false);

  useEffect(() => {
    getMyAddress().then((myAddress) => setMyAddress(myAddress));
  }, []);

  useEffect(() => {
    fetchData();
  }, [isMyOption]);

  async function fetchData() {
    const nftOptionSummaries: INftOptionSummary[] = await getNftOptions(isMyOption);
    setNftOptions(nftOptionSummaries);
  }

  const myOptionChange = (): void => {
    setIsMyOption(!isMyOption);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#0f85cc"
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: "#000000",
            backgroundImage: "none"
          }
        }
      }
    }
  });

  if (!nftOptions) return <Spinner />;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main className="App">
        <MenuAppBar fetchData={fetchData} myOptionChange={myOptionChange} />
        <NftOptions nftOptions={nftOptions} myAddress={myAddress} fetchData={fetchData} />
      </main>
    </ThemeProvider>
  );
}

export default App;
