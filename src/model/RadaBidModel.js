import { formatEther, formatUnits } from "@ethersproject/units";

const RadaBidModel = (data, poolId, id) => {
  console.log("RadaStatsModel", data);
  return {
    id: id ?? "0",
    poolId: poolId ?? "0",
    creator: data.creator ?? "",
    priceEach: data.priceEach ? formatEther(data.priceEach) : "0",
    quantity: data.quantity ? formatUnits(data.quantity, 0) : "0",
    winQuantity: data.winQuantity ? formatUnits(data.winQuantity, 0) : "0",
    claimed: data.claimed ?? false,
  };
};

export default RadaBidModel;
