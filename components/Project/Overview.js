import { useProject } from "@hooks/useProject";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Overview = () => {
  const projectData = useProject();

  console.log("Project Overview render", projectData);

  return <>Overview</>;
};

export default Overview;
