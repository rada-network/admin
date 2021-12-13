import { formatEther } from "@ethersproject/units";
import { formatAddress } from "utils/format";

const InvestorModel = (data, address) => {
  return {
    id: address,
    address: address ? formatAddress(address) : "",
    allocationBusd: data.allocationBusd ? formatEther(data.allocationBusd) : 0,
    amountBusd: data.amountBusd ? formatEther(data.amountBusd) : 0,
    allocationRirs: data.allocationRirs ? formatEther(data.allocationRirs) : 0,
    claimedToken: data.claimedToken ? formatEther(data.claimedToken) : 0,
    approved: data.approved ?? false,
    refunded: data.refunded ?? false,
    paid: data.paid ?? false,
  };
};

export default InvestorModel;
