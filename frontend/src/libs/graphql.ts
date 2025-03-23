interface GraphqlProps {
  query: any;
  variables: any;
}

export async function fetchGraphQL({ query, variables }: GraphqlProps) {
  //   const env = await getEnvironment();

  try {
    const url = `http://localhost:8000/graphql`;
    const res = await fetch(url, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
