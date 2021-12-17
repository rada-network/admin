import { useActions, useActionState } from "hooks/useActions";

import { Button, Grid, Stack, TextField } from "@mui/material";
import { usePool } from "providers/Pool";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { parseEther } from "@ethersproject/units";
import { convertUnix } from "utils/format";

import { useGlobal } from "providers/Global";
import poolFormData from "config/PoolFormData";

import DatePicker from "components/DatePicker";

const PoolOverview = () => {
  const auth = useGlobal();
  const { contractInstance, pool } = usePool();

  const [formState, setFormState] = useState(pool);

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "updatePool",
    },
  ]);

  const [success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", action, success);

    auth.setLoading(true);

    switch (action) {
      case "updatePool":
        actions[action].func(
          formState.id,
          parseEther(formState.allocationBusd),
          parseEther(formState.price),
          `${convertUnix(formState.startDate)}`,
          `${convertUnix(formState.endDate)}`
        );
        break;

      default:
        break;
    }

    handleState(action);
  };

  const handleOnchange = ({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  const formData = poolFormData;

  console.log("PoolDetail Overview render", formState, pool);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        {formData.map((field, i) =>
          field.type === "date" ? (
            <Grid item xs={6} key={i}>
              <DatePicker
                label={field.label}
                value={formState[field.name]}
                onChange={(value) => handleOnchange({ target: { name: field.name, value: value } })}
                renderInput={(params) => <TextField {...params} />}
                disabled={(pool.locked || field.readOnly) ?? false}
              />
            </Grid>
          ) : (
            <Grid item xs={field.size ? field.size : "6"} key={i}>
              <TextField
                name={field.name}
                label={field.label}
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formState[field.name]}
                onChange={handleOnchange}
                disabled={(pool.locked || field.readOnly) ?? false}
              />
            </Grid>
          )
        )}

        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ marginTop: "2rem", justifyContent: "flex-end" }}>
            {!pool.locked && (
              <Button variant="contained" color="success" onClick={() => handlePool("updatePool")}>
                Update
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default PoolOverview;
