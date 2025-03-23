"use client";

import React from "react";
import { Button } from "../buttons/Button";
import { Input } from "../inputs/Input";
import { RegisterRequest } from "@/types/AuthType";

export default function RegisterForm({
  form,
  onChange,
  onSubmit,
}: {
  form: RegisterRequest;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Name"
        name="name"
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={onChange}
      />
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
      <Button type="submit" className="w-full mt-2">
        Register
      </Button>
    </form>
  );
}

export function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm mb-1 font-medium text-gray-500">
        {label}
      </label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
