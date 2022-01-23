import Table from "components/Table";
import { parseJSON } from "date-fns";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { useState } from "react";
import { useActions, useActionState } from "hooks/useActions";
import { parseEther, parseUnits } from "@ethersproject/units";
import UploadCSV from "components/UploadCSV";
import { useGlobal } from "providers/Global";
import { convertUnix } from "utils/format";
import { useRada } from "providers/Rada";

const RadaVestingPlan = () => {
  const auth = useGlobal();
  const { contractInstance, pool } = useRada();

  const [data, setData] = useState([]);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "updateVestingPlan",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handleUpdate = () => {
    auth.setLoading(true);

    const dates = data.map((row) => {
      const ar = row.date.split(" ");
      const date = ar[0].split("/");
      const time = ar[1].split(":");

      return convertUnix(new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]));
    });

    const volumes = data.map((row) => parseUnits(row.volume, 3));

    console.log("handleUpdate", pool.poolId, data, dates, volumes);

    actions["updateVestingPlan"].func(pool.poolId, dates, volumes);
    handleState("updateVestingPlan");
  };

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      csv.shift(); // remove header

      const newWL = csv.map((row) => ({
        date: row.data[0],
        volume: row.data[1],
      }));

      setData(newWL.filter((row) => row.date));
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
            disabled={!data.length}
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
    { field: "date", headerName: "date", width: 200 },
    { field: "volume", headerName: "volume", width: 200 },
  ];

  console.log("RadaVestingPlan render", columns, success);

  return (
    <Table
      rows={data}
      columns={columns}
      components={{
        Toolbar: Toolbar,
      }}
      getRowId={(row) => row.date}
    />
  );
};

export default RadaVestingPlan;
