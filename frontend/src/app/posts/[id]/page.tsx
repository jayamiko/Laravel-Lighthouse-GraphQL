import PostDetailPage from "@/containers/posts/posts-detail-page";
import { getPost, getPostById } from "@/libs/api/PostCollections";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  console.log("ID: ", params.id);
  const response = await getPostById({ id: params.id });

  console.log("RESPONSE DETAIL: ", response);
  // const newsDetail = postsData.posts.data[0];

  return (
    <PostDetailPage
      data={{
        id: 1,
        title: "Title blog",
      }}
    />
  );
}
