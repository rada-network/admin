import Table from "@components/Table";
import { useProject } from "@hooks/useProject";
import { useImportWinners, useResetWinners } from "@hooks/useWinners";
import { parseEther } from "@ethersproject/units";
import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";

import { GridToolbarContainer } from "@mui/x-data-grid";
import { useSubscribers } from "@hooks/useSubscribers";

const Winner = () => {
  const projectData = useProject();
  const getSubscribers = useSubscribers(projectData.contract);

  const [stateImportWinner, importWinners] = useImportWinners(projectData.contract);
  const resetWinners = useResetWinners(projectData.contract);
  const [subscribers, setSubscribers] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const subscribers = await getSubscribers();
      setSubscribers(subscribers);
    };

    fetchData();
  }, []);

  const handleCommitWinner = () => {
    console.log("handleCommitWinner", selectedIDs);
  };

  const handleImportWinner = () => {
    const busd = subscribers
      .filter((subscriber) => selectedIDs.includes(subscriber.address))
      .map((row) => parseEther(row.amountBUSD));

    console.log("handleImportWinner", selectedIDs, busd);
    importWinners(selectedIDs, busd);
  };

  const handleResetWinner = () => {
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
    </Grid>
  );
};

export default Winner;
