import React from "react";
import { PostData } from "@/types/PostType";
import Link from "next/link";
import { CalendarDays, User2 } from "lucide-react";

type Props = {
  data: PostData;
};

export const PostCard: React.FC<Props> = ({ data }: Props) => {
  return (
    <Link href={`/posts/${data.id}`}>
      <div className="cursor-pointer border rounded-2xl p-5 shadow-md hover:shadow-lg transition-all bg-gradient-to-tr from-white via-gray-50 to-slate-100 hover:scale-[1.02] space-y-4">
        <h2 className="text-2xl font-bold text-gray-700 truncate">
          {data?.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3">{data?.content}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>
              {new Date(data?.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <User2 className="h-4 w-4" />
            <span>{data?.user?.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
