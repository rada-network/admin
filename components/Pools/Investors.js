import Table from "@components/Table";
import { useAuth } from "@hooks/useAuth";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
import InvestorModel from "model/Investor";
import { usePool } from "providers/Pool";
import { createRef, useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useContractFunction } from "@hooks/useContract";

const PoolInvestors = () => {
  const auth = useAuth();
  const { contractInstance, pool } = usePool();

  const [investors, setInvestors] = useState([]);

  const [stateImport, importInvestor] = useContractFunction(contractInstance, "importInvestor");
  const [stateLock, lockPool] = useContractFunction(contractInstance, "lockPool");
  const [stateUnLock, unlockPool] = useContractFunction(contractInstance, "unlockPool");

  const [selectedIDs, setSelectedIDs] = useState([]);

  const fetchData = async () => {
    auth.setLoading(true);
    console.log("fetchData", contractInstance);
    const response = await contractInstance.poolAddresses(pool.id);

    const investors = await Promise.all(
      response.map(async (investor) => {
        const responseInvestor = await contractInstance.getInvestor(pool.id, investor);

        return InvestorModel(responseInvestor, investor);
      })
    );

    setInvestors(investors);

    auth.setLoading(false);
  };

  const handleStatus = async (state) => {
    switch (state.status) {
      case "Success":
        fetchData();
        break;
      case "Mining":
        auth.setLoading(true);
        break;
      case "Exception":
        toast(state.errorMessage);
        auth.setLoading(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(stateImport);
    handleStatus(stateImport);
  }, [stateImport]);

  useEffect(() => {
    console.log(stateLock);
    handleStatus(stateLock);
  }, [stateLock]);

  useEffect(() => {
    console.log(stateUnLock);
    handleStatus(stateUnLock);
  }, [stateUnLock]);

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      const investors = csv.map((row, i) => {
        if (i > 0) {
          return {
            id: row.data[0],
            address: row.data[0],
            amountBUSD: row.data[1],
            allocationBusd: row.data[2],
          };
        }
      });
      console.log("handleOnFileLoad", investors);
      //setInvestors(investors);
    }
  };

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleLockPool = () => {
    console.log("handleLockPool", pool.id);
    auth.setLoading(true);

    lockPool(pool.id);
  };

  const handleUnLockPool = () => {
    console.log("handleUnLockPool", pool.id);
    auth.setLoading(true);

    unlockPool(pool.id);
  };

  const handleImportInvestor = () => {
    console.log("handleImportInvestor", selectedIDs);
  };

  const handleSelectionModelChange = (selectedIDs) => {
    const selectedAddress = investors
      .filter((row) => selectedIDs.includes(row.id))
      .reduce((arr, el) => [...arr, ...[el.address]], []);

    console.log("handleSelectionModelChange", selectedAddress);
    setSelectedIDs(selectedAddress);
  };

  const buttonRef = createRef();

  const columns = [
    { field: "address", headerName: "Address" },
    { field: "amountBUSD", headerName: "amountBUSD", width: 150 },
    { field: "allocationBusd", headerName: "allocationBusd", width: 150 },
    { field: "claimedToken", headerName: "claimedToken", width: 150 },
    { field: "paid", headerName: "paid" },
    { field: "approved", headerName: "approved" },
  ];

  const Toolbar = () => (
    <GridToolbarContainer>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <CSVReader onFileLoad={handleOnFileLoad} ref={buttonRef} noDrag config={{}} style={{}}>
          {() => (
            <Button
              variant="contained"
              onClick={handleOpenDialog}
              startIcon={<DriveFolderUploadIcon />}
            >
              Upload CSV
            </Button>
          )}
        </CSVReader>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Box>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success">
          Remove
        </Button>
        <Button variant="contained" color="success" onClick={handleImportInvestor}>
          Submit
        </Button>

        <Button variant="contained" color="success">
          Aprrove
        </Button>

        <Button variant="contained" color="success">
          Unaprroved
        </Button>
      </Stack>
    </GridToolbarContainer>
  );

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
        {pool.locked ? (
          <Button variant="contained" color="success" onClick={handleUnLockPool}>
            UnLock
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleLockPool}>
            Lock
          </Button>
        )}
      </Stack>
      <Table
        rows={investors}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        pageSize={30}
        components={{
          Toolbar: Toolbar,
        }}
        onSelectionModelChange={handleSelectionModelChange}
      />
    </>
  );
};

export default PoolInvestors;
