import { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";
import { useGlobal } from "providers/Global";
import { useParams } from "react-router-dom";

const useDataCalls = (calls) => {
  const { library } = useEthers();
  const global = useGlobal();
  const { type, id } = useParams();

  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const r = await Promise.all(
        calls.map(async (call) => {
          const contractInstance = new Contract(call.address, call.abi, library);

          try {
            return [
              await contractInstance
                .connect(call.sender)
                [call.method](call.args ? call.args.join(",") : null),
            ];
          } catch (error) {
            console.log("useDataCalls error", error);
            return [undefined];
          }
        })
      );

      if (r) {
        console.log("useDataCalls", r);
        setResult(r);
      }
    };
    fetchData();
  }, [JSON.stringify(calls), global, type, id]); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
};

export default useDataCalls;
