import { formatEther } from "@ethersproject/units";
import { formatAddress } from "utils/format";

const InvestorModel = (data, address) => {
  return {
    id: address,
    address: address ? formatAddress(address) : "",
    amountBusd: data.amountBusd ? formatEther(data.amountBusd) : "0",
    amountRir: data.amountRir ? formatEther(data.amountRir) : "0",
    allocationBusd: data.allocationBusd ? formatEther(data.allocationBusd) : "0",
    allocationRir: data.allocationRir ? formatEther(data.allocationRir) : "0",
    claimedToken: data.claimedToken ? formatEther(data.claimedToken) : "0",
    approved: data.approved ?? false,
    refunded: data.refunded ?? false,
    paid: data.paid ?? false,
  };
};

export default InvestorModel;
