import { useContact } from "./useContract";
import { useContractFunction } from "@usedapp/core";

const useImportWinners = (contractAddress) => {
  const contract = useContact(contractAddress);

  const { state, send } = useContractFunction(contract, "importWinners", {
    transactionName: "importWinners",
  });

  const action = (address, busd) => {
    send(address, busd);
  };

  console.log(state);

  return [state, action];
};

const useResetWinners = (contractAddress) => {
  const contract = useContact(contractAddress);

  const { state, send } = useContractFunction(contract, "setEmptyWins", {
    transactionName: "setEmptyWins",
  });

  console.log(state);

  return send;
};

export { useImportWinners, useResetWinners };
