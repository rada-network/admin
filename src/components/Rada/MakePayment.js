import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { usePool } from "providers/Pool";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { parseEther } from "@ethersproject/units";
import { useContract } from "hooks/useContract";
import { ethers } from "ethers";
import { useRada } from "providers/Rada";
export default function MakePayment() {
  const global = useGlobal();
  const { contractInstance } = useRada();

  const busdInstance = useContract("0x862BcFA4305DD0ecF1a82796fFc9c3627E0b592a");

  const actions = useActions([
    {
      contractInstance: busdInstance,
      func: "approve",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("makePayment", action, success);

    global.setLoading(true);

    switch (action) {
      case "approve":
        actions[action].func(contractInstance.address, ethers.constants.MaxUint256);
        break;

      default:
        break;
    }

    handleState(action);
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={() => handlePool("approve")}>
        Approve Contract
      </Button>
    </>
  );
}
