import PoolList from "components/Pools/List";
import { ProvidePools } from "providers/Pools";

export default function Pools() {
  return (
    <ProvidePools>
      <PoolList />
    </ProvidePools>
  );
}
