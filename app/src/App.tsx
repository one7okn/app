import { useEffect, useState } from "react";
import "./App.scss";
import { NftOptions, Spinner } from "./components";
import { INftOptionSummary } from "./models";
import { getNftOptions } from "./services";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MenuAppBar } from "./components";

function App() {
  const [nftOptions, setNftOptions] = useState<INftOptionSummary[]>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const nftOptionSummaries: INftOptionSummary[] = await getNftOptions();
    setNftOptions(nftOptionSummaries);
  }

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
        <MenuAppBar fetchData={fetchData} />
        <NftOptions nftOptions={nftOptions} />
      </main>
    </ThemeProvider>
  );
}

export default App;
