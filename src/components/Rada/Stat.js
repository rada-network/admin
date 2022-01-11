import { Grid, TextField } from "@mui/material";
import { radaStatsForm } from "config/RadaStatsForm";
import { useRada } from "providers/Rada";

const RadaStats = () => {
  const { poolStat, contractType } = useRada();

  console.log("RadaStats render", poolStat);

  const poolStatFormData = radaStatsForm[contractType];

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
            readOnly={true}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RadaStats;
