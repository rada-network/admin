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
import { formatAddress } from "utils/format";
import investorTableColumn from "config/InvestorTableColumn";

const PoolInvestors = () => {
  const auth = useGlobal();
  const { contractInstance, pool, isApprover, contractType } = usePool();

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
    //auth.setLoading(true);

    switch (action) {
      case "submit":
        if (selectedIDs.length > 0) {
          const data = investors.filter((investor) => selectedIDs.includes(investor.id));

          const addresses = data.map((row) => row.id);
          const amountBusds = data.map((row) => parseEther(row.amountBusd));
          const allocationBusd = data.map((row) => parseEther(row.allocationBusd));

          switch (contractType) {
            case "poolClaim":
              const refunded = data.map((row) => false);
              actions["importInvestors"].func(
                pool.id,
                addresses,
                amountBusds,
                allocationBusd,
                refunded
              );

              action = "importInvestors";
              break;

            case "poolWhitelist":
              actions["importInvestors"].func(pool.id, addresses, amountBusds, allocationBusd);
              action = "importInvestors";
              break;

            case "poolRIR":
              // Do Winner For poolRIR
              let poolAllocationRir = parseInt(pool.allocationRir);
              const winners = {};

              while (poolAllocationRir > 0) {
                // eslint-disable-next-line no-loop-func
                data.forEach((row) => {
                  if (parseInt(row.amountRir) > 0) {
                    winners[row.id] = {
                      allocationBusd: winners[row.id]?.allocationBusd
                        ? winners[row.id]?.allocationBusd + 100
                        : 100,
                      allocationRir: winners[row.id]?.allocationRir
                        ? winners[row.id]?.allocationRir + 1
                        : 1,
                    };

                    row.amountRir--;
                    poolAllocationRir--;
                  }
                });
              }

              let winnerAddress = [];
              let winnerBusd = [];
              let winnerRIR = [];

              // Get data
              Object.keys(winners).forEach((row) => {
                winnerAddress.push(row);
                winnerBusd.push(parseEther(`${winners[row].allocationBusd}`));
                winnerRIR.push(parseEther(`${winners[row].allocationRir}`));
              });

              console.log("importWinners", winners);

              actions["importWinners"].func(pool.id, winnerAddress, winnerBusd, winnerRIR);

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
      auth.setLoading(true);

      const response = await contractInstance.poolAddresses(pool.id);
      console.log("responseInvestor", response);
      const newInvestors = await Promise.all(
        response.map(async (investor) => {
          const responseInvestor = await contractInstance.getInvestor(pool.id, investor);
          console.log("responseInvestor", responseInvestor);
          return InvestorModel(responseInvestor, investor);
        })
      );

      setInvestors(newInvestors);

      auth.setLoading(false);
    };
    fetchData();
  }, [success]);

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      const newInvestors = csv
        .map((row, i) => ({
          id: row.data[0],
          address: row.data[0],
          amountBusd: row.data[1],
          allocationBusd: row.data[2],
        }))
        .filter((row, i) => i > 0 && row.id);

      setInvestors((prev) => [...prev, ...newInvestors]);
    }
  };

  const handleSelectionModelChange = (selectedIDs) => {
    console.log("handleSelectionModelChange", selectedIDs);
    setSelectedIDs(selectedIDs);
  };

  const columns = investorTableColumn[contractType];

  const Toolbar = () => (
    <GridToolbarContainer>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {contractType !== "poolRIR" && <UploadCSV onUploadFile={handleOnFileLoad} />}
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Box>
      <Stack direction="row" spacing={2}>
        <Button
          disabled={selectedIDs.length === 0}
          variant="contained"
          color="success"
          onClick={() => handlePool("submit")}
        >
          Submit
        </Button>

        <Button
          disabled={!isApprover || !pool.locked}
          variant="contained"
          color="success"
          onClick={() => handlePool("approveInvestors")}
        >
          Aprrove All
        </Button>
        <Button
          disabled={!isApprover || !pool.locked || selectedIDs.length === 0}
          variant="contained"
          color="success"
          onClick={() => handlePool("unapproveInvestor")}
        >
          Unaprrove
        </Button>
      </Stack>
    </GridToolbarContainer>
  );

  console.log("PoolInvestors render", investors, pool);

  return (
    <>
      <Table
        rows={investors}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        pageSize={30}
        components={{
          Toolbar: Toolbar,
        }}
        onSelectionModelChange={handleSelectionModelChange}
      />
    </>
  );
};

export default PoolInvestors;
