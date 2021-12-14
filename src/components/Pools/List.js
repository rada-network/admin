import { Stack } from "@mui/material";
import Table from "components/Table";
import Title from "components/Title";
import poolTableColumn from "config/PoolTableColumn";
import { usePools } from "providers/Pools";
import { useNavigate } from "react-router-dom";
import PoolAddButton from "./Add";

export default function PoolList() {
  const data = usePools();
  let navigate = useNavigate();

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
      <Table rows={data.pools} columns={poolTableColumn} onCellClick={onClick} />
    </>
  );
}
