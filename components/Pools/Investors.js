import Table from "@components/Table";
import { useAuth } from "@hooks/useAuth";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
import InvestorModel from "model/Investor";
import { usePool } from "providers/Pool";
import { createRef, useEffect, useRef, useState } from "react";
import { CSVReader } from "react-papaparse";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useActions, useActionState } from "@hooks/useActions";
import { parseEther } from "@ethersproject/units";

const PoolInvestors = () => {
  const auth = useAuth();
  const { contractInstance, pool } = usePool();

  const [investors, setInvestors] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "importInvestors",
    },
    {
      contractInstance: contractInstance,
      func: "approveInvestors",
    },
    {
      contractInstance: contractInstance,
      func: "unapproveInvestor",
    },
  ]);

  const [success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", action);

    auth.setLoading(true);

    switch (action) {
      case "importInvestors":
        const data = investors.filter((investor) => selectedIDs.includes(investor.address));

        const addresses = data.map((row) => row.address);
        const amountBusds = data.map((row) => parseEther(row.amountBusd));
        const allocationBusd = data.map((row) => parseEther(row.allocationBusd));

        actions[action].func(pool.id, addresses, amountBusds, allocationBusd);
        break;
      case "approveInvestors":
        actions[action].func(pool.id);
        break;

      case "unapproveInvestor":
        if (selectedIDs.length > 0) {
          selectedIDs.forEach((address) => {
            console.log("unapproveInvestor", address);

            actions[action].func(pool.id, address);
          });
        } else {
          auth.setLoading(false);
        }

        break;

      default:
        break;
    }

    handleState(action);
  };

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

  useEffect(() => {
    fetchData();
  }, [success]);

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      const investors = csv
        .map((row, i) => {
          if (i > 0) {
            return {
              id: row.data[0],
              address: row.data[0],
              amountBusd: row.data[1],
              allocationBusd: row.data[2],
            };
          }
        })
        .filter((row, i) => i > 0 && row.address);

      console.log("handleOnFileLoad", investors);
      setInvestors(investors);
    }
  };

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleSelectionModelChange = (selectedIDs) => {
    console.log("handleSelectionModelChange", selectedIDs);
    setSelectedIDs(selectedIDs);
  };

  const buttonRef = createRef();

  const columns = [
    { field: "id", hide: true },
    { field: "address", headerName: "Address" },
    { field: "amountBusd", headerName: "amountBusd", width: 150 },
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
        <Button variant="contained" color="success" onClick={() => handlePool("importInvestors")}>
          Submit
        </Button>

        <Button
          disabled={!pool.locked}
          variant="contained"
          color="success"
          onClick={() => handlePool("approveInvestors")}
        >
          Aprrove All
        </Button>

        <Button
          disabled={!pool.locked}
          variant="contained"
          color="success"
          onClick={() => handlePool("unapproveInvestor")}
        >
          Unaprrove
        </Button>
      </Stack>
    </GridToolbarContainer>
  );

  return (
    <>
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
