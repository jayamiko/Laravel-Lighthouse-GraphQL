import React from "react";
import { Button } from "../buttons/Button";
import { Textarea } from "../inputs/TextAreaInput";
import { PostRequest } from "@/types/PostType";
import { FormField } from "./RegisterForm";

function PostForm({
  form,
  onChange,
  onSubmit,
}: {
  form: PostRequest;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Title"
        name="title"
        type="text"
        placeholder="Your title"
        value={form.title}
        onChange={onChange}
      />
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">
          Content
        </label>
        <Textarea
          className="text-gray-600"
          placeholder="Write your content here..."
          rows={6}
          name="content"
          value={form.content}
          onChange={onChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Publish Post
      </Button>
    </form>
  );
}

export default PostForm;
