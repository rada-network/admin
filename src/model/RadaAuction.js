import { fromUnixTime } from "utils/format";
import { formatUnits } from "@ethersproject/units";

const RadaAuctionModel = (data, i = 0) => {
  const addressPayableDecimals = localStorage.getItem("addressPayableDecimals");
  const tokenPriceDecimals = localStorage.getItem("tokenPriceDecimals");

  return {
    poolId: i,
    addressItem: data.addressItem ?? "",
    addressPayable: data.addressPayable ?? "",
    totalItems: data.totalItems ? formatUnits(data.totalItems, 0) : "0",
    startTime: data.startTime ? fromUnixTime(data.startTime) : "",
    endTime: data.endTime ? fromUnixTime(data.endTime) : "",
    startPrice: data.startPrice ? formatUnits(data.startPrice, addressPayableDecimals) : "0",
    isPublic: data.isPublic ? data.isPublic : data.published ? data.published : false,
    ended: data.ended ?? false,
    requireWhitelist: data.requireWhitelist ?? false,
    whitelistIds: data.whitelistIds ?? [],
    maxBuyPerAddress: data.maxBuyPerAddress ? formatUnits(data.maxBuyPerAddress, 0) : "0",
    maxBuyPerOrder: data.maxBuyPerOrder ? formatUnits(data.maxBuyPerOrder, 0) : "0",

    tokenAddress: data.tokenAddress ?? "",
    tokenPrice: data.tokenPrice ? formatUnits(data.tokenPrice, tokenPriceDecimals) : "0",
    tokenAllocationBusd: data.tokenAllocationBusd
      ? formatUnits(data.tokenAllocationBusd, addressPayableDecimals)
      : "0",
    startId: data.startId ?? "0",
    endId: data.endId ?? "0",
    nftAddress: data.nftAddress ?? "",

    title: data.title ?? "",
    rarity: data.rarity ? data.rarity.map((el) => formatUnits(el, 0)) : "",
    rarityIds: data.rarityIds ? data.rarityIds.map((el) => formatUnits(el, 0)) : "",
  };
};

export default RadaAuctionModel;
