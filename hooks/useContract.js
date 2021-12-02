import { ethers } from "ethers";
import launchpadAbiV2 from "../config/abi/launchpadv2.json";
import { useContractCall } from "@usedapp/core";
import Address from "@components/Address";
import { formatAddress } from "utils/format";

const useContract = (method, contractAddress, args = []) => {
  const [val] =
    useContractCall(
      contractAddress && {
        abi: new ethers.utils.Interface(launchpadAbiV2),
        address: contractAddress,
        method: method,
        args: args,
      }
    ) ?? [];

  return val;
};

const useSubscribers = (contractAddress) => {
  const subscribers = useContract("getSubscribers", contractAddress);

  return subscribers?.map((element, index) => ({
    id: index,
    address: formatAddress(element),
  }));
};

export { useContract, useSubscribers };
