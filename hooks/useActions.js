import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { useContractFunction } from "./useContract";

const useActions = (actionArray) => {
  const actions = {};

  actionArray.forEach((action) => {
    const [state, func] = useContractFunction(action.contractInstance, action.func);

    actions[action.func] = {
      state: state,
      func: func,
    };
  });

  console.log("useActions", actions);

  return actions;
};

const useActionState = (actions) => {
  const [action, setAction] = useState("");
  const [success, setSuccess] = useState(false);
  const auth = useAuth();

  const handleState = useCallback(async (action) => {
    setAction(action);
  }, []);

  useEffect(() => {
    if (action) {
      console.log("useActionState", action, actions);

      const state = actions[action]?.state;

      switch (state.status) {
        case "Success":
          auth.setLoading(false);
          setSuccess(true);
          break;
        case "Mining":
          break;
        case "Exception":
          toast(state.errorMessage);
          auth.setLoading(false);
          setAction("");
          state.status = "";
          break;
        default:
          break;
      }
    }
  }, [actions]);

  return [success, handleState];
};

export { useActions, useActionState };
