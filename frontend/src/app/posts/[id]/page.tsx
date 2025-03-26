import PostDetailPage from "@/containers/posts/posts-detail-page";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  return <PostDetailPage id={params?.id} />;
}
