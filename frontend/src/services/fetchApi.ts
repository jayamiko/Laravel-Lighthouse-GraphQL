type FetchApiProps = {
  query?: string;
  variables?: Record<string, any>;
  token?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
  isGraphql?: boolean;
};

export async function fetchApi({
  query,
  variables = {},
  token,
  method = "GET",
  url = "http://localhost:8000/graphql",
  isGraphql = true,
}: FetchApiProps) {
  if (isGraphql && !query) {
    throw new Error("GraphQL request must include a 'query'.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const body =
    method === "GET"
      ? undefined
      : JSON.stringify(isGraphql ? { query, variables } : variables);

  const response = await fetch(url, {
    method,
    headers,
    ...(body && { body }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || JSON.stringify(json.errors || json));
  }

  return json.data || json;
}
