import RegisterPage from "@/containers/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Website - Register",
  openGraph: {
    title: "Blog Website - Register Page",
  },
};

export default async function Page() {
  return <RegisterPage />;
}
