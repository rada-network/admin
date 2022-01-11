import { Button } from "@mui/material";
import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { useRada } from "providers/Rada";

export default function RadaPublic() {
  const global = useGlobal();
  const { contractInstance, pool } = useRada();

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "handlePublicPool",
    },
  ]);

  const [, , handleState] = useActionState(actions);

  const handlePublicPool = (state) => {
    global.setLoading(true);

    actions["handlePublicPool"].func(pool.poolId, state);

    handleState("handlePublicPool");
  };

  return pool.isPublic ? (
    <Button variant="contained" color="info" onClick={() => handlePublicPool(false)}>
      Unpublic
    </Button>
  ) : (
    <Button variant="contained" color="info" onClick={() => handlePublicPool(true)}>
      Public
    </Button>
  );
}
