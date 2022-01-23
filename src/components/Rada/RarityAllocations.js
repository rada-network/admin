import Table from "components/Table";

import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { useState } from "react";
import { useActions, useActionState } from "hooks/useActions";

import UploadCSV from "components/UploadCSV";
import { useGlobal } from "providers/Global";

import { useRada } from "providers/Rada";

const RadaRarityAllocations = () => {
  const auth = useGlobal();
  const { contractInstance, pool } = useRada();

  const [date, setData] = useState([]);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "updateRarityAllocations",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handleUpdate = () => {
    auth.setLoading(true);

    const rarityIds = date.map((row) => row.rarityId);
    const rarityAllocationsBusd = date.map((row) => row.rarityAllocationsBusd);

    actions["updateRarityAllocations"].func(pool.poolId, rarityAllocationsBusd, rarityIds);
    handleState("updateRarityAllocations");
  };

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      csv.shift(); // remove header

      const newWL = csv.map((row) => ({
        rarityId: row.data[0],
        rarityAllocationsBusd: row.data[1],
      }));

      setData(newWL.filter((row) => row.rarityId));
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
            disabled={!date.length}
            variant="contained"
            color="success"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  };

  const columns = [
    { field: "rarityId", headerName: "rarityId", width: 200 },
    { field: "rarityAllocationsBusd", headerName: "rarityAllocationsBusd", width: 200 },
  ];

  console.log("RadaRarityAllocations render", columns, success);

  return (
    <Table
      rows={date}
      columns={columns}
      components={{
        Toolbar: Toolbar,
      }}
      getRowId={(row) => row.rarityId}
    />
  );
};

export default RadaRarityAllocations;
