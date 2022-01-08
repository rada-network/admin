import Table from "components/Table";

import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { useState } from "react";
import { useActions, useActionState } from "hooks/useActions";

import UploadCSV from "components/UploadCSV";
import { useGlobal } from "providers/Global";

import { useRadaAuction } from "providers/RadaAuction";

const RadaAuctionImport = () => {
  const auth = useGlobal();
  const { contractInstance, pool } = useRadaAuction();

  const [whitelist, setWhitelist] = useState([]);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "setWhitelist",
    },
  ]);

  const [success, handleState] = useActionState(actions);

  const handleImportWhitelist = () => {
    auth.setLoading(true);

    const allow = whitelist.map((row) => (row.refunded ? row.allow === "true" : false));
    const addresses = whitelist.map((row) => row.address);

    actions["setWhitelist"].func(pool.poolId, addresses, allow);
    handleState("setWhitelist");
  };

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      csv.shift(); // remove header

      const newWL = csv.map((row) => ({
        address: row.data[0],
        allow: row.data[1],
      }));

      setWhitelist(newWL.filter((row) => row.address));
    }
  };

  const Toolbar = () => {
    return (
      <GridToolbarContainer>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <UploadCSV onUploadFile={handleOnFileLoad} />
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            disabled={!whitelist.length}
            variant="contained"
            color="success"
            onClick={handleImportWhitelist}
          >
            Import Whitelist
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  };

  const columns = [
    { field: "address", headerName: "address", width: 800 },
    { field: "allow", headerName: "allow" },
  ];

  console.log("RadaAuctionImport render", columns, success);

  return (
    <Table
      rows={whitelist}
      columns={columns}
      components={{
        Toolbar: Toolbar,
      }}
      getRowId={(row) => row.address}
    />
  );
};

export default RadaAuctionImport;
