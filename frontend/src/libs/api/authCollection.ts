import { LoginRequest } from "@/types/AuthType";
import { fetchGraphQL } from "../graphql";

const authQuery = `
    query {
        me {
            id
            name
            email
        }
    }
`;

export async function getAuthToken() {
  try {
    const res = await fetchGraphQL({
      query: authQuery,
      variables: {},
    });

    console.log("res: ", res);
    if (res?.error?.message === "Unauthenticated") {
      return { success: false, data: null, message: res.error.message };
    }

    return { success: true, data: res.me };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

const loginQuery = `
    mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
    }
`;

export async function login(req: LoginRequest) {
  try {
    const res = await fetchGraphQL({
      query: loginQuery,
      variables: {
        email: req.email,
        password: req.password,
      },
    });
    const token = res?.login?.token;

    if (token) {
      const expiry = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours
      localStorage.setItem("token", token);
      localStorage.setItem("token_expiry", expiry.toString());
      window.location.href = "/posts";
    }
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
