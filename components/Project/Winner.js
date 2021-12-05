import Table from "@components/Table";
import { useProject } from "@hooks/useProject";
import { useSubscribers } from "@hooks/useSubscribers";
import { parseEther } from "@ethersproject/units";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState, useEffect, useReducer } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import projectReducer from "reducer/Project";
import { toast } from "react-toastify";
import { useContractFunction } from "@hooks/useContract";

const Winner = () => {
  const initialState = {
    loading: false,
  };

  const projectData = useProject();

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const [subscribers, getSubscribers] = useSubscribers(projectData.contractInstance);

  const [stateImport, importWinners] = useContractFunction(
    projectData.contractInstance,
    "importWinners"
  );

  const [stateReset, resetWinners] = useContractFunction(
    projectData.contractInstance,
    "setEmptyWins"
  );

  const [stateCommit, commitWinnner] = useContractFunction(
    projectData.contractInstance,
    "commitWinners"
  );

  const [selectedIDs, setSelectedIDs] = useState([]);

  const fetchData = async () => {
    dispatch({ type: "loading" });
    await getSubscribers();
    dispatch({ type: "loaded" });
  };

  const handleStatus = async (state) => {
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
    fetchData();
  }, []);

  useEffect(() => {
    console.log(stateReset);
    handleStatus(stateReset);
  }, [stateReset]);

  useEffect(() => {
    console.log(stateImport);
    handleStatus(stateImport);
  }, [stateImport]);

  useEffect(() => {
    console.log(stateCommit);
    handleStatus(stateCommit);
  }, [stateCommit]);

  const handleCommitWinner = () => {
    dispatch({ type: "loading" });
    commitWinnner();
  };

  const handleImportWinner = () => {
    const busd = subscribers
      .filter((subscriber) => selectedIDs.includes(subscriber.address))
      .map((row) => parseEther(row.amountBUSD));

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

  const Toolbar = () => (
    <GridToolbarContainer>
      <Button onClick={handleImportWinner}>Import Winner</Button>
      <Button onClick={handleCommitWinner}>Commit Winner</Button>
      <Button onClick={handleResetWinner}>Reset Winner</Button>
    </GridToolbarContainer>
  );

  console.log("Project Winner render", projectData, subscribers);

  return (
    <>
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
    </>
  );
};

export default Winner;
