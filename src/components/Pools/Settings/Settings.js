import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { usePoolSettings } from "providers/PoolSettings";
import { useGlobal } from "providers/Global";
import { useActions, useActionState } from "hooks/useActions";

const PoolSettings = () => {
  const auth = useGlobal();
  const [claimable, setClaimable] = useState(true);
  const [formState, setFormState] = useState({
    withdrawAddress: "",
    requestWithdrawAddress: "",
  });

  const { contractInstance, isApprover, isAdmin } = usePoolSettings();

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "setClaimable",
    },
    {
      contractInstance: contractInstance,
      func: "requestChangeWithdrawAddress",
    },
    {
      contractInstance: contractInstance,
      func: "approveRequestChange",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    auth.setLoading(true);

    switch (action) {
      case "setClaimable":
        console.log("setClaimable", claimable === "true");

        actions[action].func(claimable === "true");
        break;
      case "requestChangeWithdrawAddress":
        console.log("requestChangeWithdrawAddress", formState.requestWithdrawAddress);

        actions[action].func(formState.requestWithdrawAddress);
        break;

      case "approveRequestChange":
        console.log("approveRequestChange");
        actions[action].func();

        break;
      default:
        break;
    }

    handleState(action);
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseWithdrawAddress = await contractInstance
        .connect(auth.account)
        .getWithdrawAddress();
      const requestChangeData = await contractInstance.requestChangeData();

      setFormState((state) => ({
        ...state,
        ...{
          withdrawAddress: responseWithdrawAddress,
          requestWithdrawAddress: requestChangeData.WITHDRAW_ADDRESS,
        },
      }));
    };
    fetchData();
  }, [success]);

  const handleClaimChange = (event) => {
    setClaimable(event.target.value);
  };

  const handleOnchange = ({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  console.log("PoolSettings render", formState);

  return (
    <Grid container spacing={3}>
      <Grid item xs="12">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Claimable</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="claimable"
            label="Claimable"
            value={claimable}
            onChange={handleClaimChange}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs="12">
        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" color="success" onClick={() => handlePool("setClaimable")}>
            Set Claimable
          </Button>
        </Stack>
      </Grid>
      <Grid item xs="12">
        <TextField
          name="withdrawAddress"
          label="WITHDRAW ADDRESS"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={formState.withdrawAddress}
          disabled={true}
          sx={{
            marginBottom: "2rem",
          }}
        />

        <TextField
          name="requestWithdrawAddress"
          label="Request Change WITHDRAW_ADDRESS"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={formState.requestWithdrawAddress}
          onChange={handleOnchange}
        />
      </Grid>
      <Grid item xs="12">
        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
          {isAdmin && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handlePool("requestChangeWithdrawAddress")}
            >
              Request Change
            </Button>
          )}
          {isApprover && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handlePool("approveRequestChange")}
            >
              Approve
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PoolSettings;
