import RadaSettings from "components/Rada/Settings";
import { ProvideRadaSettings } from "providers/RadaSettings";

export default function RadaSettingsContainer() {
  return (
    <ProvideRadaSettings>
      <RadaSettings />
    </ProvideRadaSettings>
  );
}
