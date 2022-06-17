import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0f85cc",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#000000",
          backgroundImage: "none",
        },
      },
    },
  },
});

root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
