import { Box, Button, Grid, Modal, Stack } from "@mui/material";
import radaAuctionForm from "config/RadaAuctionForm";
import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { useRadaAuction } from "providers/RadaAuction";
import { useCallback, useEffect, useState } from "react";
import modalStyle from "style/modal";
import { parseEther } from "@ethersproject/units";
import RadaAuctionModel from "model/RadaAuction";
import formGenerator from "utils/form";

const RadaAuctionAdd = (props) => {
  const context = useRadaAuction();
  const global = useGlobal();

  const [open, setOpen] = useState(false);

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: "addPool",
    },
  ]);

  const [success, handleState] = useActionState(actions);

  const [formState, setFormState] = useState(RadaAuctionModel({}));

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

    actions["addPool"].func(
      formState.poolId,
      parseEther(formState.startPrice ?? "0"),
      formState.addressItem,
      formState.isSaleToken === "true"
    );

    handleState("addPool");
  };

  useEffect(() => {
    setOpen(false);
  }, [success]);

  const formData = radaAuctionForm;

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

export default RadaAuctionAdd;
