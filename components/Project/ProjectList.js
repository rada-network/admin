import Title from "@components/Title";
import { useProjects } from "@hooks/useProject";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { formatDate } from "utils/format";

const Table = dynamic(() => import("@components/Table"));

const ProjectList = () => {
  const projects = useProjects();

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

  console.log("Launchverse ProjectList Render...", projects);

  return (
    <>
      <Title>Projects</Title>
      <Table rows={projects} columns={columns} onCellClick={onClick} />
    </>
  );
};

export default ProjectList;
