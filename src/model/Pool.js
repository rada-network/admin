import { formatEther } from "@ethersproject/units";
import { formatAddress, fromUnixTime } from "utils/format";

const PoolModel = (data, i) => {
  return {
    id: i,
    title: data.title ?? "",
    address: formatAddress(data.tokenAddress) ?? "",
    tokenAddress: data.tokenAddress ?? "",
    allocationBusd: data.allocationBusd ? formatEther(data.allocationBusd) : 0,
    minAllocationBusd: data.minAllocationBusd ? formatEther(data.minAllocationBusd) : 0,
    maxAllocationBusd: data.maxAllocationBusd ? formatEther(data.maxAllocationBusd) : 0,
    allocationRir: data.allocationRir ? formatEther(data.allocationRir) : 0,
    price: data.price ? formatEther(data.price) : 0,
    startDate: fromUnixTime(formatEther(data.startDate)),
    endDate: fromUnixTime(formatEther(data.endDate)),
    locked: data.locked,
    depositAmount: data.depositAmount ? formatEther(data.depositAmount) : 0,
    fee: data.depositedToken ? formatEther(data.fee) : 0,
  };
};

export default PoolModel;
