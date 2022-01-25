import { formatUnits } from "@ethersproject/units";

const RadaBidModel = (data, poolId, id) => {
  console.log("RadaStatsModel", data);

  const addressPayableDecimals = localStorage.getItem("addressPayableDecimals");

  return {
    id: id ?? "0",
    poolId: poolId ?? "0",
    creator: data.creator ?? "",
    priceEach: data.priceEach ? formatUnits(data.priceEach, addressPayableDecimals) : "0",
    quantity: data.quantity ? formatUnits(data.quantity, 0) : "0",
    winQuantity: data.winQuantity ? formatUnits(data.winQuantity, 0) : "0",
    claimed: data.claimed ?? false,
  };
};

export default RadaBidModel;
