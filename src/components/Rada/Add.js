import { Box, Button, Grid, Modal, Stack } from "@mui/material";
import radaForm from "config/RadaForm";
import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { useRada } from "providers/Rada";
import { useCallback, useEffect, useState } from "react";
import modalStyle from "style/modal";
import { parseEther } from "@ethersproject/units";
import RadaAuction from "model/RadaAuction";
import formGenerator from "utils/form";
import { useNavigate } from "react-router-dom";

const RadaAdd = () => {
  const context = useRada();
  const global = useGlobal();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: "addPool",
    },
  ]);

  const [success, handleState] = useActionState(actions);

  const [formState, setFormState] = useState(RadaAuction({}));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnchange = useCallback(({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  }, []);

  const handleSave = () => {
    global.setLoading(true);

    switch (context.contractType) {
      case "auction":
        actions["addPool"].func(
          formState.poolId,
          parseEther(formState.startPrice ?? "0"),
          formState.addressItem,
          formState.isSaleToken
        );

        break;
      case "fixedswap":
        actions["addPool"].func(
          formState.poolId,
          formState.title,
          parseEther(formState.startPrice ?? "0"),
          formState.addressItem,
          formState.isSaleToken
        );
        break;
      default:
        break;
    }

    handleState("addPool");
  };

  useEffect(() => {
    setOpen(false);
    // navigate(`${process.env.PUBLIC_URL}/rada/${formState.poolId}`);
  }, [success]);

  const formData = radaForm;

  return (
    <Stack direction="row" justifyContent="end">
      <Button variant="contained" onClick={handleOpen}>
        Add new Pool
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="add-modal-title">Add a Pool</h2>
          <Grid container spacing={3}>
            {formGenerator(formData, formState, handleOnchange, true)}
            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
              <Button onClick={handleSave} variant="contained" sx={{ mt: 3, ml: 1 }}>
                Add
              </Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Stack>
  );
};

export default RadaAdd;
