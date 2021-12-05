import { formatEther } from "@ethersproject/units";
import { useState } from "react";

const useSubscribers = (contract) => {
  const [state, setState] = useState([]);

  const getSubscribers = async () => {
    const responsve = await contract.getSubscribers();

    const orderSubscribers = await Promise.all(
      responsve.map(async (subscriber) => await contract.getOrderSubscriber(subscriber))
    );

    const data = orderSubscribers?.map((subscriber) => SubscriberModel(subscriber));

    setState(data);
  };

  return [state, getSubscribers];
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
