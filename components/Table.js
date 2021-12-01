import { DataGrid } from "@mui/x-data-grid";

export default function Table(props) {
  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid {...props} />
      </div>
    </div>
  );
}
