import { fromUnixTime, formatEther } from "utils/format";

const RadaAuctionStats = (data) => {
  console.log("RadaStatsModel", data);
  return {
    totalBid: data.totalBid ?? "0",
    totalBidItem: data.totalBidItem ? formatEther(data.totalBidItem) : "0",
    totalBidAmount: data.totalBidAmount ?? "0",
    totalSold: data.totalSold ? formatEther(data.totalSold) : "0",
    totalSoldAmount: data.totalSoldAmount ? formatEther(data.totalSoldAmount) : "0",
    highestPrice: data.highestPrice ? formatEther(data.highestPrice) : "0",
  };
};

export default RadaAuctionStats;
