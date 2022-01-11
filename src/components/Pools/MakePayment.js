import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { usePool } from "providers/Pool";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { parseEther } from "@ethersproject/units";
import { useContract } from "hooks/useContract";
import { ethers } from "ethers";
export default function MakePayment() {
  const global = useGlobal();
  const { contractInstance, pool } = usePool();

  const busdInstance = useContract("0x862BcFA4305DD0ecF1a82796fFc9c3627E0b592a");
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
    amountBusd: "0",
    amountRir: "0",
  });

  const [, success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("makePayment", action, success);

    global.setLoading(true);

    switch (action) {
      case "makePayment":
        console.log("makePayment", pool.id, formState);

        actions[action].func(
          pool.id,
          parseEther(formState.amountBusd),
          parseEther(formState.amountRir)
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

  return (
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
          name="amountBusd"
          label="amountBusd"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={formState.amountBusd}
          onChange={handleOnchange}
        />
        <TextField
          required
          name="amountRir"
          label="amountRir"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={formState.amountRir}
          onChange={handleOnchange}
        />
      </Grid>
    </>
  );
}
