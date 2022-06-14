import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Spinner: FC = () => (
  <Box sx={{ display: "flex" }}>
    <CircularProgress />
  </Box>
);
