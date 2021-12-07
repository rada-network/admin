import { formatEther } from "@ethersproject/units";
import { useState, useCallback } from "react";

const useSubscribers = (contract) => {
  const [state, setState] = useState([]);

  const getSubscribers = useCallback(async () => {
    const response = await contract.getSubscribers();

    const orderSubscribers = await Promise.all(
      response.map(async (subscriber) => await contract.getOrderSubscriber(subscriber))
    );

    // Get Winners
    const responseWinners = await contract.getWinners();
    console.log("rgetWinners", responseWinners);

    const data = orderSubscribers?.map((subscriber) => {
      const subscriberModel = SubscriberModel(subscriber);

      if (responseWinners.includes(subscriberModel.address)) {
        subscriberModel.isWinner = true;
      }

      return subscriberModel;
    });

    setState(data);
  }, []);

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
  isWinner: false,
});

export { useSubscribers, SubscriberModel };
