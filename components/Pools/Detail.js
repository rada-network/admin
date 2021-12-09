import Title from "@components/Title";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { usePool } from "providers/Pool";
import { useState } from "react";
import PoolInvestors from "./Investors";

const PoolDetail = () => {
  const data = usePool();
  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("PoolDetail", data);

  return (
    <Box sx={{ width: "100%", typography: "body" }}>
      <Title>Pool idx: {data.pool.id}</Title>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Investors" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PoolInvestors />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PoolDetail;
