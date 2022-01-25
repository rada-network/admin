import { Box, Button, Grid, Modal, Stack } from "@mui/material";
import { radaFormAdd } from "config/RadaForm";
import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { useRada } from "providers/Rada";
import { useCallback, useEffect, useState } from "react";
import modalStyle from "style/modal";
import RadaAuctionModel from "model/RadaAuction";
import formGenerator from "utils/form";
import { useNavigate } from "react-router-dom";

import argsGenerator from "utils/pool";
import useWhitelistHook from "hooks/useWhitelist";

const RadaAdd = () => {
  const context = useRada();
  const global = useGlobal();
  const navigate = useNavigate();
  const whitelistIds = useWhitelistHook();
  const [open, setOpen] = useState(false);

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: "addOrUpdatePool",
    },
    {
      contractInstance: context.contractInstance,
      func: "addPool",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  useEffect(() => {
    if (success) {
      setOpen(false);
      navigate(`${process.env.PUBLIC_URL}/rada/${context.contractType}/${formState.poolId}`);
    }
  }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleSave = async () => {
    global.setLoading(true);

    try {
      const args = await argsGenerator(context.contractType, formState);
      if (context.contractType === "nftClaim" || context.contractType === "randomizeByRarity") {
        actions["addPool"].func(...args);
        handleState("addPool");
      } else {
        actions["addOrUpdatePool"].func(...args);
        handleState("addOrUpdatePool");
      }

      console.log("handleSave", args);
    } catch (error) {}
  };

  const form = radaFormAdd[context.contractType].map((item) => {
    if (item.name === "whitelistIds") {
      item.options = whitelistIds;
    }
    return item;
  });

  console.log("formState", formState);

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
            {formGenerator(form, formState, handleOnchange)}
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
