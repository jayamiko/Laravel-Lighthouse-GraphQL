"use client";

import { PostData } from "@/types/PostType";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/inputs/Input";
import { Button } from "@/components/buttons/Button";
import { PostCard } from "@/components/cards/PostCard";
import { getAuthToken } from "@/libs/api/authCollection";
import { useRouter } from "next/navigation";
import { User } from "@/types/UserType";

interface PostsPageProps {
  data: PostData[];
}

export default function PostsPage({ data }: PostsPageProps) {
  const router = useRouter();

  const INITIAL_PAGE = 1;
  const LIMIT_ITEM = 6;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(INITIAL_PAGE);

  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const authentication = async () => {
      const res = await getAuthToken();

      if (res.success) {
        setAuthUser(res.data);
      } else {
        router.push("/login");
      }
    };

    authentication();
  }, []);

  console.log("auth user: ", authUser);

  const filteredPosts = useMemo(() => {
    return data?.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * LIMIT_ITEM;
    return filteredPosts?.slice(start, start + LIMIT_ITEM);
  }, [page, filteredPosts]);

  const totalPages = Math.ceil(filteredPosts?.length / LIMIT_ITEM);

  return (
    <main className="container mx-auto p-4 select-none">
      <h1 className="text-gray-500 text-3xl font-bold mb-6 text-center">
        Welcome to Blog Website
      </h1>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6 justify-center">
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-1/3"
        />
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedPosts?.length > 0 ? (
          paginatedPosts?.map((post, index) => (
            <PostCard key={index} data={post} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No posts found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </main>
  );
}
