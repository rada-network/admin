import Title from "components/Title";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Stack, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { usePool } from "providers/Pool";
import { useState } from "react";
import PoolInvestors from "./Investors";
import PoolOverview from "./Overview";
import LockPool from "./Lock";
import PoolChangeRequest from "./ChangeRequest";
import PoolToken from "./Token";

import PoolStat from "./Stat";
import PoolImport from "./Import";

const PoolDetail = () => {
  const { pool, isAdmin } = usePool();
  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("PoolDetail", pool);

  return (
    <Box sx={{ width: "100%", typography: "body" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ marginBottom: "1rem" }}
      >
        <Title>Pool : {pool.title}</Title>
        <LockPool />
      </Stack>

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Overview" value="1" />
            <Tab label="Reqest changes" value="2" />
            <Tab label="Investors" value="3" />
            <Tab label="Deposit" value="4" />
            <Tab label="Statistics" value="5" />
            {isAdmin && <Tab label="Import Winner" value="6" />}
          </TabList>
        </Box>
        <TabPanel value="1">
          <PoolOverview />
        </TabPanel>
        <TabPanel value="2">
          <PoolChangeRequest />
        </TabPanel>
        <TabPanel value="3">
          <PoolInvestors />
        </TabPanel>
        <TabPanel value="4">
          <PoolToken />
        </TabPanel>
        <TabPanel value="5">
          <PoolStat />
        </TabPanel>
        <TabPanel value="6">
          <PoolImport />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PoolDetail;
