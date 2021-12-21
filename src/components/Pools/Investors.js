import Table from "components/Table";

import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
import InvestorModel from "model/Investor";
import { usePool } from "providers/Pool";
import { useEffect, useState } from "react";
import { useActions, useActionState } from "hooks/useActions";
import { parseEther } from "@ethersproject/units";
import UploadCSV from "components/UploadCSV";
import { useGlobal } from "providers/Global";
import investorTableColumn from "config/InvestorTableColumn";
import PoolInvestorsAdd from "./InvestorsAdd";

import { createIndexDB, getInvestor } from "utils/investors";
import indexDbService from "utils/indexDbService";

const PoolInvestors = () => {
  const auth = useGlobal();
  const { contractInstance, pool, isApprover, isAdmin, contractType } = usePool();

  const [investors, setInvestors] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "importWinners",
    },
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
    auth.setLoading(true);

    switch (action) {
      case "submit":
        if (selectedIDs.length > 0) {
          const data = investors.filter((investor) => selectedIDs.includes(investor.id));

          const addresses = data.map((row) => row.id);
          const amountBusds = data.map((row) =>
            row.amountBusd ? parseEther(row.amountBusd) : "0"
          );
          const allocationBusd = data.map((row) =>
            row.allocationBusd ? parseEther(row.allocationBusd) : "0"
          );

          switch (contractType) {
            case "poolClaim":
              const claimedToken = data.map((row) =>
                row.claimedToken ? parseEther(row.claimedToken) : "0"
              );
              const refunded = data.map((row) => (row.refunded ? row.refunded === "true" : false));

              console.log(
                "importInvestors",
                pool.id,
                addresses,
                amountBusds,
                allocationBusd,
                claimedToken,
                refunded
              );

              actions["importInvestors"].func(
                pool.id,
                addresses,
                amountBusds,
                allocationBusd,
                claimedToken,
                refunded
              );

              action = "importInvestors";
              break;

            case "poolWhitelist":
              actions["importInvestors"].func(pool.id, addresses, amountBusds, allocationBusd);
              action = "importInvestors";
              break;

            case "poolRIR":
              const allocationRir = data.map((row) =>
                row.allocationRir ? parseEther(row.allocationRir) : "0"
              );

              actions["importWinners"].func(pool.id, addresses, allocationBusd, allocationRir);

              action = "importWinners";
              break;

            default:
              break;
          }
        }
        break;

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

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      let newInvestors = [];
      if (contractType === "poolRIR") {
        newInvestors = csv
          .map((row, i) => ({
            id: row.data[0],
            address: row.data[0],
            allocationBusd: row.data[1],
            allocationRir: row.data[2],
          }))
          .filter((row, i) => i > 0 && row.id);
      } else {
        newInvestors = csv
          .map((row, i) => ({
            id: row.data[0],
            address: row.data[0],
            amountBusd: row.data[1],
            allocationBusd: row.data[2],
            claimedToken: row.data[3],
            refunded: row.data[4],
          }))
          .filter((row, i) => i > 0 && row.id);
      }

      const result = newInvestors.concat(
        investors.filter((bo) => newInvestors.every((ao) => ao.address !== bo.address))
      );

      console.log("newInvestors", result);

      setInvestors(result);
    }
  };

  const handleSelectionModelChange = (selectedIDs) => {
    console.log("handleSelectionModelChange", selectedIDs);
    setSelectedIDs(selectedIDs);
  };

  const handleOnAdd = (data) => {
    data.id = data.address;
    console.log("handleOnAdd", data);

    setInvestors([...investors, data]);
  };

  const columns = investorTableColumn[contractType];

  const Toolbar = () => {
    const hasApproved = investors.filter((investor) => !investor.approved);

    console.log("hasApproved", hasApproved);
    return (
      <GridToolbarContainer>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {isAdmin && <UploadCSV onUploadFile={handleOnFileLoad} />}
          <GridToolbarFilterButton />
          <GridToolbarExport />
          {isAdmin && <PoolInvestorsAdd onSave={handleOnAdd} />}
        </Box>
        <Stack direction="row" spacing={2}>
          {isAdmin && (
            <Button
              disabled={selectedIDs.length === 0}
              variant="contained"
              color="success"
              onClick={() => handlePool("submit")}
            >
              Import
            </Button>
          )}

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
              </Button>{" "}
            </>
          )}
        </Stack>
      </GridToolbarContainer>
    );
  };

  console.log("PoolInvestors render", investors, pool);

  return (
    <Table
      rows={investors}
      columns={columns}
      checkboxSelection
      disableSelectionOnClick
      components={{
        Toolbar: Toolbar,
      }}
      onSelectionModelChange={handleSelectionModelChange}
    />
  );
};

export default PoolInvestors;
