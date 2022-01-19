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
import { convertUnix } from "utils/format";
import argsGenerator from "utils/pool";

const RadaAdd = () => {
  const context = useRada();
  const global = useGlobal();

  const [open, setOpen] = useState(false);

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: "addOrUpdatePool",
    },
  ]);

  const [, , handleState] = useActionState(actions);

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

    actions["addOrUpdatePool"].func(...argsGenerator(context.contractType, formState));

    handleState("addOrUpdatePool");
  };

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
            {formGenerator(radaFormAdd[context.contractType], formState, handleOnchange)}
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
