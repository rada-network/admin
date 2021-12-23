import Table from "components/Table";

import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";

import { usePool } from "providers/Pool";
import { useEffect, useState } from "react";
import { useActions, useActionState } from "hooks/useActions";

import { useGlobal } from "providers/Global";
import investorTableColumn from "config/InvestorTableColumn";

import { createIndexDB, getInvestor } from "utils/investors";
import indexDbService from "utils/indexDbService";
import PoolInvestorsTotal from "./InvestorsTotal";

const PoolInvestors = () => {
  const auth = useGlobal();
  const { contractInstance, pool, isApprover, contractType } = usePool();

  const [investors, setInvestors] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [filterModel, setFilterModel] = useState();

  const actions = useActions([
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
    auth.setLoading(true);

    switch (action) {
      case "approveInvestors":
        console.log("approveInvestors", pool.id);

        actions[action].func(pool.id);
        break;

      case "unapproveInvestor":
        if (selectedIDs.length > 0) {
          selectedIDs.forEach((address) => {
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

  useEffect(() => {
    const fetchData = async () => {
      let start = 0;
      let limit = 1000;

      auth.setLoading(true);

      await createIndexDB();
      await indexDbService.clear("investors");
      await getInvestor(contractInstance, pool.id, start, limit);

      const newInvestors = await indexDbService.getAll("investors");

      setInvestors(newInvestors);

      auth.setLoading(false);
    };
    fetchData();
  }, [success]);

  const handleSelectionModelChange = (selectedIDs) => {
    console.log("handleSelectionModelChange", selectedIDs);
    setSelectedIDs(selectedIDs);
  };

  const handleOnlyWinner = () => {
    setFilterModel({
      items: [{ id: 1, columnField: "allocationBusd", value: "0", operatorValue: ">" }],
    });
  };

  const handleFilter = (model, details) => {
    setFilterModel(model);
  };

  const columns = investorTableColumn[contractType];

  const Toolbar = () => {
    const hasApproved = investors.filter((investor) => !investor.approved);

    return (
      <GridToolbarContainer>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <GridToolbarFilterButton />
          <GridToolbarExport />
          <Button onClick={handleOnlyWinner}>Only Winner</Button>
        </Box>
        <Stack direction="row" spacing={2}>
          {isApprover && (
            <>
              {hasApproved.length > 0 && (
                <Button
                  disabled={!isApprover || !pool.locked}
                  variant="contained"
                  color="success"
                  onClick={() => handlePool("approveInvestors")}
                >
                  Aprrove
                </Button>
              )}
              <Button
                disabled={!isApprover || !pool.locked || selectedIDs.length === 0}
                variant="contained"
                color="success"
                onClick={() => handlePool("unapproveInvestor")}
              >
                Unaprrove
              </Button>
            </>
          )}
        </Stack>
      </GridToolbarContainer>
    );
  };

  console.log("PoolInvestors render", investors, pool);

  return (
    <>
      <PoolInvestorsTotal investors={investors} columns={columns} />
      <Table
        rows={investors}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: Toolbar,
        }}
        hideFooterPagination={false}
        onSelectionModelChange={handleSelectionModelChange}
        filterModel={filterModel}
        onFilterModelChange={handleFilter}
      />
    </>
  );
};

export default PoolInvestors;
