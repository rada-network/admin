import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { usePool } from "providers/Pool";
import { Button, Grid, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { parseEther, parseUnits } from "@ethersproject/units";
import { useContract } from "hooks/useContract";
import { ethers } from "ethers";
export default function MakePayment() {
  const global = useGlobal();
  const { contractInstance, pool, isApprover } = usePool();

  const busdInstance = useContract("0x6945239350AE805b0823cB292a4dA5974d166640");
  const rirInstance = useContract("0x6768BDC5d03A87942cE7cB143fA74e0DadE0371b");

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "makePayment",
    },
    {
      contractInstance: rirInstance,
      func: "approve",
    },
  ]);

  const [formState, setFormState] = useState({
    allocationBusd: 0,
    allocationRir: 0,
  });

  const [success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("makePayment", action, success);

    global.setLoading(true);

    switch (action) {
      case "makePayment":
        actions[action].func(
          pool.id,
          parseEther(formState.allocationBusd),
          parseEther(formState.allocationRir)
        );
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

  if (!isApprover) {
    return null;
  }

  return (
    pool.locked && (
      <>
        <Button variant="contained" color="info" onClick={() => handlePool("makePayment")}>
          Make Payment
        </Button>

        <Button variant="contained" color="success" onClick={() => handlePool("approve")}>
          Approve Contract
        </Button>

        <Grid item xs="12">
          <TextField
            required
            name="allocationBusd"
            label="allocationBusd"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formState.allocationBusd}
            onChange={handleOnchange}
          />
          <TextField
            required
            name="allocationRir"
            label="allocationRir"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formState.allocationRir}
            onChange={handleOnchange}
          />
        </Grid>
      </>
    )
  );
}
