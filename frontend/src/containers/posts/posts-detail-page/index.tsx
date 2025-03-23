"use client";

import React from "react";
import { PostData } from "@/types/PostType";

interface PostDetailProps {
  data: PostData;
}

export default function PostDetailPage({ data }: PostDetailProps) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <div className="flex justify-between pt-4 border-t">
          <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
          <button className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition">
            Edit Post
          </button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500 border-b pb-4">
          <span>Author ID: {data.id_user}</span>
          <span>•</span>
          <span>Post ID: {data.id}</span>
        </div>

        <div className="prose max-w-none text-gray-700">
          <p>{data.content}</p>
        </div>
      </article>
    </main>
  );
}
