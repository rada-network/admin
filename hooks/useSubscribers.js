import { useContact } from "./useContract";
import { formatEther } from "@ethersproject/units";

const useSubscribers = (contractAddress) => {
  const contract = useContact(contractAddress);

  const getSubscribers = async () => {
    const responsve = await contract.getSubscribers();

    const orderSubscribers = await Promise.all(
      responsve.map(async (subscriber) => await contract.getOrderSubscriber(subscriber))
    );

    return orderSubscribers?.map((subscriber) => SubscriberModel(subscriber));
  };

  return getSubscribers;
};

const SubscriberModel = (data) => ({
  id: data.referer,
  address: data.referer,
  amountBUSD: formatEther(data.amountBUSD),
  amountRIR: formatEther(data.amountRIR),
  approvedBUSD: formatEther(data.approvedBUSD),
  claimedToken: formatEther(data.claimedToken),
  refundedBUSD: formatEther(data.refundedBUSD),
});

export { useSubscribers, SubscriberModel };
