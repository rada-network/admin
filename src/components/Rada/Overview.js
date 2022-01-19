import { useActions, useActionState } from "hooks/useActions";

import { Grid, Stack, Button } from "@mui/material";

import { useCallback, useEffect, useState } from "react";

import { parseEther } from "@ethersproject/units";
import { convertUnix } from "utils/format";

import { useGlobal } from "providers/Global";

import { useRada } from "providers/Rada";
import { radaAppUpdateParams, radaForm } from "config/RadaForm";
import formGenerator from "utils/form";
import RadaPublic from "./Public";
import MakePayment from "./MakePayment";
import argsGenerator from "utils/pool";

const RadaOverview = () => {
  const auth = useGlobal();
  const { contractInstance, contractType, pool, isOwner } = useRada();

  const [formState, setFormState] = useState(pool);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "addOrUpdatePool",
    },
    {
      contractInstance: contractInstance,
      func: "setEnd",
    },
  ]);

  const [, , handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", formState);

    auth.setLoading(true);

    switch (action) {
      case "addOrUpdatePool":
        actions[action].func(...argsGenerator(contractType, formState));

        break;

      case "setEnd":
        actions[action].func(formState.poolId, formState.ended);
        break;

      default:
        break;
    }

    handleState(action);
  };

  const handleOnchange = useCallback(({ target }) => {
    console.log("handlePool", target);
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  }, []);

  const formSetEnd = [
    {
      name: "ended",
      label: "ended",
      type: "bool",
    },
  ];

  console.log("RadaOverview", formState);

  return (
    <>
      <Grid container spacing={3}>
        {formGenerator(radaForm[contractType], formState, handleOnchange)}
      </Grid>

      <Stack direction="row" spacing={2} sx={{ marginTop: "1rem", justifyContent: "flex-end" }}>
        <RadaPublic />
        {!pool.isPublic && (
          <Button variant="contained" color="success" onClick={() => handlePool("addOrUpdatePool")}>
            Update Pool
          </Button>
        )}
      </Stack>

      {isOwner && contractType === "auction" && (
        <>
          <Grid item xs="12">
            <Stack direction="row" spacing={2}>
              {formGenerator(formSetEnd, formState, handleOnchange)}
              <Button variant="contained" color="success" onClick={() => handlePool("setEnd")}>
                Set End
              </Button>
            </Stack>
          </Grid>
        </>
      )}
    </>
  );
};

export default RadaOverview;
