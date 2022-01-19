import { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";

const useDataCalls = (calls) => {
  const { library } = useEthers();

  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const r = await Promise.all(
        calls.map(async (call) => {
          const contractInstance = new Contract(call.address, call.abi, library);

          return await contractInstance
            .connect(call.sender)
            [call.method](call.args ? call.args.join(",") : null);
        })
      );

      if (r) {
        console.log("useDataCalls", r);
        setResult(r);
      }
    };
    fetchData();
  }, [JSON.stringify(calls)]);

  return result;
};

export default useDataCalls;
