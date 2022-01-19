import Typography from "@mui/material/Typography";
import { useAuction } from "providers/AuctionPools";

const AuctionPoolsTitle = (props) => {
  const { contractName } = useAuction();
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {contractName}
    </Typography>
  );
};

export default AuctionPoolsTitle;
