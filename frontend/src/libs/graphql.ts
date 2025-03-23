import { getEnvironment } from "./getEnv";

interface GraphqlProps {
  query: string;
  variables: any;
}

export async function fetchGraphQL({ query, variables }: GraphqlProps) {
  const env = await getEnvironment();

  try {
    const url = `${env.NEXT_PUBLIC_API_URL}/graphql`;
    const res = await fetch(url, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    return json.data;
  } catch (error) {
    console.error(error);
  }
}
