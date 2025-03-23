import { LoginRequest, RegisterRequest } from "@/types/AuthType";
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

    return { success: true, data: res.data.me, message: res.message };
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

    if (!res.success) {
      return { success: false, message: res.message };
    }

    const token = res?.data?.login?.token;

    if (token) {
      const expiry = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours
      localStorage.setItem("token", token);
      localStorage.setItem("token_expiry", expiry.toString());
      window.location.href = "/posts";
      return { success: true, message: "Login succesfully" };
    }
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

const registerQuery = `
    mutation ($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password)
    }
`;

export async function register(req: RegisterRequest) {
  try {
    const res = await fetchGraphQL({
      query: registerQuery,
      variables: {
        name: req.name,
        email: req.email,
        password: req.password,
      },
    });

    return { success: true, message: res?.data?.register };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
