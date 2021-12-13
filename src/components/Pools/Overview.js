import { useActions, useActionState } from "hooks/useActions";
import { ethers } from "ethers";
import { DateTimePicker } from "@mui/lab";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { usePool } from "providers/Pool";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { parseEther, formatEther, parseUnits } from "@ethersproject/units";
import { convertUnix } from "utils/format";
import { useContract } from "hooks/useContract";
import { useGlobal } from "providers/Global";
import poolFormData from "config/PoolFormData";
import { useTokenAllowance } from "@usedapp/core";

const PoolOverview = () => {
  const auth = useGlobal();
  const { contractInstance, pool, isApprover } = usePool();

  const [formState, setFormState] = useState(pool);

  const tokenInstance = useContract(pool.tokenAddress);
  const allowance = useTokenAllowance(pool.tokenAddress, auth.account, contractInstance.address);

  let approvedContract = false;
  if (allowance && formatEther(allowance) > 0) {
    approvedContract = true;
  }

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "lockPool",
    },
    {
      contractInstance: contractInstance,
      func: "unlockPool",
    },
    {
      contractInstance: contractInstance,
      func: "updatePool",
    },
    {
      contractInstance: contractInstance,
      func: "deposit",
    },
    {
      contractInstance: tokenInstance,
      func: "approve",
    },
  ]);

  const [success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", action);

    auth.setLoading(true);

    switch (action) {
      case "lockPool":
      case "unlockPool":
        actions[action].func(pool.id);
        break;

      case "updatePool":
        actions[action].func(
          formState.id,
          parseEther(formState.allocationBusd),
          parseEther(formState.price),
          parseUnits(`${convertUnix(formState.startDate)}`),
          parseUnits(`${convertUnix(formState.endDate)}`)
        );
        break;

      case "deposit":
        console.log("deposit", pool.id, formState.depositAmount);
        actions[action].func(pool.id, parseEther(formState.depositAmount));

        break;

      case "approve":
        actions[action].func(contractInstance.address, ethers.constants.MaxUint256);
        break;
      default:
        break;
    }

    handleState(action);
  };

  const handleOnchange = ({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  const formData = poolFormData;

  console.log("PoolDetail Overview render", formState, pool);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        {formData.map((field, i) => (
          <Grid item xs={6} key={i}>
            {field.type === "date" ? (
              <>
                <DateTimePicker
                  label={field.label}
                  value={formState[field.name]}
                  onChange={(value) =>
                    handleOnchange({ target: { name: field.name, value: value } })
                  }
                  minDate={new Date()}
                  renderInput={(params) => <TextField {...params} />}
                />
              </>
            ) : (
              <TextField
                required
                name={field.name}
                label={field.label}
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formState[field.name]}
                onChange={handleOnchange}
                readOnly={field.readOnly ?? false}
              />
            )}
          </Grid>
        ))}
        <Grid item xs={6}>
          <TextField
            name="tokenAddress"
            label="tokenAddress"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formState.tokenAddress}
            onChange={handleOnchange}
          />
        </Grid>

        {formState.tokenAddress && (
          <Grid item xs={6}>
            <TextField
              name="depositAmount"
              label="depositAmount"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={formState.depositAmount}
              onChange={handleOnchange}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ marginTop: "2rem", justifyContent: "flex-end" }}>
            {pool.locked ? (
              <Button variant="contained" color="success" onClick={() => handlePool("unlockPool")}>
                UnLock
              </Button>
            ) : (
              <Button variant="contained" color="success" onClick={() => handlePool("lockPool")}>
                Lock
              </Button>
            )}

            <Button
              disabled={pool.locked}
              variant="contained"
              color="success"
              onClick={() => handlePool("updatePool")}
            >
              Update
            </Button>

            {approvedContract ? (
              <Button
                disabled={!isApprover}
                variant="contained"
                color="success"
                onClick={() => handlePool("deposit")}
              >
                Deposit
              </Button>
            ) : (
              <Button
                disabled={!isApprover || pool.locked}
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

export default PoolOverview;
