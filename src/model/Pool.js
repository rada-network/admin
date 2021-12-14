import { formatEther } from "@ethersproject/units";
import { formatAddress, fromUnixTime } from "utils/format";

const PoolModel = (data, i) => {
  let tokenAddress = "";

  if (data.tokenAddress) {
    tokenAddress = data.tokenAddress;
  }

  return {
    id: i ?? "",
    title: data.title ?? "",
    address: tokenAddress ? formatAddress(data.tokenAddress) : "",
    tokenAddress: tokenAddress ?? "",
    allocationBusd: data.allocationBusd ? formatEther(data.allocationBusd) : "0",
    minAllocationBusd: data.minAllocationBusd ? formatEther(data.minAllocationBusd) : "0",
    maxAllocationBusd: data.maxAllocationBusd ? formatEther(data.maxAllocationBusd) : "0",
    allocationRir: data.allocationRir ? formatEther(data.allocationRir) : "0",
    price: data.price ? formatEther(data.price) : "0",
    startDate: data.startDate ? fromUnixTime(data.startDate) : Date.now(),
    endDate: data.endDate ? fromUnixTime(data.endDate) : Date.now(),
    locked: data.locked ? data.locked : false,
    depositAmount: data.depositAmount ? formatEther(data.depositAmount) : "0",
    fee: data.fee ? formatEther(data.fee) : "0",
  };
};

export default PoolModel;
