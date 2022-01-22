import { Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const WhitelistAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(`${process.env.PUBLIC_URL}/whitelist/add`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (id === "add") {
    return (
      <Button variant="contained" onClick={handleBack}>
        Back
      </Button>
    );
  }

  return (
    <>
      <Stack direction="row" justifyContent="end">
        <Button variant="contained" onClick={handleAdd}>
          Add new List
        </Button>
      </Stack>
    </>
  );
};

export default WhitelistAdd;
