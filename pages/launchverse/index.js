import { getProjects } from "@query/projects";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";

export default function Launchverse(props) {
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
      width: 200,
    },
    {
      field: "end_date",
      headerName: "End date",
      width: 200,
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

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid rows={props.data} columns={columns} pageSize={20} onCellClick={onClick} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await getProjects();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
