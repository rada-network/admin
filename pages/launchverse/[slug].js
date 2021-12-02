import Address from "@components/Address";
import Table from "@components/Table";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getProjectsBySlug } from "@query/projects";
import { useSubscribers } from "hooks/useContract";

export default function LaunchverseDetail(props) {
  if (!props.data) {
    return null;
  }

  const columns = [
    {
      field: "address",
      headerName: "Address",
      width: 250,
    },
  ];
  const subscribers = useSubscribers(props.data.swap_contract);

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
      <Typography variant="h5" component="div">
        Contact: {props.data.swap_contract}
      </Typography>
      <Table rows={subscribers} columns={columns} pageSize={20} />;
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
