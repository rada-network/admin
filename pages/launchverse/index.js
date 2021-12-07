import ProjectList from "@components/Project/ProjectList";
import { ProvideProjects } from "@hooks/useProject";
import { getProjects } from "@query/projects";

export default function Launchverse(props) {
  if (!props.data) {
    return "";
  }

  return (
    <ProvideProjects projects={props.data}>
      <ProjectList />
    </ProvideProjects>
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
