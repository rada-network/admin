import { useActions, useActionState } from "hooks/useActions";

import { Grid, Stack, Button } from "@mui/material";

import { useCallback, useState } from "react";

import { parseEther } from "@ethersproject/units";
import { convertUnix } from "utils/format";

import { useGlobal } from "providers/Global";

import { useRadaAuction } from "providers/RadaAuction";
import radaAuctionForm from "config/RadaAuctionForm";
import formGenerator from "utils/form";

const RadaAuctionOverview = () => {
  const auth = useGlobal();
  const { contractInstance, pool, isOwner } = useRadaAuction();

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
  ]);

  const [success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", action, success);

    auth.setLoading(true);

    switch (action) {
      case "updatePool":
        actions[action].func(
          formState.poolId,
          formState.addressItem,
          formState.isSaleToken === "true",
          formState.startId,
          formState.endId,
          `${convertUnix(formState.startTime)}`,
          `${convertUnix(formState.endTime)}`,
          parseEther(formState.startPrice),
          formState.requireWhitelist === "true",
          formState.maxBuyPerAddress
        );
        break;

      case "setEnd":
        actions[action].func(formState.poolId, formState.ended === "true");
        break;

      default:
        break;
    }

    handleState(action);
  };

  const handleOnchange = useCallback(({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  }, []);

  const formSetEnd = [
    {
      name: "ended",
      label: "ended",
      type: "bool",
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {formGenerator(radaAuctionForm, formState, handleOnchange)}
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
        </>
      )}
    </>
  );
};

export default RadaAuctionOverview;
