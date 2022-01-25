import { useActions, useActionState } from "hooks/useActions";

import { Grid, Stack, Button } from "@mui/material";

import { useCallback, useEffect, useState } from "react";

import { useGlobal } from "providers/Global";

import formGenerator from "utils/form";
import useABI from "hooks/useABI";

import { useParams } from "react-router-dom";
import OpenboxModel from "model/Openbox";

const RadaOpenbox = () => {
  const { id } = useParams();
  const auth = useGlobal();

  const { contractInstance } = useABI("openbox");

  const [formState, setFormState] = useState(OpenboxModel({}, id));

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "updatePool",
    },
  ]);

  const [, , handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", formState);

    auth.setLoading(true);

    switch (action) {
      case "updatePool":
        actions[action].func(
          formState.poolId,
          formState.nftAddress,
          formState.startId,
          formState.endId,
          formState.isSaleToken,
          formState.isSaleToken
            ? formState.tokenAddress
            : "0x0000000000000000000000000000000000000000",
          !formState.isSaleToken
            ? formState.nftBoxAddress
            : "0x0000000000000000000000000000000000000000"
        );

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

  useEffect(() => {
    const fetchData = async () => {
      auth.setLoading(true);

      const response = await contractInstance.pools(id);

      setFormState(OpenboxModel(response, id));

      auth.setLoading(false);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const radaForm = [
    {
      name: "poolId",
      label: "pool ID",
    },
    {
      name: "nftAddress",
      label: "NFT Contract",
    },
    {
      name: "startId",
      label: "startId",
    },
    {
      name: "endId",
      label: "endId",
    },
    {
      name: "isSaleToken",
      label: "Token or NFT",
      type: "bool",
      options: [
        { label: "Token", value: true },
        { label: "NFT", value: false },
      ],
    },

    {
      name: "tokenAddress",
      label: "Token Address",
      display: !formState.isSaleToken ? "none" : "",
    },

    {
      name: "nftBoxAddress",
      label: "NTF Box Address",
      display: formState.isSaleToken ? "none" : "",
    },
  ];

  console.log("RadaOpenbox", formState);

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
    </>
  );
};

export default RadaOpenbox;
