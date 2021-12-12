import { formatEther } from "@ethersproject/units";
import { formatAddress } from "utils/format";

const InvestorModel = (data, address) => {
  return {
    id: address,
    address: formatAddress(address) ?? 0,
    allocationBusd: formatEther(data.allocationBusd) ?? 0,
    amountBusd: formatEther(data.amountBusd) ?? 0,
    claimedToken: formatEther(data.claimedToken) ?? 0,
    approved: data.approved ?? false,
    paid: data.paid ?? false,
  };
};

export default InvestorModel;
