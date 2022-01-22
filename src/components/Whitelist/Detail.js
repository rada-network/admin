import Table from "components/Table";

import { Button, Modal, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useActions, useActionState } from "hooks/useActions";

import UploadCSV from "components/UploadCSV";
import { useGlobal } from "providers/Global";

import { useWhitelist } from "providers/Whitelist";
import { useNavigate, useParams } from "react-router-dom";

const WhitelistDetail = () => {
  const context = useWhitelist();
  const global = useGlobal();
  const [whitelist, setWhitelist] = useState([]);
  const [title, setTitle] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTitle(context.listTitle);
  }, [context.listTitle]);

  useEffect(() => {
    setWhitelist(context.whitelistAddresses);
  }, [context.whitelistAddresses]);

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: "addList",
    },
    {
      contractInstance: context.contractInstance,
      func: "updateList",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  useEffect(() => {
    if (id === "add") {
      navigate(-1);
    }
  }, [success]);

  const handleSave = () => {
    global.setLoading(true);

    const addresses = whitelist.map((row) => row.address);

    if (id === "add") {
      actions["addList"].func(title, addresses);
    } else {
      console.log("updateList", id, title, addresses);
      actions["updateList"].func(id, title, addresses);
    }

    handleState("addList");
  };

  const handleOnFileLoad = (csv) => {
    if (csv.length > 0) {
      csv.shift(); // remove header

      const newWL = csv.map((row) => ({
        address: row.data[0],
      }));

      setWhitelist(newWL.filter((row) => row.address));
    }
  };

  const handleTitle = ({ target }) => {
    setTitle(target.value);
  };

  const Toolbar = () => {
    return (
      <GridToolbarContainer>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <UploadCSV onUploadFile={handleOnFileLoad} />
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            disabled={!whitelist.length || !title}
            variant="contained"
            color="success"
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  };

  const columns = [{ field: "address", headerName: "address", width: 600 }];

  if (!id) {
    return "";
  }

  return (
    <Stack spacing={3}>
      <TextField
        name="title"
        label="title"
        fullWidth
        autoComplete="given-name"
        variant="standard"
        onChange={handleTitle}
        value={title}
      />
      <Table
        rows={whitelist}
        columns={columns}
        components={{
          Toolbar: Toolbar,
        }}
        getRowId={(row) => row.address}
      />
    </Stack>
  );
};

export default WhitelistDetail;
