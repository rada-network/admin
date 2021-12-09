import Table from "@components/Table";

import PoolAddButton from "./Add";
import { useRouter } from "next/router";
import { usePools } from "providers/Pools";
import { Stack } from "@mui/material";
import Title from "@components/Title";

const PoolList = () => {
  const data = usePools();
  const router = useRouter();

  console.log("ClaimableOnly List render", data);

  const columns = [
    { field: "id", hide: true },
    { field: "address", headerName: "Address", width: 100 },
    {
      field: "allocationBusd",
      headerName: "allocationBusd",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "depositedToken",
      headerName: "depositedToken",
      width: 150,
    },

    {
      field: "startDate",
      headerName: "startDate",
      width: 200,
    },

    {
      field: "endDate",
      headerName: "endDate",
      width: 200,
    },
    {
      field: "locked",
      headerName: "locked",
      width: 100,
    },
    {
      field: "claimOnly",
      headerName: "claimOnly",
      width: 100,
    },
  ];

  const onClick = (params, event) => {
    event.preventDefault();
    router.push(`/pools/${params.row.id}`);
  };

  return (
    <>
      <Title>Pools</Title>
      <Stack direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
        <PoolAddButton type="payable" text="Add a Payable Pool" />
        <PoolAddButton type="claimonly" text="Add a Only Claimable Pool" />
      </Stack>
      <Table rows={data.pools} columns={columns} onCellClick={onClick} />
    </>
  );
};

export default PoolList;
