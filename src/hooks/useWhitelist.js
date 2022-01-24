import { useGlobal } from "providers/Global";
import { useEffect, useState } from "react";

import useABI from "./useABI";

const useWhitelistHook = () => {
  const { contractInstance } = useABI("whitelist");
  const global = useGlobal();
  const [whitelistIds, setWhitelistIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await contractInstance.connect(global.account).getList();

        const newWhitelistIds = await Promise.all(
          list.map(async (item) => {
            const title = await contractInstance.connect(global.account).listTitle(item);

            return {
              value: item,
              label: title,
            };
          })
        );

        setWhitelistIds(newWhitelistIds);
      } catch (error) {
        console.log("useWhitelistHook", error);
      }
    };
    fetchData();
  }, []);

  return whitelistIds;
};

export default useWhitelistHook;
