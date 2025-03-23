import React from "react";
import { PostData } from "@/types/PostType";
import Link from "next/link";

type Props = {
  data: PostData;
};

export const PostCard: React.FC<Props> = ({ data }: Props) => {
  return (
    <Link href={`/posts/${data.id}`}>
      <div className="cursor-pointer text-gray-600 border rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
        <h2 className="text-xl font-semibold mb-2 truncate">{data?.title}</h2>
        <p className="text-sm line-clamp-3">{data?.content}</p>
      </div>
    </Link>
  );
};
