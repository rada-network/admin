import Table from "@components/Table";
import { useProject } from "@hooks/useProject";
import { Backdrop, Button, CircularProgress, Grid } from "@mui/material";
import { createRef, useEffect, useReducer, useState } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { CSVReader } from "react-papaparse";
import { useContractFunction } from "@hooks/useContract";
import projectReducer from "reducer/Project";
import { toast } from "react-toastify";

const Whitelist = () => {
  const initialState = {
    loading: false,
  };

  const projectData = useProject();

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const [whiteList, setWhitelist] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);

  const [stateImport, importWhiteList] = useContractFunction(
    projectData.contractInstance,
    "importWhitelist"
  );

  const handleStatus = async (state) => {
    switch (state.status) {
      case "None":
      case "Success":
        dispatch({ type: "loaded" });
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
    console.log(stateImport);
    handleStatus(stateImport);
  }, [stateImport]);

  const handleImportWhitelist = () => {
    console.log(selectedIDs);

    dispatch({ type: "loading" });

    importWhiteList(selectedIDs);
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

  const handleSelectionModelChange = (ids) => {
    setSelectedIDs(ids);
  };

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const buttonRef = createRef();

  const Toolbar = () => (
    <GridToolbarContainer>
      <Button onClick={handleImportWhitelist}>Import Whitelist</Button>
      <CSVReader onFileLoad={handleOnFileLoad} ref={buttonRef} noDrag config={{}} style={{}}>
        {() => <Button onClick={handleOpenDialog}>Upload CSV</Button>}
      </CSVReader>
    </GridToolbarContainer>
  );

  const columns = [{ field: "address", headerName: "Address", width: 400 }];

  console.log("Project Whitelist render", projectData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Table
          rows={whiteList}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          pageSize={30}
          components={{
            Toolbar: Toolbar,
          }}
          onSelectionModelChange={handleSelectionModelChange}
        />
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default Whitelist;
