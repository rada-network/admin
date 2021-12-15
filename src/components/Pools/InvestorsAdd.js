import { Button, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { useState } from "react";
import investorFormData from "config/InvestorFormData";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const PoolInvestorsAdd = (props) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    address: "",
    amountBusd: "",
    allocationBusd: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.onSave(formState);
  };

  const handleOnchange = ({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  console.log("PoolInvestorsAdd render");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Box sx={style}>
          <h2 id="add-modal-title">Add a Investor</h2>
          <Grid container spacing={3}>
            {investorFormData.map((field, i) => (
              <Grid item xs="12" key={i}>
                <TextField
                  name={field.name}
                  label={field.label}
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={formState[field.name]}
                  onChange={handleOnchange}
                />
              </Grid>
            ))}

            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
              <Button onClick={handleSave} variant="contained" sx={{ mt: 3, ml: 1 }}>
                Add
              </Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default PoolInvestorsAdd;
