import "./MenuAppBar.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from "@mui/material";
import { ChangeEvent, isValidElement, useState } from "react";
import { NftOption } from "../../models/NftOption";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ethers } from "ethers";
import NftGame from "./artifacts/contracts/NftGame.sol/NftGame.json";

let NftGameAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function CreateOption() {
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [nftOption, setNftOption] = useState<NftOption>(new NftOption());

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ): void => {
    setNftOption((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dateChange = (value: Date | null): void => {
    setNftOption((prev) => ({ ...prev, ["expirationDate"]: value }));
  };

  function isValid(): boolean {
    return (
      nftOption.collection !== "" &&
      nftOption.urlNftImage !== "" &&
      nftOption.strikePrice >= 0 &&
      nftOption.amount >= 0 &&
      nftOption.expirationDate !== null
    );
  }

  const save = (e: any): void => {
    e.preventDefault();
    setIsSubmit(true);
    if (isValid()) {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(NftGameAddress, NftGame.abi, provider.getSigner());
        try {
          const transaction = await contract.mint(type, {
            from: await signer.getAddress(),
            value: cost
          });
          await transaction.wait();
          setSuccess("Votre combatant a bien était créer ! ");
          fetchData();
        } catch (err) {
          setError("Une erreur est survenue.");
        }
      }
      setNftOption(new NftOption());
      closeDialog();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={openDialog}>
        Create Option
      </Button>
      <Dialog open={open} onClose={closeDialog} fullWidth={true}>
        <DialogTitle>Create a option</DialogTitle>
        <DialogContent>
          <Stack component="form" noValidate spacing={2} paddingTop="20px">
            <FormControl required error={isSubmit && nftOption.collection === ""}>
              <InputLabel>Collection</InputLabel>
              <Select name="collection" value={nftOption.collection} onChange={handleChange}>
                <MenuItem value="CryptoPunks">CryptoPunks</MenuItem>
                <MenuItem value="goblintown.wtf">goblintown</MenuItem>
                <MenuItem value="troll-town.wtf">troll-town.wtf</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="url"
              label="Url NFT picture"
              value={nftOption.urlNftImage}
              name="urlNftImage"
              required
              error={isSubmit && nftOption.urlNftImage === ""}
              onChange={handleChange}
            />
            <TextField
              label="Strike price"
              value={nftOption.strikePrice}
              name="strikePrice"
              required
              error={isSubmit && !nftOption.strikePrice}
              onChange={handleChange}
              inputProps={{
                step: 1,
                min: 0,
                max: 99999,
                type: "number"
              }}
            />
            <TextField
              label="Amount"
              value={nftOption.amount}
              name="amount"
              required
              error={isSubmit && !nftOption.amount}
              onChange={handleChange}
              inputProps={{
                step: 1,
                min: 0,
                max: 99999,
                type: "number"
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Expiration date"
                value={nftOption.expirationDate}
                minDate={new Date()}
                onChange={dateChange}
                renderInput={(params) => (
                  <TextField {...params} required error={isSubmit && !nftOption.expirationDate} />
                )}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={save}>Save</Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
