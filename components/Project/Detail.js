import { useProject } from "@hooks/useProject";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Detail = () => {
  const projectData = useProject();

  console.log("Project Detail render", projectData);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Token address
          </Typography>
          <TextField
            id="standard-basic"
            label="Token Address"
            variant="standard"
            defaultValue={projectData.tokenAddress}
            fullWidth={true}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained">Import Token Adrress</Button>
          <Button variant="contained">Commit Token Adrress</Button>
          <Button variant="contained">Approve Contract</Button>
          <Button variant="contained">Deposit Token</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Detail;
