import { useProject } from "@hooks/useProject";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Detail = () => {
  const projectData = useProject();

  console.log("Project Detail render", projectData);

  return <>Detail</>;
};

export default Detail;
