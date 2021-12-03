import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  useGridApiContext,
  useGridState,
} from "@mui/x-data-grid";

import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const [state] = useGridState(apiRef);

  return (
    <Pagination
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const Table = (props) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        pagination
        pageSize={10}
        components={{
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
        }}
        {...props}
      />
    </Box>
  );
};
export default Table;
