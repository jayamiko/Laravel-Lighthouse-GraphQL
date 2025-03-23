import { getEnvironment } from "./getEnv";
import Cookies from "js-cookie";

interface GraphqlProps {
  query: string;
  variables?: any;
}

export async function fetchGraphQL({ query, variables }: GraphqlProps) {
  const env = await getEnvironment();

  await fetch(`${env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });

  const token =
    typeof window !== "undefined" && window.localStorage.getItem("token");

  const csrfToken = Cookies.get("XSRF-TOKEN");

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
        // Authorization: `Bearer 40|TYCjrHTzleHiCsI7QJMZD6k9K03avNe7Gi7JjGKgeef3ce96`,
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
