import Table from "components/Table";

import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useActions, useActionState } from "hooks/useActions";

import UploadCSV from "components/UploadCSV";
import { useGlobal } from "providers/Global";

import { useRada } from "providers/Rada";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { getDecimals } from "hooks/useDecimals";

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

  const [, , handleState] = useActionState(actions);

  useEffect(() => {
    const fetchData = async () => {
      auth.setLoading(true);

      try {
        const { addressPayableDecimals } = await getDecimals();

        const rarities = await contractInstance.getRarities(pool.poolId);

        const newWL = rarities[0]?.map((row, i) => ({
          rarityId: row,
          rarityAllocationsBusd: formatUnits(rarities[1][i], addressPayableDecimals),
        }));

        setData(newWL);
      } catch (error) {}

      auth.setLoading(false);
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    auth.setLoading(true);

    const { addressPayableDecimals } = await getDecimals();

    const rarityIds = date.map((row) => row.rarityId);
    const rarityAllocationsBusd = date.map((row) =>
      parseUnits(row.rarityAllocationsBusd, addressPayableDecimals)
    );

    actions["updateRarityAllocations"].func(pool.poolId, rarityIds, rarityAllocationsBusd);
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
          <GridToolbarExport />
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

  console.log("RadaRarityAllocations render");

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
