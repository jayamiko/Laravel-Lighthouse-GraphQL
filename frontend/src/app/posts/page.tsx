import PostsPage from "@/containers/posts/posts-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Website - Posts",
  openGraph: {
    title: "Blog Website - Posts Page",
  },
};

export default async function Page() {
  //   const postData = await getPost({
  //     variables: {
  //       filters: {
  //         category: {
  //           containsi: "blog",
  //         },
  //         and: [AND_PUBLISH_FILTER],
  //       },
  //       sort: "createdAt:desc",
  //     },
  //   });

  //   const data = {
  //     posts: postData?.posts?.data,
  //   };
  return <PostsPage data={[]} />;
}
