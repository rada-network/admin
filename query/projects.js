import { gql } from "@apollo/client";
import client from "./client";

const getProjects = async () => {
  try {
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
            swap_contract
            content {
              title
            }
          }
        }
      `,
    });

    return data.projectFeed;
  } catch (error) {
    return null;
  }
};

const getProjectsBySlug = async (slug) => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          projectBySlug(lang: "en", slug: "${slug}") {
            id
            type
            status
            content {
              title
            }
            swap_contract
            is_whitelist
            token {
              name
              contract_address
            }
          }
        }
      `,
    });

    console.log("getProjectsBySlug - data", data);

    return data.projectBySlug;
  } catch (error) {
    console.log("getProjectsBySlug - error", error);
    return null;
  }
};

export { getProjects, getProjectsBySlug };
