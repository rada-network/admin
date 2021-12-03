import { CSVReader } from "react-papaparse";

const Uploadfile = (props) => {
  const handleOnUpload = (data) => {
    props.onUploadFile(data);
  };

  return (
    <CSVReader
      onFileLoad={handleOnUpload}
      noDrag
      config={{}}
      style={{
        dropFile: {
          width: 100,
          height: 120,
          background: "#ccc",
        },
        fileSizeInfo: {
          color: "#fff",
          backgroundColor: "#000",
          borderRadius: 3,
          lineHeight: 1,
          marginBottom: "0.5em",
          padding: "0 0.4em",
          display: "none",
        },
        fileNameInfo: {
          color: "#fff",
          backgroundColor: "#eee",
          borderRadius: 3,
          fontSize: 14,
          lineHeight: 1,
          padding: "0 0.4em",
          display: "none",
        },
        removeButton: {
          color: "blue",
        },
        progressBar: {
          backgroundColor: "pink",
        },
      }}
    >
      Import
    </CSVReader>
  );
};

export default Uploadfile;
