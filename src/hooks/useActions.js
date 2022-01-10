import { useContractFunction } from "@usedapp/core";
import { useGlobal } from "providers/Global";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useActions = (actionArray) => {
  const actions = {};

  actionArray.forEach((action) => {
    const [state, func] = GetContractFunction(action.contractInstance, action.func);

    actions[action.key ?? action.func] = {
      state: state,
      func: func,
    };
  });

  console.log("useActions", actions);

  return actions;
};

const useActionState = (actions) => {
  const [action, setAction] = useState("");
  const [lastAction, setLastAction] = useState("");
  const [success, setSuccess] = useState(false);
  const global = useGlobal();

  const handleState = useCallback(async (action) => {
    setAction(action);
  }, []);

  useEffect(() => {
    setLastAction(action);
  }, [action]);

  useEffect(() => {
    if (action) {
      console.log("useActionState", action, actions);

      const state = actions[action]?.state;

      switch (state.status) {
        case "Success":
          global.setLoading(false);
          setSuccess(true);
          break;
        case "Mining":
          break;
        case "Exception":
          toast(state.errorMessage);
          global.setLoading(false);
          setAction("");
          state.status = "";
          break;
        default:
          break;
      }
    }
  }, [action, actions, global]);

  return [lastAction, success, handleState];
};

const GetContractFunction = (contract, method) => {
  const { state, send } = useContractFunction(contract, method, {
    transactionName: method,
  });

  console.log("GetContractFunction", method, state);

  return [state, send];
};

export { useActions, useActionState };
