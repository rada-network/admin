import { useSubscribers } from "@hooks/useSubscribers";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";

import { useProject } from "@hooks/useProject";
import { useReducer } from "react";
import projectReducer from "reducer/Project";
import { jsonToCSV } from "react-papaparse";
import dayjs from "dayjs";

const Prefunded = () => {
  const initialState = {
    loading: false,
  };

  const projectData = useProject();
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const getSubscribers = useSubscribers(projectData.contract);

  const handleOnClick = async () => {
    dispatch({ type: "loading" });
    const subscribers = await getSubscribers();
    const csv = jsonToCSV(subscribers);

    var csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = null;
    if (navigator.msSaveBlob) {
      csvURL = navigator.msSaveBlob(csvData, `${projectData.title}_prefunded.csv`);
    } else {
      csvURL = window.URL.createObjectURL(csvData);
    }

    var tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", `${projectData.title}_prefunded_${dayjs()}.csv`);
    tempLink.click();

    dispatch({ type: "loaded" });
  };

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
