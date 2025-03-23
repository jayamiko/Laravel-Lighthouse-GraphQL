"use client";

import React, { useEffect, useState } from "react";
import { PostData, PostRequest } from "@/types/PostType";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import PostForm from "@/components/forms/PostForm";
import {
  deletePost,
  getPostById,
  updatePost,
} from "@/libs/api/PostCollections";
import AlertNotification from "@/components/labels/AlertNotification";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/libs/api/authCollection";
import { User } from "@/types/UserType";

interface PostDetailProps {
  id: string;
}

export default function PostDetailPage({ id }: PostDetailProps) {
  const router = useRouter();

  const [data, setData] = useState<PostData | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function fetchPostByID(id: string) {
      const response = await getPostById({ id: id });
      setData(response?.data?.post);
    }

    fetchPostByID(id);
  }, [id]);

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

  const userHasThisPost = authUser?.id === data?.user.id;

  const initialForm: PostRequest = {
    title: "",
    content: "",
  };

  const [form, setForm] = useState<PostRequest>(initialForm);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await updatePost(id, form);

    if (response.success) {
      setMessage({ type: "success", text: response.message });
      setForm(initialForm);
      setShowEditModal(false);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      setMessage({
        type: "error",
        text: response.message || "Failed to edit post. Please try again.",
      });
      setShowEditModal(false);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await deletePost(id);

    if (response.success) {
      setShowDeleteModal(false);
      router.push("/posts");
    } else {
      setMessage({
        type: "error",
        text: response.message || "Failed to delete post. Please try again.",
      });
      setShowEditModal(false);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="bg-gradient-to-tr from-white via-gray-50 to-slate-100 shadow-xl rounded-2xl p-8 space-y-6">
        <Button variant="outline" onClick={() => router.push("/posts")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {message && <AlertNotification message={message} />}

        <div className="flex justify-between items-start border-b pb-4">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
            {data?.title}
          </h1>
          {userHasThisPost ? (
            <div className="space-x-2 flex">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(true)}
                className="flex items-center"
              >
                <Pencil className="h-4 w-4 mr-1" />
                <span>Edit</span>
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span>Delete</span>
              </Button>
            </div>
          ) : (
            <p className="w-40 text-xs text-red-500 text-right">
              You cannot edit or delete this post you.
            </p>
          )}
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Post ID: {id}</span>
          <span>•</span>
          <span>Author: {data?.user?.name}</span>
        </div>

        <div className="prose max-w-none text-gray-700">
          <p>{data?.content}</p>
        </div>
      </article>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg space-y-4">
            <h2 className="text-gray-700 text-xl font-semibold">Edit Post</h2>

            <PostForm
              type="edit"
              form={form}
              onChange={handleChange}
              onSubmit={handleUpdate}
              handleCancel={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
            <h2 className="text-gray-700 font-medium text-center">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
