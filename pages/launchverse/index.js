import Title from "@components/Title";
import { getProjects } from "@query/projects";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { formatDate } from "utils/format";

const Table = dynamic(() => import("@components/Table"));

export default function Launchverse(props) {
  if (!props.data) {
    return "";
  }

  const router = useRouter();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "content",
      headerName: "Name",
      width: 200,
      valueGetter: (params) => params.value.title,
    },
    {
      field: "type",
      headerName: "Type",
      width: 130,
    },
    {
      field: "open_date",
      headerName: "Open date",
      width: 250,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "end_date",
      headerName: "End date",
      width: 250,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "status",
      headerName: "status",
      width: 130,
    },
    {
      field: "slug",
      hide: true,
    },
  ];

  const onClick = (params, event) => {
    event.preventDefault();
    router.push(`/launchverse/${params.row.slug}`);
  };

  console.log("Launchverse Render...", props.data);

  return (
    <>
      <Title>Projects</Title>
      <Table rows={props.data} columns={columns} onCellClick={onClick} />
    </>
  );
}

export async function getServerSideProps() {
  const data = await getProjects();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
