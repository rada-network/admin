import { useContract } from "@hooks/useContract";
import { useProject } from "@hooks/useProject";
import { LoadingButton } from "@mui/lab";
import { Button, Grid } from "@mui/material";
import { useContractCall } from "@usedapp/core";
import { useReducer } from "react";
import projectReducer from "reducer/Project";

const Prefunded = () => {
  const [state, dispatch] = useReducer(projectReducer, { loading: false });

  const handleOnClick = () => {
    dispatch({ type: "loading" });

    const a = useContract("getSubscribers");

    console.log(a);

    dispatch({ type: "loaded" });
  };

  console.log("Prefunded", state);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <LoadingButton variant="contained" onClick={handleOnClick} loading={state.loading}>
          Export Prefunded
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default Prefunded;
