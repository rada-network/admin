import { Button } from "@mui/material";
import { useRada } from "providers/Rada";
import { useNavigate } from "react-router-dom";

const RadaSettingsButton = (props) => {
  const navigate = useNavigate();
  const { isOwner } = useRada();

  const onSettings = (params) => {
    navigate(`${process.env.PUBLIC_URL}/rada/settings`);
  };

  if (!isOwner) {
    return "";
  }

  return (
    <Button variant="contained" onClick={onSettings}>
      Settings
    </Button>
  );
};

export default RadaSettingsButton;
