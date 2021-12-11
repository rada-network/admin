import { DataGrid } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import { Box } from "@mui/system";

const Toolbar = dynamic(() => import("./Toolbar"));

const Table = (props) => {
  const data = {
    pageSize: 20,
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
