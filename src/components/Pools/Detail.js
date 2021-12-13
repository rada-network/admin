import Title from "components/Title";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { usePool } from "providers/Pool";
import { useState } from "react";
import PoolInvestors from "./Investors";
import PoolOverview from "./Overview";

const PoolDetail = () => {
  const data = usePool();
  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("PoolDetail", data);

  return (
    <Box sx={{ width: "100%", typography: "body" }}>
      <Title>Pool : {data.pool.title}</Title>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Overview" value="1" />
            <Tab label={data.contractType === "poolRIR" ? "Winners" : "Investors"} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PoolOverview />
        </TabPanel>
        <TabPanel value="2">
          <PoolInvestors />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PoolDetail;
