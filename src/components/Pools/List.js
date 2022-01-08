import { Button, Stack } from "@mui/material";
import Table from "components/Table";
import Title from "components/Title";
import poolTableColumn from "config/PoolTableColumn";
import { usePools } from "providers/Pools";
import { useNavigate } from "react-router-dom";
import PoolAddButton from "./Add";

export default function PoolList() {
  const data = usePools();
  const navigate = useNavigate();

  const onClick = (params) => {
    navigate(`${process.env.PUBLIC_URL}/${data.contractType}/${params.row.id}`);
  };

  const onSettings = (params) => {
    navigate(`${process.env.PUBLIC_URL}/${data.contractType}/settings`);
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
        <Stack direction="row" spacing={2}>
          {data.isAdmin && <PoolAddButton type="payable" text="Add a Pool" />}
          <Button variant="contained" onClick={onSettings}>
            Settings
          </Button>
        </Stack>
      </Stack>
      <Table rows={data.pools} columns={poolTableColumn} onCellClick={onClick} />
    </>
  );
}
