import { useGlobal } from "providers/Global";
import { useEffect, useState } from "react";
import useABI from "./useABI";

const useWhitelistHook = () => {
  const { contractInstance } = useABI("whitelist");
  const global = useGlobal();
  const [whitelistIds, setWhitelistIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      global.setLoading(true);
      const list = await contractInstance.connect(global.account).getList();

      const newWhitelistIds = await Promise.all(
        list.map(async (item) => {
          try {
            const title = await contractInstance.listTitle(item);

            return {
              value: item,
              label: title,
            };
          } catch (error) {
            return null;
          }
        })
      );

      setWhitelistIds(newWhitelistIds);

      global.setLoading(false);
    };
    fetchData();
  }, []);

  return whitelistIds;
};

export default useWhitelistHook;
