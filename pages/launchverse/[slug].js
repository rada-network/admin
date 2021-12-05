import Title from "@components/Title";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { getProjectsBySlug } from "@query/projects";
import { ProvideProject } from "@hooks/useProject";
import { useState } from "react";
import Detail from "@components/Project/Detail";
import Whitelist from "@components/Project/Whitelist";
import Winner from "@components/Project/Winner";
import Prefunded from "@components/Project/Prefunded";
import ProjectTitle from "@components/Project/ProjectTitle";
import Token from "@components/Project/Token";

export default function LaunchverseDetail(props) {
  if (!props.data) {
    return null;
  }

  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("LaunchverseDetail render");

  return (
    <ProvideProject projectData={props.data}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <ProjectTitle />
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Detail" value="1" />
              <Tab label="Whitelist" value="2" />
              <Tab label="Prefunded" value="3" />
              <Tab label="Winner" value="4" />
              <Tab label="Token" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Detail />
          </TabPanel>
          <TabPanel value="2">
            <Whitelist />
          </TabPanel>

          <TabPanel value="3">
            <Prefunded />
          </TabPanel>
          <TabPanel value="4">
            <Winner />
          </TabPanel>

          <TabPanel value="5">
            <Token />
          </TabPanel>
        </TabContext>
      </Box>
    </ProvideProject>
  );
}

export async function getServerSideProps({ params }) {
  if (params?.slug) {
    const data = await getProjectsBySlug(params?.slug);

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { data },
    };
  }
}
