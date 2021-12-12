import { Button } from "@mui/material";
import { createRef } from "react";
import { CSVReader } from "react-papaparse";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const UploadCSV = (props) => {
  const buttonRef = createRef();

  const handleOnUpload = (data) => {
    props.onUploadFile(data);
  };

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  return (
    <CSVReader onFileLoad={handleOnUpload} ref={buttonRef} noDrag config={{}} style={{}}>
      {() => (
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          startIcon={<DriveFolderUploadIcon />}
        >
          Upload CSV
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadCSV;
