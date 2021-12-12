import PoolDetail from "components/Pools/Detail";
import { ProvidePool } from "providers/Pool";

export default function Pool() {
  return (
    <ProvidePool>
      <PoolDetail />
    </ProvidePool>
  );
}
