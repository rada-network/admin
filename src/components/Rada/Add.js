import { Box, Button, Grid, Modal, Stack } from "@mui/material";
import { radaFormAdd } from "config/RadaForm";
import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { useRada } from "providers/Rada";
import { useCallback, useEffect, useState } from "react";
import modalStyle from "style/modal";
import { parseEther } from "@ethersproject/units";
import RadaAuction from "model/RadaAuction";
import formGenerator from "utils/form";
import { useNavigate, useParams } from "react-router-dom";
import useABI from "hooks/useABI";

const RadaAdd = () => {
  const context = useRada();
  const global = useGlobal();
  const navigate = useNavigate();
  const { type } = useParams();

  const [open, setOpen] = useState(false);

  const openBoxContract = useABI("openbox");

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: "addPool",
    },

    {
      contractInstance: openBoxContract.contractInstance,
      func: "addPool",
      key: "addPoolOpenBox",
    },
  ]);

  const [lastAction, success, handleState] = useActionState(actions);

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

    actions["addPool"].func(
      formState.poolId,
      parseEther(formState.startPrice ?? "0"),
      formState.addressItem,
      formState.isSaleToken
    );

    handleState("addPool");
  };

  useEffect(() => {
    if (success) {
      if (lastAction === "addPool") {
        global.setLoading(true);
        actions["addPoolOpenBox"].func(
          formState.poolId,
          formState.nftAddress,
          formState.isSaleToken,
          formState.isSaleToken
            ? formState.addressItem
            : "0x0000000000000000000000000000000000000000",
          !formState.isSaleToken
            ? formState.addressItem
            : "0x0000000000000000000000000000000000000000"
        );
        handleState("addPoolOpenBox");
      } else if (lastAction === "addPoolOpenBox") {
        setOpen(false);
        navigate(`${process.env.PUBLIC_URL}/rada/${type}/${formState.poolId}`);
      }
    }
  }, [lastAction, success]);

  console.log("openBoxContract", openBoxContract);

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
            {formGenerator(radaFormAdd, formState, handleOnchange)}
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
