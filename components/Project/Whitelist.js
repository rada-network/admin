import dynamic from "next/dynamic";
import { useProject } from "@hooks/useProject";
import { Button, Grid } from "@mui/material";
import { createRef, useState, useCallback, useEffect } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { CSVReader } from "react-papaparse";
import { useContractFunction } from "@hooks/useContract";
import { Box } from "@mui/system";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useAuth } from "@hooks/useAuth";
import { toast } from "react-toastify";

const Table = dynamic(() => import("@components/Table"));

const Whitelist = () => {
  const auth = useAuth();
  const projectData = useProject();

  const [whiteList, setWhitelist] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);

  const [stateImport, importWhiteList] = useContractFunction(
    projectData.contractInstance,
    "importWhitelist"
  );

  const handleStatus = async (state) => {
    switch (state.status) {
      case "Success":
        auth.setLoading(false);
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
    console.log(stateImport);
    handleStatus(stateImport);
  }, [stateImport]);

  const handleImportWhitelist = () => {
    console.log("handleImportWhitelist", selectedIDs, auth);

    if (selectedIDs.length > 0) {
      auth.setLoading(true);
      importWhiteList(selectedIDs);
    }
  };

  const handleOnFileLoad = (csv) => {
    console.log("handleOnFileLoad", csv);

    if (csv.length > 0) {
      console.log(csv[0]);

      const addressIndex = csv[0].data.findIndex((el) => el === "address");

      const whiteList = csv
        .map((row) => ({ id: row.data[addressIndex], address: row.data[addressIndex] }))
        .filter((row, i) => i > 0);

      setWhitelist(whiteList);
    }
  };

  const handleSelectionModelChange = (selectedIDs) => {
    const selectedAddress = whiteList
      .filter((row) => selectedIDs.includes(row.id))
      .reduce((arr, el) => [...arr, ...[el.address]], []);

    console.log("handleSelectionModelChange", selectedAddress);
    setSelectedIDs(selectedAddress);
  };

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleAddRow = () => {
    setWhitelist((prevRows) => [
      ...prevRows,
      {
        id: `id_${Math.random()}`,
        address: "",
        approvedBUSD: 0,
      },
    ]);
  };

  const [editRowsModel, setEditRowsModel] = useState({});

  const handleEditRowsModelChange = useCallback((model) => {
    if (Object.keys(model).length > 0) {
      const editedIds = Object.keys(model);

      const newRow = {
        id: editedIds[0],
        address: model[editedIds[0]]?.address?.value,
        approvedBUSD: model[editedIds[0]]?.approvedBUSD?.value,
      };

      setWhitelist([...whiteList, newRow]);
    }

    setEditRowsModel(model);
  }, []);

  const buttonRef = createRef();

  const Toolbar = () =>
    projectData.isAdmin && (
      <GridToolbarContainer>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <CSVReader onFileLoad={handleOnFileLoad} ref={buttonRef} noDrag config={{}} style={{}}>
            {() => (
              <Button
                disabled={projectData.isCommit}
                variant="contained"
                onClick={handleOpenDialog}
                startIcon={<DriveFolderUploadIcon />}
              >
                Upload CSV
              </Button>
            )}
          </CSVReader>
          <Button
            disabled={projectData.isCommit}
            variant="contained"
            sx={{ marginLeft: "1rem" }}
            onClick={handleAddRow}
          >
            Add a Whitelist
          </Button>
        </Box>
        <Button
          disabled={projectData.isCommit}
          variant="contained"
          color="success"
          onClick={handleImportWhitelist}
        >
          Submit Whitelist
        </Button>
      </GridToolbarContainer>
    );

  const columns = [
    { field: "address", headerName: "Address", width: 400, editable: true },
    { field: "approvedBUSD", headerName: "approved BUSD", width: 400, editable: true },
  ];

  console.log("Project Whitelist render", projectData, whiteList);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Table
          rows={whiteList}
          columns={columns}
          checkboxSelection={projectData.isAdmin ?? false}
          disableSelectionOnClick
          pageSize={30}
          components={{
            Toolbar: Toolbar,
          }}
          editMode="row"
          onSelectionModelChange={handleSelectionModelChange}
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
        />
      </Grid>
    </Grid>
  );
};

export default Whitelist;
