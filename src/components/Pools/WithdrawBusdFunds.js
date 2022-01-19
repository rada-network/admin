import { Button } from "@mui/material";
import { useActions, useActionState } from "hooks/useActions";
import { useGlobal } from "providers/Global";
import { usePool } from "providers/Pool";

export default function WithdrawBusdFunds() {
  const global = useGlobal();
  const { contractInstance, pool, poolStat } = usePool();

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "withdrawBusdFunds",
    },
  ]);

  const [, success, handleState] = useActionState(actions);

  const handlePool = (action) => {
    console.log("withdrawBusdFunds", action, success);

    global.setLoading(true);

    switch (action) {
      case "withdrawBusdFunds":
        actions[action].func(pool.id);
        break;

      default:
        break;
    }

    handleState(action);
  };

  console.log("poolStat", parseFloat(poolStat.approvedBusd));
  if (parseFloat(poolStat.approvedBusd) === 0) {
    return null;
  }

  return (
    <Button variant="contained" color="info" onClick={() => handlePool("withdrawBusdFunds")}>
      WithdrawBusdFunds
    </Button>
  );
}
