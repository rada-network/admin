import { useActions, useActionState } from "hooks/useActions";

import { Grid, Stack, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useGlobal } from "providers/Global";
import { useRada } from "providers/Rada";
import { radaForm } from "config/RadaForm";
import formGenerator from "utils/form";
import RadaPublic from "./Public";

import argsGenerator from "utils/pool";
import useWhitelistHook from "hooks/useWhitelist";

const RadaOverview = () => {
  const global = useGlobal();
  const { contractInstance, contractType, pool, isOwner, whitelistIds } = useRada();
  const allWhitelistIds = useWhitelistHook();
  const [formState, setFormState] = useState(pool);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "addOrUpdatePool",
    },

    {
      contractInstance: contractInstance,
      func: "updatePool",
    },
    {
      contractInstance: contractInstance,
      func: "setEnd",
    },
  ]);

  const [, , handleState] = useActionState(actions);

  useEffect(() => {
    formState.whitelistIds = whitelistIds;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFormState(pool);
  }, [pool]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePool = async (action) => {
    console.log("handlePool", formState);

    global.setLoading(true);

    switch (action) {
      case "addOrUpdatePool":
      case "updatePool":
        console.log("updatePool", await argsGenerator(contractType, formState));

        actions[action].func(...(await argsGenerator(contractType, formState)));

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

  const form = radaForm[contractType].map((item) => {
    if (item.name === "whitelistIds") {
      item.options = allWhitelistIds;
    }
    return item;
  });

  if (!allWhitelistIds) {
    return "...";
  }

  console.log("RadaOverview", pool, formState);

  return (
    <>
      <Grid container spacing={3}>
        {formGenerator(form, formState, handleOnchange)}
      </Grid>

      <Stack direction="row" spacing={2} sx={{ marginTop: "1rem", justifyContent: "flex-end" }}>
        <RadaPublic />
        {!pool.isPublic && (
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              handlePool(
                contractType === "nftClaim" || contractType === "randomizeByRarity"
                  ? "updatePool"
                  : "addOrUpdatePool"
              )
            }
          >
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
