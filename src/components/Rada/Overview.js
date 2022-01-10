import { useActions, useActionState } from "hooks/useActions";

import { Grid, Stack, Button } from "@mui/material";

import { useCallback, useEffect, useState } from "react";

import { parseEther } from "@ethersproject/units";
import { convertUnix } from "utils/format";

import { useGlobal } from "providers/Global";

import { useRada } from "providers/Rada";
import radaForm from "config/RadaForm";
import formGenerator from "utils/form";

const RadaOverview = () => {
  const auth = useGlobal();
  const { contractInstance, contractType, pool, isOwner } = useRada();

  const [formState, setFormState] = useState(pool);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "updatePool",
    },
    {
      contractInstance: contractInstance,
      func: "setEnd",
    },
    {
      contractInstance: contractInstance,
      func: "handlePublicPool",
    },
  ]);

  const [, handleState] = useActionState(actions);

  // useEffect(() => {
  //   setFormState(pool);
  // }, [pool]);

  const handlePool = (action) => {
    console.log("handlePool", formState);

    auth.setLoading(true);

    switch (action) {
      case "updatePool":
        switch (contractType) {
          case "auction":
            actions[action].func(
              formState.poolId,
              formState.addressItem,
              formState.isSaleToken,
              formState.startId,
              formState.endId,
              `${convertUnix(formState.startTime)}`,
              `${convertUnix(formState.endTime)}`,
              parseEther(formState.startPrice),
              formState.requireWhitelist,
              formState.maxBuyPerAddress
            );
            break;
          case "fixedswap":
            actions[action].func(
              formState.poolId,
              formState.title,
              formState.addressItem,
              formState.isSaleToken,
              formState.startId,
              formState.endId,
              `${convertUnix(formState.startTime)}`,
              `${convertUnix(formState.endTime)}`,
              parseEther(formState.startPrice),
              formState.requireWhitelist,
              formState.maxBuyPerAddress
            );
            break;
          default:
            break;
        }

        break;

      case "setEnd":
        actions[action].func(formState.poolId, formState.ended);
        break;

      case "handlePublicPool":
        actions[action].func(formState.poolId, formState.isPublic);
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

  const formPublicPool = [
    {
      name: "isPublic",
      label: "isPublic",
      type: "bool",
    },
  ];

  console.log("RadaOverview", formState);

  return (
    <>
      <Grid container spacing={3}>
        {formGenerator(radaForm, formState, handleOnchange)}
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} sx={{ marginTop: "2rem", justifyContent: "flex-end" }}>
          <Button variant="contained" color="success" onClick={() => handlePool("updatePool")}>
            Update Pool
          </Button>
        </Stack>
      </Grid>

      {isOwner && (
        <>
          {formGenerator(formSetEnd, formState, handleOnchange)}

          <Grid item xs="12">
            <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" color="success" onClick={() => handlePool("setEnd")}>
                Set End
              </Button>
            </Stack>
          </Grid>

          {formGenerator(formPublicPool, formState, handleOnchange)}

          <Grid item xs="12">
            <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handlePool("handlePublicPool")}
              >
                Set Public
              </Button>
            </Stack>
          </Grid>
        </>
      )}
    </>
  );
};

export default RadaOverview;
