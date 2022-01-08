import RadaAuctionSettings from "components/RadaAuction/Settings";
import { ProvideRadaAuctionSettings } from "providers/RadaAuctionSettings";

export default function RadaAuctionSettingsContainer() {
  return (
    <ProvideRadaAuctionSettings>
      <RadaAuctionSettings />
    </ProvideRadaAuctionSettings>
  );
}
