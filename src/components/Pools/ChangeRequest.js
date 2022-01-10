import { useActions, useActionState } from "hooks/useActions";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { usePool } from "providers/Pool";
import { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { parseEther } from "@ethersproject/units";
import { convertUnix } from "utils/format";
import { useGlobal } from "providers/Global";
import poolFormChangeRequest from "config/PoolFormChangeRequest";
import { formatUnits } from "@ethersproject/units";
import ChangeRequestModel from "model/ChangeRequest";
import DatePicker from "components/DatePicker";

const PoolChangeRequest = () => {
  const auth = useGlobal();
  const { contractInstance, pool, isApprover } = usePool();

  const [formState, setFormState] = useState(ChangeRequestModel({}));

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "requestChangePoolData",
    },
    {
      contractInstance: contractInstance,
      func: "requestChangeWithdrawAddress",
    },
    {
      contractInstance: contractInstance,
      func: "approveRequestChange",
    },
    {
      contractInstance: contractInstance,
      func: "rejectRequestChange",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", action);

    auth.setLoading(true);

    switch (action) {
      case "requestChangePoolData":
        console.log("approveRequestChange", pool.id, formState);

        actions[action].func(
          pool.id,
          formState.allocationBusd ? parseEther(formState.allocationBusd) : "0",
          formState.endDate ? `${convertUnix(formState.endDate)}` : "0",
          formState.tokenAddress
            ? formState.tokenAddress
            : "0x0000000000000000000000000000000000000000"
        );
        break;

      case "approveRequestChange":
        console.log("approveRequestChange");
        actions[action].func();

        break;

      case "rejectRequestChange":
        console.log("rejectRequestChange");
        actions[action].func();
        break;
      default:
        break;
    }

    handleState(action);
  };

  const handleOnchange = ({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  };

  useEffect(() => {
    const fetchData = async () => {
      auth.setLoading(true);

      const response = await contractInstance.requestChangeData();
      console.log("response,", response);
      if (parseInt(formatUnits(response.poolIndex, 0)) === parseInt(pool.id)) {
        setFormState(ChangeRequestModel(response));
      }

      auth.setLoading(false);
    };
    fetchData();
  }, [success]);

  const formData = poolFormChangeRequest;

  console.log("PoolChangeRequest Overview render", formState);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        {formData.map((field, i) => (
          <Grid item xs={6} key={i}>
            {field.type === "date" ? (
              <>
                <DatePicker
                  label={field.label}
                  value={formState[field.name]}
                  onChange={(value) =>
                    handleOnchange({ target: { name: field.name, value: value } })
                  }
                  minDate={new Date()}
                  renderInput={(params) => <TextField {...params} />}
                />
              </>
            ) : (
              <TextField
                name={field.name}
                label={field.label}
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formState[field.name]}
                onChange={handleOnchange}
                disabled={field.readOnly ?? false}
              />
            )}
          </Grid>
        ))}

        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ marginTop: "2rem", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handlePool("requestChangePoolData")}
              disabled={!pool.locked}
            >
              Submit
            </Button>

            {isApprover && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handlePool("approveRequestChange")}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handlePool("rejectRequestChange")}
                >
                  Reject
                </Button>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default PoolChangeRequest;
