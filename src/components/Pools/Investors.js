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
    auth.setLoading(true);

    switch (action) {
      case "submit":
        if (selectedIDs.length > 0) {
          const data = investors.filter((investor) => selectedIDs.includes(investor.id));

          const addresses = data.map((row) => row.id);
          const amountBusds = data.map((row) => parseEther(row.amountBusd));
          const allocationBusd = data.map((row) => parseEther(row.allocationBusd));

          switch (contractType) {
            case "poolClaim":
              const claimedToken = data.map((row) =>
                row.claimedToken ? parseEther(row.claimedToken) : "0"
              );
              const refunded = data.map((row) => (row.refunded ? row.refunded === "true" : false));

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
              // // Do Winner For poolRIR
              // let poolAllocationRir = parseInt(pool.allocationRir);

              // // Get RIR winner
              // let roundRIR = 0;
              // let allocatedRIR = 0;
              // const rirWinners = {};

              // while (poolAllocationRir > 0) {
              //   // eslint-disable-next-line no-loop-func
              //   data.forEach((row) => {
              //     const rir = parseInt(row.amountRir);

              //     if (rir > roundRIR && poolAllocationRir > 0) {
              //       rirWinners[row.id] = {
              //         allocationRir: rirWinners[row.id]?.allocationRir
              //           ? rirWinners[row.id]?.allocationRir + 1
              //           : 1,
              //         allocationBusd: rirWinners[row.id]?.allocationBusd
              //           ? rirWinners[row.id]?.allocationBusd + 100
              //           : 100,
              //       };

              //       allocatedRIR++;
              //       poolAllocationRir--;
              //     }
              //   });
              // }

              // let roundBusd = 0;
              // let poolAllocationBusd = parseInt(pool.allocationBusd / 100) - allocatedRIR;
              // const busdWinners = {};

              // while (poolAllocationBusd > 0) {
              //   // eslint-disable-next-line no-loop-func
              //   data.forEach((row) => {
              //     const rirWinnerAddress = Object.keys(rirWinners);
              //     const busd = parseInt(row.amountBusd) / 100;

              //     if (
              //       busd > roundBusd &&
              //       poolAllocationBusd > 0 &&
              //       !rirWinnerAddress.includes(row.id)
              //     ) {
              //       busdWinners[row.id] = {
              //         allocationBusd: busdWinners[row.id]?.allocationBusd
              //           ? busdWinners[row.id]?.allocationBusd + 100
              //           : 100,
              //       };

              //       poolAllocationBusd--;
              //     }
              //   });
              // }

              // let winnerAddress = [];
              // let winnerBusd = [];
              // let winnerRIR = [];

              // // // Get data
              // Object.keys(rirWinners).forEach((row) => {
              //   winnerAddress.push(row);
              //   winnerBusd.push(parseEther(`${rirWinners[row].allocationBusd}`));
              //   winnerRIR.push(parseEther(`${rirWinners[row].allocationRir}`));
              // });

              // Object.keys(busdWinners).forEach((row) => {
              //   winnerAddress.push(row);
              //   winnerBusd.push(parseEther(`${busdWinners[row].allocationBusd}`));
              //   winnerRIR.push(parseEther("0"));
              // });

              // console.log("importWinners", winnerAddress, rirWinners, busdWinners);

              // // actions["importWinners"].func(pool.id, winnerAddress, winnerBusd, winnerRIR);

              const allocationRir = data.map((row) => parseEther(row.allocationRir));
              console.log("importWinners", addresses, data);
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
      auth.setLoading(true);

      const response = await contractInstance.getAddresses(pool.id, "0", "1000");

      const newInvestors = await Promise.all(
        response.map(async (investor) => {
          const responseInvestor = await contractInstance.getInvestor(pool.id, investor);
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
      if (contractType === "poolRIR") {
        const newInvestors = csv
          .map((row, i) => ({
            id: row.data[0],
            address: row.data[0],
            allocationBusd: row.data[1],
            allocationRir: row.data[2],
          }))
          .filter((row, i) => i > 0 && row.id);

        setInvestors(newInvestors);
      } else {
        const newInvestors = csv
          .map((row, i) => ({
            id: row.data[0],
            address: row.data[0],
            amountBusd: row.data[1],
            allocationBusd: row.data[2],
            claimedToken: row.data[3],
            refunded: row.data[4],
          }))
          .filter((row, i) => i > 0 && row.id);

        setInvestors((prev) => [...prev, ...newInvestors]);
      }
    }
  };

  const handleSelectionModelChange = (selectedIDs) => {
    console.log("handleSelectionModelChange", selectedIDs);
    setSelectedIDs(selectedIDs);
  };

  const handleOnAdd = (data) => {
    data.id = data.address;
    console.log("handleOnAdd", data);

    setInvestors((prev) => [...prev, data]);
  };

  const columns = investorTableColumn[contractType];

  const Toolbar = () => (
    <GridToolbarContainer>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <UploadCSV onUploadFile={handleOnFileLoad} />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <PoolInvestorsAdd onSave={handleOnAdd} />
      </Box>
      <Stack direction="row" spacing={2}>
        <Button
          disabled={selectedIDs.length === 0}
          variant="contained"
          color="success"
          onClick={() => handlePool("submit")}
        >
          Import
        </Button>

        <Button
          disabled={!isApprover || !pool.locked}
          variant="contained"
          color="success"
          onClick={() => handlePool("approveInvestors")}
        >
          Aprrove
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
  );
};

export default PoolInvestors;
