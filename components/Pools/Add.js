import { useAuth } from "@hooks/useAuth";

import { useContractFunction } from "@hooks/useContract";
import { Button, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { parseEther, parseUnits } from "@ethersproject/units";
import { usePools } from "providers/Pools";
import { DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { convertUnix } from "@utils/format";

const PoolAddButton = (props) => {
  const context = usePools();
  const auth = useAuth();

  const [open, setOpen] = useState(false);

  const [formState, setFromState] = useState({
    title: "",
    tokenAddress: "",
    allocationBusd: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  const [stateSave, saveAction] = useContractFunction(
    context.contractInstance,
    props.type === "claimonly" ? "addClaimOnlyPool" : "addPayablePool"
  );

  const handleStatus = async (state) => {
    switch (state.status) {
      case "Success":
        auth.setLoading(false);
        setOpen(false);
        break;
      case "Mining":
        auth.setLoading(true);
        break;
      case "Exception":
        toast(state.errorMessage);
        auth.setLoading(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleStatus(stateSave);
  }, [stateSave]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    auth.setLoading(true);
    console.log("handleSave", formState);

    if (props.type === "claimonly") {
      saveAction(
        formState.title,
        formState.tokenAddress,
        parseEther(formState.allocationBusd),
        parseEther(formState.price)
      );
    } else {
      saveAction(
        formState.title,
        parseEther(formState.allocationBusd),
        parseEther(formState.price),
        parseUnits(`${convertUnix(formState.startDate)}`),
        parseUnits(`${convertUnix(formState.endDate)}`)
      );
    }
  };

  const handleOnchange = ({ target }) => {
    setFromState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  console.log("PoolAddButton render", props, formState);

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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Button variant="contained" onClick={handleOpen}>
        {props.text}
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Box sx={style}>
          <h2 id="add-modal-title">Add a Pool</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formState.title}
                onChange={handleOnchange}
              />
            </Grid>
            {props.type === "claimonly" && (
              <Grid item xs={12}>
                <TextField
                  required
                  id="tokenAddress"
                  name="tokenAddress"
                  label="Token Address"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={formState.tokenAddress}
                  onChange={handleOnchange}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                id="allocationBusd"
                name="allocationBusd"
                label="Allocation Busd"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formState.allocationBusd}
                onChange={handleOnchange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="price"
                name="price"
                label="Price"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formState.price}
                onChange={handleOnchange}
              />
            </Grid>

            {props.type === "payable" && (
              <>
                <Grid item xs={12}>
                  <DateTimePicker
                    label="Start Date"
                    value={formState.startDate}
                    onChange={(value) =>
                      handleOnchange({ target: { name: "startDate", value: value } })
                    }
                    minDate={new Date()}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <DateTimePicker
                    label="End Date"
                    value={formState.endDate}
                    onChange={(value) =>
                      handleOnchange({ target: { name: "endDate", value: value } })
                    }
                    minDate={new Date()}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </>
            )}

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

export default PoolAddButton;
