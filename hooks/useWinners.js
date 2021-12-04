import { useContact } from "./useContract";
import { useContractFunction } from "@usedapp/core";
import { useState } from "react";

const useImportWinners = (contractAddress) => {
  const contract = useContact(contractAddress);

  const { state, send } = useContractFunction(contract, "importWinners", {
    transactionName: "importWinners",
  });

  //console.log(state);

  return [state, send];
};

const useResetWinners = (contractAddress) => {
  const contract = useContact(contractAddress);

  const { state, send } = useContractFunction(contract, "setEmptyWins", {
    transactionName: "setEmptyWins",
  });

  console.log(state);

  return [state, send];
};

export { useImportWinners, useResetWinners };
