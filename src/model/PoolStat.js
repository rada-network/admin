import { formatEther } from "@ethersproject/units";

const PoolStatModel = (data) => {
  console.log("PoolStatModel", data);
  return {
    depositedToken: data.depositedToken ? formatEther(data.depositedToken) : 0,
    amountBusd: data.amountBusd ? formatEther(data.amountBusd) : 0,
    amountRir: data.amountRir ? formatEther(data.amountRir) : 0,
    approvedBusd: data.approvedBusd ? formatEther(data.approvedBusd) : 0,
    approvedRir: data.approvedRir ? formatEther(data.approvedRir) : 0,
  };
};

export default PoolStatModel;
