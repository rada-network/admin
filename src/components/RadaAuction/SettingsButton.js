import { Button } from "@mui/material";
import { useRadaAuction } from "providers/RadaAuction";
import { useNavigate } from "react-router-dom";

const RadaAuctionSettingsButton = (props) => {
  const navigate = useNavigate();
  const { isOwner } = useRadaAuction();

  const onSettings = (params) => {
    navigate(`${process.env.PUBLIC_URL}/radaAuction/settings`);
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

export default RadaAuctionSettingsButton;
