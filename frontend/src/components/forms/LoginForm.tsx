"use client";

import React from "react";
import { FormField } from "./RegisterForm";
import { LoginRequest } from "@/types/AuthType";

function LoginForm({
  form,
  onChange,
  onSubmit,
}: {
  form: LoginRequest;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="you@email.com"
        value={form.email}
        onChange={onChange}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={onChange}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
