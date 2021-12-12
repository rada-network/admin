import { formatEther } from "@ethersproject/units";
import { formatAddress, fromUnixTime } from "utils/format";

const PoolModel = (data, i) => {
  return {
    id: i,
    title: data.title ?? "",
    address: formatAddress(data.tokenAddress) ?? "",
    fullAddress: data.tokenAddress ?? "",
    price: data.price ? formatEther(data.price) : 0,
    allocationBusd: data.allocationBusd ? formatEther(data.allocationBusd) : 0,
    depositedToken: data.depositedToken ? formatEther(data.depositedToken) : 0,
    startDate: fromUnixTime(formatEther(data.startDate)),
    endDate: fromUnixTime(formatEther(data.endDate)),
    locked: data.locked,
  };
};

export default PoolModel;
