import { fromUnixTime, formatEther } from "utils/format";

const RadaAuction = (data, i = 0) => {
  return {
    poolId: i,
    title: data.title ?? "",
    addressItem: data.addressItem ?? "",
    isSaleToken: data.isSaleToken ?? false,
    startId: data.startId ?? "0",
    endId: data.endId ?? "0",
    startTime: data.startTime ? fromUnixTime(data.startTime) : "",
    endTime: data.endTime ? fromUnixTime(data.endTime) : "",
    startPrice: data.startPrice ? formatEther(data.startPrice) : "0",
    isPublic: data.isPublic ?? false,
    ended: data.ended ?? false,
    requireWhitelist: data.requireWhitelist ?? false,
    maxBuyPerAddress: data.maxBuyPerAddress ?? "0",
  };
};

export default RadaAuction;
