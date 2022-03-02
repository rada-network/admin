import RadaBidModel from "model/RadaBidModel";
import indexDbService from "./indexDbService";

const createIndexDB = async () => {
  await indexDbService.openDB("radabids", 1, {
    async upgrade(db, oldVersion, newVersion, transaction) {
      indexDbService.createObjectStore(db, transaction, "bids", "id");
    },
  });
};

const getBids = async (contractInstance, poolId, start = 0, limit = 10, total) => {
  try {
    const promises = [];
    for (let i = start; i < start + limit; i++) {
      promises.push(i);
    }

    const newBids = await Promise.all(
      promises.map(async (i) => {
        const responseBid = await contractInstance.bids(poolId, i);

        return RadaBidModel(responseBid, poolId, i);
      })
    );

    console.log("responseBid", newBids);

    await indexDbService.add("bids", newBids);

    if (total > start + limit) {
      start = start + limit;
      await getBids(contractInstance, poolId, start, limit, total);
    }
  } catch (error) {}
};

const getWinners = async (pool) => {
  const totalBox = parseInt(pool.endId) - parseInt(pool.startId) + 1;
  const indexedBids = await indexDbService.getAll("bids");

  indexedBids.sort((a, b) => (a.priceEach < b.priceEach ? 1 : b.priceEach < a.priceEach ? -1 : 0));

  const winners = [];
  let boxWin = 0;

  indexedBids.forEach((bid) => {
    if (boxWin < totalBox) {
      winners.push(bid);
    }

    boxWin += parseInt(bid.quantity);
  });

  return winners;
};

export { createIndexDB, getBids, getWinners };
