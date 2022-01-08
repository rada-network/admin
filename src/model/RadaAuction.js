import { fromUnixTime, formatEther } from "utils/format";

const RadaAuctionModel = (data, i = 0) => {
  return {
    poolId: i,
    addressItem: data.addressItem ?? "",
    isSaleToken: data.isSaleToken ?? false,
    startId: data.startId ?? "0",
    endId: data.endId ?? "0",
    startTime: data.startTime ? fromUnixTime(data.startTime) : Date.now(),
    endTime: data.endTime ? fromUnixTime(data.endTime) : Date.now(),
    startPrice: data.startPrice ? formatEther(data.startPrice) : "0",
    isPublic: data.isPublic ?? false,
    ended: data.ended ?? false,
    requireWhitelist: data.requireWhitelist ?? false,
    maxBuyPerAddress: data.maxBuyPerAddress ?? "0",
  };
};

export default RadaAuctionModel;
