import { Stack } from "@mui/material";
import PoolIds from "components/PoolIds";
import RadaAuctionAdd from "components/RadaAuction/Add";
import RadaAuctionDetail from "components/RadaAuction/Detail";
import RadaAuctionSettingsButton from "components/RadaAuction/SettingsButton";

import { ProvideRadaAuction } from "providers/RadaAuction";

export default function RadaAuction() {
  return (
    <ProvideRadaAuction>
      <Stack direction="row" spacing={2} justifyContent="end">
        <RadaAuctionAdd />
        <RadaAuctionSettingsButton />
      </Stack>

      <PoolIds />

      <RadaAuctionDetail />
    </ProvideRadaAuction>
  );
}
