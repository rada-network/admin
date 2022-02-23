import Table from "components/Table";

import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useActions, useActionState } from "hooks/useActions";

import UploadCSV from "components/UploadCSV";
import { useGlobal } from "providers/Global";

import { useRada } from "providers/Rada";

const UpdateSalePool = () => {
  const auth = useGlobal();
  const { contractInstance, pool } = useRada();

  const [tokenIds, setTokenIds] = useState([]);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "updateSalePool",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  useEffect(() => {
    const fetchData = async () => {
      auth.setLoading(true);
      const data = await contractInstance.getSaleTokenIds(pool.poolId);

      const ids = data.map((row) => ({
        id: row,
      }));

      setTokenIds(ids);
      auth.setLoading(false);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdate = () => {
    auth.setLoading(true);

    const ids = tokenIds.map((row) => row.id);

    actions["updateSalePool"].func(pool.poolId, ids);
    handleState("updateSalePool");
  };

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      csv.shift(); // remove header

      const newWL = csv.map((row) => ({
        id: row.data[0],
      }));

      setTokenIds(newWL.filter((row) => row.id));
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
            disabled={!tokenIds.length}
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

  const columns = [{ field: "id", headerName: "Token Id", width: 500 }];

  console.log("UpdateSalePool render", columns, success);

  return (
    <Table
      rows={tokenIds}
      columns={columns}
      components={{
        Toolbar: Toolbar,
      }}
    />
  );
};

export default UpdateSalePool;
