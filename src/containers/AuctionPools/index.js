import { Stack } from "@mui/material";
import AuctionPoolsAdd from "components/AuctionPools/Add";
import AuctionPoolsPoolIds from "components/AuctionPools/PoolIds";
import AuctionPoolsTitle from "components/AuctionPools/Title";
import { ProvideAuction } from "providers/AuctionPools";
import AuctionPoolsAddContainer from "./Add";

export default function AuctionPoolsContainer() {
  return (
    <ProvideAuction>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <AuctionPoolsTitle />
        <AuctionPoolsAdd />
      </Stack>
      <AuctionPoolsPoolIds />

      <AuctionPoolsAddContainer />
    </ProvideAuction>
  );
}
