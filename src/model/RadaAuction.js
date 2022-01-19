import { fromUnixTime, formatEther } from "utils/format";
import { formatUnits } from "@ethersproject/units";

const RadaAuction = (data, i = 0) => {
  return {
    poolId: i,
    addressItem: data.addressItem ?? "",
    totalItems: data.totalItems ? formatUnits(data.totalItems, 0) : "0",
    startTime: data.startTime ? fromUnixTime(data.startTime) : "",
    endTime: data.endTime ? fromUnixTime(data.endTime) : "",
    startPrice: data.startPrice ? formatEther(data.startPrice) : "0",
    isPublic: data.isPublic ?? false,
    ended: data.ended ?? false,
    requireWhitelist: data.requireWhitelist ?? false,
    maxBuyPerAddress: data.maxBuyPerAddress ? formatUnits(data.maxBuyPerAddress, 0) : "0",
    maxBuyPerOrder: data.maxBuyPerOrder ? formatUnits(data.maxBuyPerOrder, 0) : "0",
  };
};

export default RadaAuction;
