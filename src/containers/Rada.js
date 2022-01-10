import { Stack } from "@mui/material";
import PoolIds from "components/PoolIds";
import RadaAdd from "components/Rada/Add";
import RadaDetail from "components/Rada/Detail";
import RadaSettingsButton from "components/Rada/SettingsButton";
import { ProvideRada } from "providers/Rada";

export default function Rada() {
  return (
    <ProvideRada>
      <Stack direction="row" spacing={2} justifyContent="end">
        <RadaAdd />
        <RadaSettingsButton />
      </Stack>

      <PoolIds />

      <RadaDetail />
    </ProvideRada>
  );
}
