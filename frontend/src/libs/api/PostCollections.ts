import { fetchGraphQL } from "../graphql";

export const query = `
    query {
      posts {
        id
        title
        content
        user {
          name
        }
        created_at
      }
    }
`;

export async function getPost() {
  const res = await fetchGraphQL({
    query: query,
    variables: {},
  });
  return res;
}

interface PostByIdProps {
  id: string;
}

const queryById = `
    query ($id: ID!) {
      post(id: $id) {
        id
        title
        content
        user {
          id
          name
        }
      }
    }
`;

export async function getPostById({ id }: PostByIdProps) {
  const res = await fetchGraphQL({
    query: queryById,
    variables: {
      id: id,
    },
  });
  return res;
}
