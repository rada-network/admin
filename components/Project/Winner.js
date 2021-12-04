import Table from "@components/Table";
import { useProject } from "@hooks/useProject";
import { useImportWinners, useResetWinners } from "@hooks/useWinners";
import { parseEther } from "@ethersproject/units";
import { Backdrop, Button, CircularProgress, Grid } from "@mui/material";
import { useState, useEffect, useReducer } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { useSubscribers } from "@hooks/useSubscribers";
import projectReducer from "reducer/Project";
import { toast } from "react-toastify";

const Winner = () => {
  const initialState = {
    loading: false,
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const projectData = useProject();
  const getSubscribers = useSubscribers(projectData.contract);

  const [stateImportWinner, importWinners] = useImportWinners(projectData.contract);
  const [stateReset, resetWinners] = useResetWinners(projectData.contract);
  const [subscribers, setSubscribers] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);

  const fetchData = async () => {
    dispatch({ type: "loading" });
    const subscribers = await getSubscribers();
    setSubscribers(subscribers);
    dispatch({ type: "loaded" });
  };

  const handleStatus = (state) => {
    switch (state.status) {
      case "None":
      case "Success":
        fetchData();
        break;

      case "Mining":
        dispatch({ type: "loading" });
        break;

      case "Exception":
        toast(state.errorMessage);
        dispatch({ type: "loaded" });
        break;

      default:
        dispatch({ type: "loaded" });
        break;
    }
  };

  useEffect(() => {
    console.log(stateImportWinner);
    handleStatus(stateImportWinner);
  }, [stateImportWinner]);

  useEffect(() => {
    console.log(stateReset);
    handleStatus(stateReset);
  }, [stateReset]);

  const handleCommitWinner = () => {
    console.log("handleCommitWinner", selectedIDs);
  };

  const handleImportWinner = () => {
    const busd = subscribers
      .filter((subscriber) => selectedIDs.includes(subscriber.address))
      .map((row) => parseEther(row.amountBUSD));

    console.log("handleImportWinner", selectedIDs, busd);

    dispatch({ type: "loading" });
    importWinners(selectedIDs, busd);
  };

  const handleResetWinner = () => {
    dispatch({ type: "loading" });
    resetWinners();
  };

  const handleSelectionModelChange = (ids) => {
    setSelectedIDs(ids);
  };

  const columns = [
    { field: "address", headerName: "Address", width: 400 },
    { field: "amountBUSD", headerName: "BUSD", editable: true },
    { field: "amountRIR", headerName: "RIR", editable: true },
    { field: "approvedBUSD", headerName: "approved BUSD" },
    { field: "claimedToken", headerName: "claimed Token" },
  ];

  const Toolbar = () => {
    return (
      <GridToolbarContainer>
        <Button onClick={handleImportWinner}>Import Winner</Button>
        <Button onClick={handleCommitWinner}>Commit Winner</Button>
        <Button onClick={handleResetWinner}>Reset Winner</Button>
      </GridToolbarContainer>
    );
  };

  console.log("Project Winner render", projectData, subscribers);

  return (
    <Grid container spacing={2}>
      {subscribers.length > 0 && (
        <Table
          rows={subscribers}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          pageSize={30}
          components={{
            Toolbar: Toolbar,
          }}
          onSelectionModelChange={handleSelectionModelChange}
        />
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default Winner;
