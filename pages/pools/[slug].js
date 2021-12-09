import PoolDetail from "@components/Pools/Detail";

import { ProvidePool } from "providers/Pool";

export default function ClaimableonlyDetail() {
  return (
    <ProvidePool>
      <PoolDetail />
    </ProvidePool>
  );
}
