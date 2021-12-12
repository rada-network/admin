import { Button, Grid, Modal, TextField } from "@mui/material";
import { usePools } from "providers/Pools";
import { useState } from "react";
import { DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { convertUnix } from "utils/format";
import { Box } from "@mui/system";
import { useActions } from "hooks/useActions";
import { parseEther, parseUnits } from "@ethersproject/units";
import { useGlobal } from "providers/Global";

const PoolAddButton = (props) => {
  const context = usePools();
  const global = useGlobal();

  const [open, setOpen] = useState(false);

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: "addPool",
    },
  ]);

  const [formState, setFromState] = useState({
    title: "",
    tokenAddress: "",
    allocationBusd: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnchange = ({ target }) => {
    setFromState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  const handleSave = () => {
    console.log(global);
    global.setLoading(true);

    switch (context.contractType) {
      case "poolClaim":
        actions["addPool"].func(
          formState.title,
          formState.tokenAddress,
          parseEther(formState.allocationBusd),
          parseEther(formState.price)
        );
        break;

      case "poolRIR":
        break;

      case "poolWhitelist":
        actions["addPool"].func(
          formState.title,
          parseEther(formState.allocationBusd),
          parseEther(formState.price),
          parseUnits(`${convertUnix(formState.startDate)}`),
          parseUnits(`${convertUnix(formState.endDate)}`)
        );
        break;

      default:
        break;
    }
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

  console.log("Pools", context);

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
            {context.contractType === "poolClaim" && (
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

            {context.contractType !== "poolClaim" && (
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
