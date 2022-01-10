const OpenboxModel = (data, i = 0) => {
  return {
    poolId: i,
    nftAddress: data.nftAddress ?? "",
    startId: data.startId ?? "0",
    endId: data.endId ?? "0",
    isSaleToken: data.isSaleToken ?? false,
    tokenAddress: data.tokenAddress ?? "",
    nftBoxAddress: data.nftBoxAddress ?? "",
  };
};

export default OpenboxModel;
