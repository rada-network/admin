import { Grid, TextField } from "@mui/material";
import { usePool } from "providers/Pool";

import poolStatFormData from "config/PoolStatFormData";

const PoolStat = () => {
  const { poolStat } = usePool();

  console.log("PoolDetail State render", poolStat);

  return (
    <Grid container spacing={3}>
      {poolStatFormData.map((field, i) => (
        <Grid item xs={field.size ? field.size : "6"} key={i}>
          <TextField
            required
            name={field.name}
            label={field.label}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={poolStat[field.name]}
            disabled={true}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PoolStat;
