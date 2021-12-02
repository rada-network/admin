import { DataGrid } from "@mui/x-data-grid";

const Table = (props) => (
  <div style={{ display: "flex", height: "100%", width: "100%" }}>
    <div style={{ flexGrow: 1 }}>
      <DataGrid {...props} />
    </div>
  </div>
);
export default Table;
