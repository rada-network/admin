import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useRada } from "providers/Rada";
import RadaOverview from "./Overview";
import RadaImport from "./Import";
import RadaStats from "./Stat";
import RadaOpenbox from "./OpenBox";

const RadaDetail = () => {
  const { isOwner, pool } = useRada();
  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("RadaDetail", pool);

  return (
    pool && (
      <Box sx={{ width: "100%", typography: "body" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Detail" value="1" />
              <Tab label="Statistics" value="2" />
              <Tab label="OpenBox Contract" value="3" />
              {isOwner && pool.requireWhitelist && <Tab label="Import Whitelist" value="4" />}
            </TabList>
          </Box>
          <TabPanel value="1">
            <RadaOverview />
          </TabPanel>
          <TabPanel value="2">
            <RadaStats />
          </TabPanel>
          <TabPanel value="3">
            <RadaOpenbox />
          </TabPanel>
          {isOwner && (
            <TabPanel value="4">
              <RadaImport />
            </TabPanel>
          )}
        </TabContext>
      </Box>
    )
  );
};

export default RadaDetail;
