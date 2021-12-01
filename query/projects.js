import { gql } from "@apollo/client";
import client from "./client";

const getProjects = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        projectFeed(lang: "en") {
          id
          slug
          open_date
          end_date
          type
          status
          content {
            title
          }
        }
      }
    `,
  });

  return data.projectFeed;
};

export { getProjects };
