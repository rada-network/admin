import { useActions, useActionState } from "@hooks/useActions";
import { useAuth } from "@hooks/useAuth";
import { DateTimePicker } from "@mui/lab";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { usePool } from "providers/Pool";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { parseEther, parseUnits } from "@ethersproject/units";
import { convertUnix } from "@utils/format";
import { useContract } from "@hooks/useContract";

const PoolOverview = () => {
  const auth = useAuth();
  const { contractInstance, pool } = usePool();

  const [formState, setFormState] = useState(pool);

  const tokenInstance = useContract(pool.fullAddress, "BEP20");
  console.log("tokenInstance", tokenInstance);
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
        console.log("deposit", pool.id, formState.depositedToken);
        actions[action].func(pool.id, parseEther(formState.depositedToken));

        break;

      case "approve":
        actions[action].func(contractInstance.address, parseEther(formState.depositedToken));
        break;
      default:
        break;
    }

    handleState(action);
  };

  const handleOnchange = ({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  console.log("PoolDetail Overview render", formState);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            required
            id="title"
            name="title"
            label="title"
            fullWidth
            variant="standard"
            value={formState.title}
            onChange={handleOnchange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            readonly={true}
            id="locked"
            name="locked"
            label="locked"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formState.locked}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            name="fullAddress"
            label="tokenAddress"
            fullWidth
            variant="standard"
            value={formState.fullAddress}
            onChange={handleOnchange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            id="allocationBusd"
            name="allocationBusd"
            label="allocationBusd"
            fullWidth
            variant="standard"
            value={formState.allocationBusd}
            onChange={handleOnchange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            id="price"
            name="price"
            label="price"
            fullWidth
            variant="standard"
            value={formState.price}
            onChange={handleOnchange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            id="depositedToken"
            name="depositedToken"
            label="depositedToken"
            fullWidth
            variant="standard"
            value={formState.depositedToken}
            onChange={handleOnchange}
          />
        </Grid>

        {!pool.claimOnly && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item xs={6}>
              <DateTimePicker
                label="Start Date"
                value={formState.startDate}
                onChange={(value) =>
                  handleOnchange({ target: { name: "startDate", value: value } })
                }
                minDate={new Date()}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>

            <Grid item xs={6}>
              <DateTimePicker
                label="End Date"
                value={formState.endDate}
                onChange={(value) => handleOnchange({ target: { name: "endDate", value: value } })}
                minDate={new Date()}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
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

            <Button variant="contained" color="success" onClick={() => handlePool("approve")}>
              Approve
            </Button>
            <Button variant="contained" color="success" onClick={() => handlePool("deposit")}>
              Deposit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default PoolOverview;
