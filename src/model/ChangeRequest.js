import { formatEther } from "@ethersproject/units";
import { fromUnixTime } from "utils/format";

const ChangeRequestModel = (data) => {
  let tokenAddress = "";

  if (data.tokenAddress && data.tokenAddress !== "0x0000000000000000000000000000000000000000") {
    tokenAddress = data.tokenAddress;
  }

  return {
    tokenAddress: tokenAddress ?? "",
    allocationBusd: data.poolAllocationBusd ? formatEther(data.poolAllocationBusd) : "",
    endDate: data.poolEndDate ? fromUnixTime(formatEther(data.poolEndDate)) : "",
  };
};

export default ChangeRequestModel;
