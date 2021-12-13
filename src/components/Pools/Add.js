import { Button, Grid, Modal, TextField } from "@mui/material";
import { usePools } from "providers/Pools";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { convertUnix } from "utils/format";
import { Box } from "@mui/system";
import { useActions, useActionState } from "hooks/useActions";
import { parseEther, parseUnits } from "@ethersproject/units";
import { useGlobal } from "providers/Global";
import poolFormData from "config/PoolFormData";

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

  const [success, handleState] = useActionState(actions);

  const [formState, setFromState] = useState({
    title: "",
    tokenAddress: "",
    allocationBusd: "",
    minAllocationBusd: "",
    maxAllocationBusd: "",
    allocationRir: "",
    price: "",
    startDate: "",
    endDate: "",
    fee: "",
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
        actions["addPool"].func(
          formState.title,
          parseEther(formState.allocationBusd),
          parseEther(formState.minAllocationBusd),
          parseEther(formState.maxAllocationBusd),
          parseEther(formState.allocationRir),
          parseEther(formState.price),
          parseUnits(`${convertUnix(formState.startDate)}`),
          parseUnits(`${convertUnix(formState.endDate)}`),
          parseEther(formState.fee)
        );

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

    handleState("addPool");
  };

  useEffect(() => {
    setOpen(false);
  }, [success]);

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

  const formData = poolFormData[context.contractType];

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
            {formData.map((field, i) => (
              <Grid item xs={12} key={i}>
                {field.type === "date" ? (
                  <>
                    <DateTimePicker
                      label={field.label}
                      value={formState[field.name]}
                      onChange={(value) =>
                        handleOnchange({ target: { name: field.name, value: value } })
                      }
                      minDate={new Date()}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </>
                ) : (
                  <TextField
                    required
                    name={field.name}
                    label={field.label}
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={formState[field.name]}
                    onChange={handleOnchange}
                  />
                )}
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

export default PoolAddButton;
