import { fetchGraphQL } from "../graphql";

interface PostProps {
  variables?: any;
}

export const query = `
    query {
      posts {
        id
        title
        content
        id_user
      }
    }
`;

export async function getPost(params?: PostProps) {
  const res = await fetchGraphQL({
    query: query,
    variables: params?.variables,
  });
  return res;
}
