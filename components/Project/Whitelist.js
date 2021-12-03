import { useProject } from "@hooks/useProject";
import { TextareaAutosize } from "@mui/base";
import { Button, Grid } from "@mui/material";

const Whitelist = () => {
  const projectData = useProject();

  console.log("Project Whitelist render", projectData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          style={{ width: "100%" }}
          placeholder="0x0000000000000000000000000000000000000000, 0x0000000000000000000000000000000000000000"
        />
        <Button variant="contained">Import Whitelist</Button>
      </Grid>
    </Grid>
  );
};

export default Whitelist;
