import { useProject } from "@hooks/useProject";
import { TextareaAutosize } from "@mui/base";
import { Button, Grid } from "@mui/material";

const Winner = () => {
  const projectData = useProject();

  console.log("Project Winner render", projectData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          style={{ width: "100%" }}
          placeholder="0x0000000000000000000000000000000000000000, 0x0000000000000000000000000000000000000000"
        />
        <Button variant="contained">Import Winner</Button>
        <Button variant="contained">Commit Winner</Button>
        <Button variant="contained">Reset Winner</Button>
        <Button variant="contained">Export Winner</Button>
      </Grid>
    </Grid>
  );
};

export default Winner;
