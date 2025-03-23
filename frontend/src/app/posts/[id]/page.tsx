import PostDetailPage from "@/containers/posts/posts-detail-page";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const postID = params.id;

  //   const postsData = await getPost({
  //     variables: {
  //       filters: {
  //         slug: {
  //           eq: slug,
  //         },
  //       },
  //     },
  //   });

  //   const newsDetail = postsData.posts.data[0];

  return (
    <PostDetailPage
      data={{
        id: 1,
        title: "Title blog",
      }}
    />
  );
}
