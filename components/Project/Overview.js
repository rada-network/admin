import { useProject } from "@hooks/useProject";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Overview = () => {
  const projectData = useProject();

  console.log("Project Overview render", projectData);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name:</TableCell>
            <TableCell align="right"> {projectData.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Start:</TableCell>
            <TableCell align="right">{projectData.openDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>End:</TableCell>
            <TableCell align="right"> {projectData.endDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type:</TableCell>
            <TableCell align="right"> {projectData.type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status:</TableCell>
            <TableCell align="right"> {projectData.status}</TableCell>
          </TableRow>

          {projectData && (
            <TableRow>
              <TableCell>Whitelist:</TableCell>
              <TableCell align="right"> {projectData.whitelist}</TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell>Prefuned:</TableCell>
            <TableCell align="right"> {projectData.subscribers}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Winners:</TableCell>
            <TableCell align="right"> {projectData.winners}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Overview;
