import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import erc20 from "../config/abi/erc20.json";
import { getABI } from "hooks/useABI";
import { useEthers } from "@usedapp/core";
import { useGlobal } from "providers/Global";
import RadaAuctionModel from "model/RadaAuction";
import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";

const useDecimals = (poolId) => {
  const { library, chainId } = useEthers();
  const auth = useGlobal();
  const contracts = ["radaAuction", "radaFixedSwap", "nftAuction", "nftFixedSwap", "nftClaim"];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await Promise.all(
        contracts.map(async (contractType) => {
          const { contractInstance } = getABI(contractType, library, chainId);
          const pool = RadaAuctionModel(
            contractType === "nftClaim"
              ? await contractInstance.connect(auth.account).getPool(poolId)
              : await contractInstance.connect(auth.account).pools(poolId),
            poolId
          );

          if (pool.startPrice > 0) {
            const erc20Instance = new Contract(
              pool.addressPayable,
              new utils.Interface(erc20),
              library
            );

            const decimals = await erc20Instance.decimals();

            localStorage.setItem("addressPayableDecimals", decimals);
          }

          if (pool.tokenPrice > 0) {
            const erc20Instance = new Contract(
              pool.tokenAddress,
              new utils.Interface(erc20),
              library
            );

            const decimals = await erc20Instance.decimals();

            localStorage.setItem("tokenPriceDecimals", decimals);
          }
        })
      );

      setLoading(false);
    }

    if (poolId > 0) {
      fetchData();
    }
  }, [poolId]); // eslint-disable-line react-hooks/exhaustive-deps

  return loading;
};

const getDecimalsByAddress = async (contractAddress) => {
  try {
    const provider = new Web3Provider(window.ethereum);

    const contractInstance = new Contract(contractAddress, new utils.Interface(erc20), provider);

    return await contractInstance.decimals();
  } catch (error) {
    return 18;
  }
};

const getDecimals = async (addressPayable = "", tokenAddress = "") => {
  let addressPayableDecimals = localStorage.getItem("addressPayableDecimals");
  let tokenPriceDecimals = localStorage.getItem("tokenPriceDecimals");

  if (!addressPayableDecimals && addressPayable) {
    addressPayableDecimals = await getDecimalsByAddress(addressPayable);
  }

  if (!tokenPriceDecimals && tokenAddress) {
    tokenPriceDecimals = await getDecimalsByAddress(tokenAddress);
  }

  return {
    addressPayableDecimals,
    tokenPriceDecimals,
  };
};

export { useDecimals as default, getDecimalsByAddress, getDecimals };
