import { useGlobal } from "providers/Global";
import { useRada } from "providers/Rada";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBids, createIndexDB, getWinners } from "utils/bids";
import indexDbService from "utils/indexDbService";
import Table from "components/Table";
import bidsTableColumn from "config/BidsTableColumn";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
import { Box, Button, Stack } from "@mui/material";
import { useActions, useActionState } from "hooks/useActions";

const RadaBids = () => {
  const global = useGlobal();
  const { id } = useParams();
  const { poolStat } = useRada();
  const [bids, setBids] = useState([]);
  const [filterModel, setFilterModel] = useState();
  const { contractInstance, contractType, pool } = useRada();

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "handleEndAuction",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handlePool = async (action) => {
    global.setLoading(true);

    switch (action) {
      case "handleEndAuction":
        const winners = await getWinners(pool);

        const bidsIndex = winners.map((winner) => winner.id);
        const quantityWin = winners.map((winner) => winner.quantity);

        console.log("handleEndAuction", pool.poolId, bidsIndex, quantityWin);

        actions[action].func(pool.poolId, bidsIndex, quantityWin);

        break;

      default:
        break;
    }

    handleState(action);
  };

  useEffect(() => {
    const fetchData = async () => {
      let start = 0;
      let limit = poolStat.totalBid > 1000 ? 1000 : poolStat.totalBid;

      global.setLoading(true);
      await createIndexDB();
      await indexDbService.clear("bids");
      await getBids(contractInstance, id, start, limit, poolStat.totalBid);

      const newBids = await indexDbService.getAll("bids");

      setBids(newBids);

      global.setLoading(false);
    };
    fetchData();
  }, [success]);

  const columns = bidsTableColumn[contractType];

  const handleOnlyWinner = () => {
    setFilterModel({
      items: [{ id: 1, columnField: "winQuantity", value: "0", operatorValue: ">" }],
    });
  };

  const handleFilter = (model, details) => {
    setFilterModel(model);
  };

  const handleShowWinner = async () => {
    const winners = await getWinners(pool);
    setBids(winners);
  };

  const Toolbar = () => {
    return (
      <GridToolbarContainer>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <GridToolbarFilterButton />
          <GridToolbarExport />
          <Button onClick={handleOnlyWinner}>Filter Winner</Button>
        </Box>
        {contractType === "radaAuction" ||
          (contractType === "nftAuction" && (
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="success" onClick={handleShowWinner}>
                Show Winner
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={() => handlePool("handleEndAuction")}
              >
                Set Winner
              </Button>
            </Stack>
          ))}
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <Table
        rows={bids}
        columns={columns}
        components={{
          Toolbar: Toolbar,
        }}
        filterModel={filterModel}
        onFilterModelChange={handleFilter}
      />
    </>
  );
};

export default RadaBids;
