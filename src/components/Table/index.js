import { DataGrid } from "@mui/x-data-grid";

import { Box } from "@mui/system";
import Toolbar from "./Toolbar";

const Table = (props) => {
  const data = {
    pageSize: 100,
    components: {
      Toolbar: Toolbar,
    },
    ...props,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid autoHeight {...data} />
    </Box>
  );
};
export default Table;
