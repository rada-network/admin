import PoolSettingsPage from "components/Pools/Settings";
import { ProvidePoolSettings } from "providers/PoolSettings";

const PoolSettingsContainer = () => {
  return (
    <ProvidePoolSettings>
      <PoolSettingsPage />
    </ProvidePoolSettings>
  );
};

export default PoolSettingsContainer;
