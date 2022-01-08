import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useRadaAuction } from "providers/RadaAuction";
import RadaAuctionOverview from "./Overview";
import RadaAuctionImport from "./Import";
import RadaAuctionSettings from "./Settings";

const RadaAuctionDetail = () => {
  const { isOwner, pool } = useRadaAuction();
  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("RadaAuctionDetail", pool);

  if (!pool) {
    return "";
  }

  return (
    <Box sx={{ width: "100%", typography: "body" }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Detail" value="1" />
            {isOwner && <Tab label="Import Whitelist" value="2" />}
          </TabList>
        </Box>
        <TabPanel value="1">
          <RadaAuctionOverview />
        </TabPanel>
        {isOwner && (
          <TabPanel value="2">
            <RadaAuctionImport />
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
};

export default RadaAuctionDetail;
