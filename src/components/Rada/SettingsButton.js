import { Button } from "@mui/material";
import { useRada } from "providers/Rada";
import { useNavigate, useParams } from "react-router-dom";

const RadaSettingsButton = (props) => {
  const navigate = useNavigate();
  const { isOwner, contractType } = useRada();
  const { type } = useParams();

  const onSettings = (params) => {
    navigate(`${process.env.PUBLIC_URL}/rada/${type}/settings`);
  };

  if (!isOwner) {
    return "";
  }

  return (
    contractType !== "nftClaim" &&
    contractType !== "nftMan" &&
    contractType !== "randomizeByRarity" && (
      <Button variant="contained" onClick={onSettings}>
        Settings
      </Button>
    )
  );
};

export default RadaSettingsButton;
