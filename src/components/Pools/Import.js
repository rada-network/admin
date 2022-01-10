import Table from "components/Table";

import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { usePool } from "providers/Pool";
import { useState } from "react";
import { useActions, useActionState } from "hooks/useActions";
import { parseEther } from "@ethersproject/units";
import UploadCSV from "components/UploadCSV";
import { useGlobal } from "providers/Global";

import PoolInvestorsAdd from "./InvestorsAdd";

import winnerTableColumn from "config/WinnerTableColumn";

const PoolImport = () => {
  const auth = useGlobal();
  const { contractInstance, contractType, pool, isAdmin } = usePool();

  const [investors, setInvestors] = useState([]);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "importWinners",
    },
    {
      contractInstance: contractInstance,
      func: "importInvestors",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    auth.setLoading(true);

    switch (action) {
      case "submit":
        const addresses = investors.map((row) => row.address);
        const amountBusds = investors.map((row) =>
          row.amountBusd ? parseEther(row.amountBusd) : "0"
        );
        const allocationBusd = investors.map((row) =>
          row.allocationBusd ? parseEther(row.allocationBusd) : "0"
        );

        switch (contractType) {
          case "poolClaim":
            const claimedToken = investors.map((row) =>
              row.claimedToken ? parseEther(row.claimedToken) : "0"
            );
            const refunded = investors.map((row) =>
              row.refunded ? row.refunded === "true" : false
            );

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
            const allocationRir = investors.map((row) =>
              row.allocationRir ? parseEther(row.allocationRir) : "0"
            );

            actions["importWinners"].func(pool.id, addresses, allocationBusd, allocationRir);

            action = "importWinners";
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }

    handleState(action);
  };

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      csv.shift(); // remove header

      let newInvestors = [];

      switch (contractType) {
        case "poolClaim":
          newInvestors = csv.map((row) => ({
            address: row.data[0],
            amountBusd: row.data[1],
            allocationBusd: row.data[2],
            claimedToken: row.data[3],
            refunded: row.data[4],
          }));
          break;

        case "poolRIR":
          newInvestors = csv.map((row) => ({
            address: row.data[0],
            allocationBusd: row.data[1],
            allocationRir: row.data[2],
          }));
          break;

        case "poolWhitelist":
          newInvestors = csv.map((row) => ({
            address: row.data[0],
            amountBusd: row.data[1],
            allocationBusd: row.data[2],
          }));
          break;

        default:
          break;
      }

      setInvestors(newInvestors.filter((row) => row.address));
    }
  };

  const handleOnAdd = (data) => {
    data.id = data.address;
    console.log("handleOnAdd", data);

    setInvestors([...investors, data]);
  };

  const Toolbar = () => {
    return (
      <GridToolbarContainer>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {isAdmin && (
            <Stack direction="row" spacing={2}>
              <UploadCSV onUploadFile={handleOnFileLoad} />
              <PoolInvestorsAdd onSave={handleOnAdd} />
            </Stack>
          )}
        </Box>
        <Stack direction="row" spacing={2}>
          {isAdmin && (
            <Button
              disabled={!investors.length}
              variant="contained"
              color="success"
              onClick={() => handlePool("submit")}
            >
              Import Winner
            </Button>
          )}
        </Stack>
      </GridToolbarContainer>
    );
  };

  const columns = winnerTableColumn[contractType];

  console.log("PoolInvestors render", columns, success);

  return (
    <Table
      rows={investors}
      columns={columns}
      components={{
        Toolbar: Toolbar,
      }}
      getRowId={(row) => row.address}
    />
  );
};

export default PoolImport;
