import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getProjectsBySlug } from "@query/projects";

export default function LaunchverseDetail(props) {
  console.log("LaunchverseDetail - render", props);
  if (!props.data) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" component="div">
        Project ID: {props.data.id}
      </Typography>
      <Typography variant="h5" component="div">
        Project Name: {props.data.content?.title}
      </Typography>
      <Typography variant="h5" component="div">
        Status: {props.data.status}
      </Typography>
    </Box>
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
