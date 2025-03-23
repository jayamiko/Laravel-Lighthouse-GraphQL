import { LoginRequest } from "@/types/AuthType";
import { fetchGraphQL } from "../graphql";

const loginQuery = `
    mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export async function login(req: LoginRequest) {
  const res = await fetchGraphQL({
    query: loginQuery,
    variables: {
      email: req.email,
      password: req.password,
    },
  });
  console.log("res: ", res);
  return res;
}
