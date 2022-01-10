import { Button } from "@mui/material";
import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { usePool } from "providers/Pool";

export default function LockPool() {
  const global = useGlobal();
  const { contractInstance, pool, isApprover } = usePool();

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "lockPool",
    },
    {
      contractInstance: contractInstance,
      func: "unlockPool",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("handlePool", action, success);

    global.setLoading(true);

    switch (action) {
      case "lockPool":
      case "unlockPool":
        actions[action].func(pool.id);
        break;

      default:
        break;
    }

    handleState(action);
  };

  if (!isApprover) {
    return null;
  }

  return pool.locked ? (
    <Button variant="contained" color="info" onClick={() => handlePool("unlockPool")}>
      UnLock
    </Button>
  ) : (
    <Button variant="contained" color="info" onClick={() => handlePool("lockPool")}>
      Lock
    </Button>
  );
}
