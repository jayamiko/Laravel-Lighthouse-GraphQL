import { PostRequest } from "@/types/PostType";
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
  try {
    const res = await fetchGraphQL({
      query: query,
      variables: {},
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

const createPostQuery = `
    mutation ($title: String!, $content: String!) {
        createPost(title: $title, content: $content)
    }
`;

export async function createPost(req: PostRequest) {
  try {
    const res = await fetchGraphQL({
      query: createPostQuery,
      variables: {
        title: req.title,
        content: req.content,
      },
    });

    return { success: true, message: res?.data?.posts };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

const updatePostQuery = `
    mutation ($id: ID!, $title: String!, $content: String!) {
        updatePost(id: $id, title: $title, content: $content)
    }
`;

export async function updatePost(id: string, req: PostRequest) {
  try {
    const res = await fetchGraphQL({
      query: updatePostQuery,
      variables: {
        id,
        title: req.title,
        content: req.content,
      },
    });

    console.log("RES: ", res);

    return { success: true, message: res?.data?.updatePost };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
