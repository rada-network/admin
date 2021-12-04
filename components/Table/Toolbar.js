import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";

const Toolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default Toolbar;
