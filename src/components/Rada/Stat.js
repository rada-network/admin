import { Grid, TextField } from "@mui/material";
import { useRada } from "providers/Rada";

const RadaStats = () => {
  const { poolStat } = useRada();

  console.log("RadaStats State render", poolStat);

  const poolStatFormData = [
    {
      name: "totalBid",
      label: "totalBid",
    },
    {
      name: "highestPrice",
      label: "highestPrice",
    },
    {
      name: "totalBidItem",
      label: "totalBidItem",
    },
    {
      name: "totalBidAmount",
      label: "totalBidAmount",
    },
    {
      name: "totalSold",
      label: "totalSold",
    },
    {
      name: "totalSoldAmount",
      label: "totalSoldAmount",
    },
  ];

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
