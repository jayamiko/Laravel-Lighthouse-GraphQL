"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { RegisterRequest } from "@/types/AuthType";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import { CardContent, ModalCard } from "@/components/cards/ModalCard";
import { register } from "@/libs/api/authCollection";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const initialForm = {
    name: "",
    email: "",
    password: "",
  };

  const [form, setForm] = useState<RegisterRequest>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register(form);

    if (response.success) {
      alert(response.message);
      setForm(initialForm);
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ModalCard className="p-6 rounded-2xl shadow-2xl w-96 space-y-2">
          <h1 className="text-gray-500 text-2xl font-bold text-center">
            Create Account
          </h1>
          <CardContent>
            <RegisterForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
            <p className="text-center text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </ModalCard>
      </motion.div>
    </main>
  );
}
