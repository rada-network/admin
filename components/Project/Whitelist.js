import { styled } from "@mui/material/styles";
import { useProject } from "@hooks/useProject";
import { Button, Stack } from "@mui/material";
import { useReducer } from "react";
import projectReducer from "reducer/project";

import Uploadfile from "@components/Uploadfile";

const Input = styled("input")({
  display: "none",
});

const Whitelist = (props) => {
  const initialState = {
    whistList: [],
    b: "a",
  };
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const handleOnUpload = (data) => {
    console.log("handleOnUpload", data);

    dispatch({ type: "importWhitelist" });
  };

  console.log(state);

  return (
    <>
      <Uploadfile onUploadFile={handleOnUpload} />
    </>
  );
};

export default Whitelist;
