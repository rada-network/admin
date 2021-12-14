import { Button, Grid, Modal, TextField } from "@mui/material";
import { usePools } from "providers/Pools";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { convertUnix } from "utils/format";
import { Box } from "@mui/system";
import { useActions, useActionState } from "hooks/useActions";
import { parseEther } from "@ethersproject/units";
import { useGlobal } from "providers/Global";
import poolFormData from "config/PoolFormData";
import PoolModel from "model/Pool";

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

  const [formState, setFormState] = useState(PoolModel({}, ""));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnchange = ({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  const handleSave = () => {
    global.setLoading(true);

    actions["addPool"].func(
      formState.title,
      parseEther(formState.allocationBusd ?? "0"),
      parseEther(formState.minAllocationBusd ?? "0"),
      parseEther(formState.maxAllocationBusd ?? "0"),
      parseEther(formState.allocationRir ?? "0"),
      parseEther(formState.price ?? "0"),
      `${convertUnix(formState.startDate)}`,
      `${convertUnix(formState.endDate)}`,
      formState.fee
    );

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

  const formData = poolFormData;

  console.log("PoolAddButton Model", formState);

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
            {formData.map((field, i) =>
              !field.edit ? (
                field.type === "date" ? (
                  <Grid item xs={12} key={i}>
                    <DateTimePicker
                      label={field.label}
                      value={formState[field.name]}
                      onChange={(value) =>
                        handleOnchange({ target: { name: field.name, value: value } })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={field.size ? field.size : "6"} key={i}>
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
                )
              ) : null
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
