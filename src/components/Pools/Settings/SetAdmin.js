import { Button, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";

import { usePoolSettings } from "providers/PoolSettings";
import { useGlobal } from "providers/Global";
import { useActions, useActionState } from "hooks/useActions";

const PoolSetAdmin = () => {
  const auth = useGlobal();

  const [address, setAddress] = useState();

  const { contractInstance } = usePoolSettings();

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "setAdmin",
    },
    {
      contractInstance: contractInstance,
      func: "removeAdmin",
    },
    {
      contractInstance: contractInstance,
      func: "setApprover",
    },
    {
      contractInstance: contractInstance,
      func: "removeApprover",
    },
  ]);

  const [success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    auth.setLoading(true);

    actions[action].func(address);

    handleState(action);
  };

  const handleOnchange = ({ target }) => {
    setAddress(target.value);
  };

  console.log("PoolSettings render", address);

  return (
    <Grid container spacing={3}>
      <Grid item xs="12">
        <TextField
          name="adminAddress"
          label="Address"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={address}
          onChange={handleOnchange}
        />
      </Grid>
      <Grid item xs="12">
        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" color="success" onClick={() => handlePool("setAdmin")}>
            Set Admin
          </Button>
          <Button variant="contained" color="success" onClick={() => handlePool("removeAdmin")}>
            Remove Admin
          </Button>

          <Button variant="contained" color="success" onClick={() => handlePool("setApprover")}>
            Set Approver
          </Button>
          <Button variant="contained" color="success" onClick={() => handlePool("removeApprover")}>
            Remove Approver
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PoolSetAdmin;
