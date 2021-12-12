import { Stack } from "@mui/material";
import Table from "components/Table";
import Title from "components/Title";
import { usePools } from "providers/Pools";
import { useNavigate } from "react-router-dom";
import PoolAddButton from "./Add";

export default function PoolList() {
  const data = usePools();
  let navigate = useNavigate();

  const columns = [
    { field: "id", hide: true },
    { field: "title", headerName: "title", width: 200 },
    { field: "address", headerName: "token Address", width: 200 },
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
      field: "locked",
      headerName: "locked",
      width: 100,
    },
  ];

  const onClick = (params) => {
    navigate(`/${data.contractType}/${params.row.id}`);
  };

  console.log("PoolList render", data);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ marginBottom: "1rem" }}
      >
        <Title>{data.contractName}</Title>
        <PoolAddButton type="payable" text="Add a Pool" />
      </Stack>
      <Table rows={data.pools} columns={columns} onCellClick={onClick} />
    </>
  );
}
