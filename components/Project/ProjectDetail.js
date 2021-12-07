import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Overview from "@components/Project/Overview";
import ProjectTitle from "@components/Project/ProjectTitle";
import { useProject } from "@hooks/useProject";
import dynamic from "next/dynamic";
import { useAuth } from "@hooks/useAuth";

const Whitelist = dynamic(() => import("@components/Project/Whitelist"));
const Prefunded = dynamic(() => import("@components/Project/Prefunded"));
const Token = dynamic(() => import("@components/Project/Token"));

const ProjectDetail = () => {
  const auth = useAuth();
  const projectData = useProject();

  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("Launchverse ProjectDetail Render...", projectData);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <ProjectTitle />
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Overview" value="1" />
            {projectData.isWhitelist && <Tab label="Whitelist" value="2" />}
            <Tab label="Prefunded" value="4" />
            <Tab label="Token" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Overview />
        </TabPanel>
        {projectData.isWhitelist && (
          <TabPanel value="2">
            <Whitelist />
          </TabPanel>
        )}
        <TabPanel value="4">
          <Prefunded />
        </TabPanel>
        <TabPanel value="5">
          <Token />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProjectDetail;
