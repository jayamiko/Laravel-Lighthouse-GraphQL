import React from "react";
import PostsPage from "@/containers/posts/posts-page";
import { getPost } from "@/libs/api/PostCollections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Website - Posts",
  openGraph: {
    title: "Blog Website - Posts Page",
  },
};

export default async function Page() {
  return <PostsPage />;
}
