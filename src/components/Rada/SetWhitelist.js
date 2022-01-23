import Table from "components/Table";

import { Button, Stack } from "@mui/material";

import { GridToolbarContainer } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useActions, useActionState } from "hooks/useActions";

import { useGlobal } from "providers/Global";

import { useRada } from "providers/Rada";

import { useParams } from "react-router-dom";

import useWhitelistHook from "hooks/useWhitelist";

const RadaSetWhitelist = () => {
  const global = useGlobal();
  const context = useRada();
  const { id } = useParams();

  const whitelistIds = useWhitelistHook();
  const [selectionModel, setSelectionModel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      global.setLoading(true);

      // get Current
      const list = await context.contractInstance.getWhitelistIds(id);

      setSelectionModel(list);

      global.setLoading(false);
    };
    fetchData();
  }, []);

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: "setWhitelistIds",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handleSetWhitelistIds = () => {
    console.log("handleSetWhitelistIds", selectionModel);

    global.setLoading(true);

    actions["setWhitelistIds"].func(id, selectionModel);
    handleState("setWhitelistIds");
  };

  const Toolbar = () => {
    return (
      <GridToolbarContainer>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Button
            disabled={!whitelistIds.length}
            variant="contained"
            color="success"
            onClick={handleSetWhitelistIds}
          >
            Save
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  };

  const columns = [
    { field: "value", headerName: "value" },
    { field: "label", headerName: "label" },
  ];

  console.log("RadaImport render", columns, success);

  return (
    <Table
      rows={whitelistIds}
      columns={columns}
      checkboxSelection
      selectionModel={selectionModel}
      onSelectionModelChange={setSelectionModel}
      components={{
        Toolbar: Toolbar,
      }}
      getRowId={(row) => row.value}
    />
  );
};

export default RadaSetWhitelist;
