import { Stack } from "@mui/material";
import WhitelistAdd from "components/Whitelist/Add";
import WhitelistDetail from "components/Whitelist/Detail";
import WhitelistList from "components/Whitelist/List";
import { ProvideWhitelist } from "providers/Whitelist";

export default function WhitelistContainer() {
  return (
    <ProvideWhitelist>
      <Stack direction="row" spacing={2} justifyContent="end">
        <WhitelistAdd />
      </Stack>

      <WhitelistList />
      <WhitelistDetail />
    </ProvideWhitelist>
  );
}
