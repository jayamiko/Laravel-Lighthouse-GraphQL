import { getEnvironment } from "./getEnv";
import Cookies from "js-cookie";

interface GraphqlProps {
  query: string;
  variables?: any;
  token?: string;
}

export async function fetchGraphQL({ query, variables }: GraphqlProps) {
  const env = await getEnvironment();

  await fetch(`${env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });

  const csrfToken = Cookies.get("XSRF-TOKEN");

  const token = "26|boJev5T1DBRO0wOBSP4enkFcKjwsvpbx4hltjiDT682717e2";

  try {
    const url = `${env.NEXT_PUBLIC_API_URL}/graphql`;
    const res = await fetch(url, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken || "",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      credentials: "include",
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();
    if (json?.errors && json.errors.length > 0) {
      const errorMessage = json.errors[0].message;
      return { success: false, data: null, message: errorMessage };
    }

    return { success: true, data: json.data, message: null };
  } catch (error) {
    console.error(error);
    return { success: false, data: null, message: error };
  }
}
