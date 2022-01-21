import { ChainId } from "@usedapp/core";

const polygon = [ChainId.Polygon, ChainId.Mumbai];
const bsc = [ChainId.BSC, ChainId.BSCTestnet];

const getChainId = () => {
  return process.env.REACT_APP_MAINNET === "true" ? 0 : 1;
};

const supportedChains = () => {
  return [polygon[getChainId()], bsc[getChainId()]];
};

const isPolygon = (chainId) => polygon.includes(chainId);
const isBsc = (chainId) => bsc.includes(chainId);

const hexChainId = (chainId) => {
  console.log("isPolygon", isPolygon(chainId));
  if (isPolygon(chainId)) {
    return `0x${Number(bsc[getChainId()]).toString(16)}`;
  } else {
    return `0x${Number(polygon[getChainId()]).toString(16)}`;
  }
};

export { supportedChains, isPolygon, isBsc, hexChainId };
