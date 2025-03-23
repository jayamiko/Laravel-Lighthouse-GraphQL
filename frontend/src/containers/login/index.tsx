"use client";

import LoginForm from "@/components/forms/LoginForm";
import { getAuthToken, login } from "@/libs/api/authCollection";
import { LoginRequest } from "@/types/AuthType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const authentication = async () => {
      const res = await getAuthToken();

      if (res.success) {
        router.push("/posts");
      }
    };

    authentication();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(form);

    if (!res?.success) {
      alert(res?.message);
    } else {
      const token = res?.data?.token;

      const expiry = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours
      localStorage.setItem("token", token);
      localStorage.setItem("token_expiry", expiry.toString());

      router.push("/posts");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500">
          Please login to your account
        </p>

        <LoginForm form={form} onChange={handleChange} onSubmit={handleLogin} />

        <p className="text-center text-gray-500 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
