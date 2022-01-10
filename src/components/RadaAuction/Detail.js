import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useRadaAuction } from "providers/RadaAuction";
import RadaAuctionOverview from "./Overview";
import RadaAuctionImport from "./Import";
import RadaAuctionStats from "./Stat";

const RadaAuctionDetail = () => {
  const { isOwner, pool } = useRadaAuction();
  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("RadaAuctionDetail", pool);

  return (
    pool && (
      <Box sx={{ width: "100%", typography: "body" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Detail" value="1" />
              <Tab label="Statistics" value="2" />
              {isOwner && pool.requireWhitelist && <Tab label="Import Whitelist" value="3" />}
            </TabList>
          </Box>
          <TabPanel value="1">
            <RadaAuctionOverview />
          </TabPanel>
          <TabPanel value="2">
            <RadaAuctionStats />
          </TabPanel>
          {isOwner && (
            <TabPanel value="3">
              <RadaAuctionImport />
            </TabPanel>
          )}
        </TabContext>
      </Box>
    )
  );
};

export default RadaAuctionDetail;
