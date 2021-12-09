import PoolList from "@components/Pools/list";

import { ProvidePools } from "providers/Pools";

export default function Claimableonly() {
  return (
    <ProvidePools>
      <PoolList />
    </ProvidePools>
  );
}
