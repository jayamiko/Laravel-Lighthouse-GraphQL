"use client";

import { PostData } from "@/types/PostType";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, LogOut, Plus, Search } from "lucide-react";
import { Input } from "@/components/inputs/Input";
import { Button } from "@/components/buttons/Button";
import { PostCard } from "@/components/cards/PostCard";
import { getAuthToken, logout } from "@/libs/api/authCollection";
import { useRouter } from "next/navigation";
import { User } from "@/types/UserType";
import Link from "next/link";
import { getPost } from "@/libs/api/PostCollections";

export default function PostsPage() {
  const router = useRouter();

  const [data, setData] = useState<PostData[]>([]);

  const INITIAL_PAGE = 1;
  const LIMIT_ITEM = 6;

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(INITIAL_PAGE);

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

  useEffect(() => {
    async function fetchPost() {
      const response = await getPost();
      setData(response?.data?.posts);
    }

    fetchPost();
  }, []);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      router.push("/login");
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-700 text-3xl font-extrabold">Blog Website</h1>
        {authUser && (
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        )}
      </div>

      {/* User Info */}
      {authUser && (
        <div className="mb-6 text-center bg-gradient-to-r from-white via-gray-50 to-slate-100 rounded-lg p-4 shadow">
          <p className="text-gray-800 font-semibold text-lg">
            Logged in as: {authUser.name}
          </p>
          <p className="text-gray-500 text-sm">{authUser.email}</p>
        </div>
      )}

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
        <Button variant="default">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <span className="text-gray-700 font-medium">
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

      <Link href="/posts/create" className="fixed bottom-8 right-8">
        <Button
          variant="default"
          className="rounded-full w-14 h-14 shadow-xl hover:scale-110 transition-transform"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </main>
  );
}
