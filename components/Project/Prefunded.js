import dynamic from "next/dynamic";
import { useProject } from "@hooks/useProject";
import { useSubscribers } from "@hooks/useSubscribers";
import { parseEther } from "@ethersproject/units";
import { Backdrop, Button, CircularProgress, Stack } from "@mui/material";
import { useState, useEffect, useReducer } from "react";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
import projectReducer from "reducer/Project";
import { toast } from "react-toastify";
import { useContractFunction } from "@hooks/useContract";
import { Box } from "@mui/system";

const Table = dynamic(() => import("@components/Table"));

const Prefunded = () => {
  const initialState = {
    loading: true,
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
    console.log("fetchData");
    await getSubscribers();
    dispatch({ type: "loaded" });
  };

  const handleStatus = async (state) => {
    switch (state.status) {
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
    { field: "amountBUSD", headerName: "BUSD" },
    { field: "amountRIR", headerName: "RIR" },
    { field: "approvedBUSD", headerName: "approved BUSD" },
    { field: "claimedToken", headerName: "claimed Token" },
    { field: "isWinner", headerName: "isWinner" },
  ];

  const Toolbar = () => (
    <GridToolbarContainer>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Box>
      <Stack direction="row" spacing={2}>
        {projectData.isAdmin && (
          <>
            <Button
              disabled={projectData.isCommit}
              variant="contained"
              color="success"
              onClick={handleImportWinner}
            >
              Submit Winner
            </Button>
            <Button disabled={projectData.isCommit} variant="outlined" onClick={handleResetWinner}>
              Reset Winner
            </Button>
            {projectData.isOwner && (
              <Button
                disabled={projectData.isCommit}
                variant="contained"
                color="success"
                onClick={handleCommitWinner}
              >
                Commit Winner
              </Button>
            )}
          </>
        )}
      </Stack>
    </GridToolbarContainer>
  );

  console.log("Project Prefunded render", projectData, subscribers, state);

  return (
    <>
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Prefunded;
