"use client";

import { CardContent, ModalCard } from "@/components/cards/ModalCard";
import PostForm from "@/components/forms/PostForm";
import { createPost } from "@/libs/api/PostCollections";
import { PostRequest } from "@/types/PostType";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/buttons/Button";

export default function PostsCreatePage() {
  const router = useRouter();

  const initialForm = {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await createPost(form);

    if (response.success) {
      setMessage({ type: "success", text: response.message });
      setForm(initialForm);
    } else {
      setMessage({
        type: "error",
        text: response.message || "Failed to create post. Please try again.",
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <ModalCard className="shadow-xl">
          <CardContent className="p-6 space-y-6">
            <Button variant="default" onClick={() => router.push("/posts")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700 text-center">
                Create New Post
              </h2>
            </div>

            {/* Notif Message */}
            {message && (
              <div
                className={`flex items-center gap-2 p-3 rounded-md ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            {/* Form */}
            <PostForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </ModalCard>
      </motion.div>
    </main>
  );
}
