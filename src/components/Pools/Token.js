import { useActions, useActionState } from "hooks/useActions";
import { ethers } from "ethers";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { usePool } from "providers/Pool";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { parseEther, formatEther } from "@ethersproject/units";
import { useContract } from "hooks/useContract";
import { useGlobal } from "providers/Global";

import { useTokenAllowance } from "@usedapp/core";

const PoolToken = () => {
  const auth = useGlobal();
  const { contractInstance, pool } = usePool();

  const [formState, setFormState] = useState(pool);
  const [token, setToken] = useState();

  const tokenInstance = useContract(pool.tokenAddress);
  const allowance = useTokenAllowance(pool.tokenAddress, auth.account, contractInstance.address);

  let approvedContract = false;
  if (allowance && formatEther(allowance) > 0) {
    approvedContract = true;
  }

  let canAction = false;
  if (pool.tokenAddress && pool.tokenAddress !== "0x0000000000000000000000000000000000000000") {
    canAction = true;
  }

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "deposit",
    },
    {
      contractInstance: tokenInstance,
      func: "approve",
    },
    {
      contractInstance: contractInstance,
      func: "setToken",
    },
  ]);

  const [success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", action, success);

    auth.setLoading(true);

    switch (action) {
      case "deposit":
        console.log("deposit", pool.id, formState.depositAmountonChain);
        actions[action].func(pool.id, parseEther(formState.depositAmountonChain));

        break;

      case "approve":
        actions[action].func(contractInstance.address, ethers.constants.MaxUint256);
        break;

      case "setToken":
        console.log("setToken", pool.id, token);
        actions[action].func(pool.id, token);
        break;
      default:
        break;
    }

    handleState(action);
  };

  const handleOnchange = ({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  const handlePercentage = async ({ target }) => {
    if (target.value > 0) {
      let value = parseInt(target.value, 10);

      if (value > 100) value = 100;

      const response = await contractInstance.getDepositAmountToken(pool.id, `${value}`);

      setFormState((state) => ({ ...state, ...{ depositAmountonChain: formatEther(response) } }));
    }
  };

  const handleOnchangeToken = ({ target }) => {
    if (
      target.value !== "0x0000000000000000000000000000000000000000" &&
      target.value !== "" &&
      target.value !== formState.tokenAddress
    ) {
      setToken(target.value);
    }
  };

  console.log("PoolDetail Token render", formState);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        <Grid item xs="12">
          <TextField
            required
            name="tokenAddress"
            label="tokenAddress"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue={formState.tokenAddress}
            onChange={handleOnchangeToken}
          />
        </Grid>
        <Grid item xs="6">
          <TextField
            name="percentage"
            label="percentage"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handlePercentage}
            InputProps={{
              inputProps: {
                type: "number",
                min: 1,
                max: 100,
              },
            }}
          />
        </Grid>
        <Grid item xs="6">
          <TextField
            name="depositAmountonChain"
            label="depositAmountonChain"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formState.depositAmountonChain ?? "0"}
            onChange={handleOnchange}
            InputProps={{
              inputProps: {
                type: "number",
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ marginTop: "2rem", justifyContent: "flex-end" }}>
            <Button
              disabled={token ? false : true}
              variant="contained"
              color="success"
              onClick={() => handlePool("setToken")}
            >
              Set Token
            </Button>

            {approvedContract ? (
              <Button
                disabled={!canAction}
                variant="contained"
                color="success"
                onClick={() => handlePool("deposit")}
              >
                Deposit
              </Button>
            ) : (
              <Button
                disabled={!canAction}
                variant="contained"
                color="success"
                onClick={() => handlePool("approve")}
              >
                Approve Contract
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default PoolToken;
