import { Button, Grid, Stack, TextField } from "@mui/material";
import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { useRadaSettings } from "providers/RadaSettings";
import { useCallback } from "react";
import { useState } from "react";
import formGenerator from "utils/form";

const RadaSettings = () => {
  const auth = useGlobal();
  const { contractInstance, WITHDRAW_ADDRESS } = useRadaSettings();

  const [formState, setFormState] = useState({
    adminAddress: "",
    adminAllow: true,
    WITHDRAW_ADDRESS: WITHDRAW_ADDRESS,
  });

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "setAdmin",
    },
    {
      contractInstance: contractInstance,
      func: "setWithdrawAddress",
    },
  ]);

  const [, handleState] = useActionState(actions);

  const handlePool = (action) => {
    auth.setLoading(true);

    switch (action) {
      case "setAdmin":
        console.log("setAdmin", formState.adminAddress);
        actions[action].func(formState.adminAddress, formState.adminAllow === "true");
        break;

      case "setWithdrawAddress":
        console.log("setWithdrawAddress", formState.setWithdrawAddress);
        actions[action].func(formState.WITHDRAW_ADDRESS);
        break;

      default:
        break;
    }

    handleState(action);
  };

  const handleOnchange = useCallback(({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  }, []);

  const formSetAdmin = [
    {
      name: "adminAddress",
      label: "address",
    },
    {
      name: "adminAllow",
      label: "allow",
      type: "bool",
    },
  ];

  const formSetWithdrawAddress = [
    {
      name: "WITHDRAW_ADDRESS",
      label: "WITHDRAW_ADDRESS",
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {formGenerator(formSetAdmin, formState, handleOnchange)}
        <Grid item xs="12">
          <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="success" onClick={() => handlePool("setAdmin")}>
              Set Admin
            </Button>
          </Stack>
        </Grid>

        {formGenerator(formSetWithdrawAddress, formState, handleOnchange)}

        <Grid item xs="12">
          <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handlePool("setWithdrawAddress")}
            >
              Set WithdrawAddress
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default RadaSettings;
