import { ProvidePoolSettings, usePoolSettings } from "providers/PoolSettings";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Stack, Tab } from "@mui/material";
import { Box } from "@mui/system";
import Title from "components/Title";

import { useState } from "react";

import PoolSetAdmin from "./SetAdmin";
import PoolSettings from "./Settings";

const PoolSettingsPage = () => {
  const [tab, setTab] = useState("1");

  const { contractName, isOwner } = usePoolSettings();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ marginBottom: "1rem" }}
      >
        <Title>{contractName}</Title>
      </Stack>

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Settings" value="1" />
            {isOwner && <Tab label="Set Admin and Approver" value="2" />}
          </TabList>
        </Box>
        <ProvidePoolSettings>
          <TabPanel value="1">
            <PoolSettings />
          </TabPanel>
          {isOwner && (
            <TabPanel value="2">
              <PoolSetAdmin />
            </TabPanel>
          )}
        </ProvidePoolSettings>
      </TabContext>
    </Box>
  );
};

export default PoolSettingsPage;
