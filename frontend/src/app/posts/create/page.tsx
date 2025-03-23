import PostsCreatePage from "@/containers/posts/posts-create-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Website - Posts Create",
  openGraph: {
    title: "Blog Website - Posts Create Page",
  },
};

export default async function Page() {
  return <PostsCreatePage />;
}
