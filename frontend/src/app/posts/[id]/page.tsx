import PostDetailPage from "@/containers/posts/posts-detail-page";
import { getPostById } from "@/libs/api/PostCollections";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const response = await getPostById({ id: params.id });

  const data = response?.post;

  return <PostDetailPage data={data} />;
}
