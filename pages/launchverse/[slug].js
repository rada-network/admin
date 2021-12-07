import { getProjectsBySlug } from "@query/projects";
import { ProvideProject } from "@hooks/useProject";

import ProjectDetail from "@components/Project/ProjectDetail";

export default function LaunchverseDetail(props) {
  if (!props.data) {
    return null;
  }

  return (
    <ProvideProject projectData={props.data}>
      <ProjectDetail />
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
