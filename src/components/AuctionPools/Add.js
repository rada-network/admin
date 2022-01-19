import { Button } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

export default function AuctionPoolsAddButton() {
  const { type } = useParams();
  const navigate = useNavigate();

  const handleClick = ({ target }) => {
    navigate(`${process.env.PUBLIC_URL}/auction/${type}/add`);
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Add
    </Button>
  );
}
