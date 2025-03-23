import LoginPage from "@/containers/login";
import { login } from "@/libs/api/authCollection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Website - Login",
  openGraph: {
    title: "Blog Website - Login Page",
  },
};

export default async function Page() {
  return <LoginPage />;
}
