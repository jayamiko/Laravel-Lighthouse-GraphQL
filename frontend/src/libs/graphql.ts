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

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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

      if (typeof window !== "undefined") {
        alert(errorMessage);

        if (errorMessage === "Unauthenticated.") {
          window.location.replace("/login");
        }
      }
    }

    return json.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
