import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useRada } from "providers/Rada";
import RadaOverview from "./Overview";
import RadaImport from "./Import";
import RadaStats from "./Stat";
import RadaOpenbox from "./OpenBox";
import RadaBids from "./Bids";
import { useParams } from "react-router-dom";
import UpdateSalePool from "./UpdateSalePool";

const RadaDetail = () => {
  const { pool, contractType } = useRada();
  const [tab, setTab] = useState("1");
  const { id } = useParams();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("RadaDetail", pool);

  if (id && !pool) {
    return "Loading...";
  }

  if (pool.startPrice === 0) {
    return "";
  }

  return (
    pool && (
      <Box sx={{ width: "100%", typography: "body" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Detail" value="1" />
              <Tab label="Investors" value="3" />
              <Tab label="Statistics" value="4" />
              {pool.requireWhitelist && <Tab label="Import Whitelist" value="5" />}
              {(contractType === "nftFixedSwap" || contractType === "nftAuction") && (
                <Tab label="Sale Token" value="6" />
              )}
            </TabList>
          </Box>
          <TabPanel value="1">
            <RadaOverview />
          </TabPanel>
          <TabPanel value="2">
            <RadaOpenbox />
          </TabPanel>
          <TabPanel value="3">
            <RadaBids />
          </TabPanel>
          <TabPanel value="4">
            <RadaStats />
          </TabPanel>
          <TabPanel value="5">
            <RadaImport />
          </TabPanel>
          <TabPanel value="6">
            <UpdateSalePool />
          </TabPanel>
        </TabContext>
      </Box>
    )
  );
};

export default RadaDetail;
