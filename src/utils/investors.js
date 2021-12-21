import InvestorModel from "model/Investor";
import indexDbService from "./indexDbService";

const createIndexDB = async () => {
  await indexDbService.openDB("rada", 1, {
    async upgrade(db, oldVersion, newVersion, transaction) {
      indexDbService.createObjectStore(db, transaction, "investors", "id");
    },
  });
};

const getInvestor = async (contractInstance, id, start = 0, limit = 10) => {
  const response = await contractInstance.getAddresses(id, start, limit);

  const newInvestors = await Promise.all(
    response.map(async (investor) => {
      const responseInvestor = await contractInstance.getInvestor(id, investor);
      return InvestorModel(responseInvestor, investor);
    })
  );

  await indexDbService.add("investors", newInvestors);

  if (response.length === limit) {
    start = start + limit;

    await getInvestor(contractInstance, id, start, limit);
  }
};

export { createIndexDB, getInvestor };
