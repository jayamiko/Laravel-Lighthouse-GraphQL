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
          <h1 className="text-3xl font-bold text-gray-800">{data?.title}</h1>
          <div className="space-x-2">
            <button className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition">
              Edit
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">
              Delete
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500 border-b pb-4">
          <span>Post ID: {data?.id}</span>
          <span>•</span>
          <span>Author: {data?.user?.name}</span>
        </div>

        <div className="prose max-w-none text-gray-700">
          <p>{data?.content}</p>
        </div>
      </article>
    </main>
  );
}
