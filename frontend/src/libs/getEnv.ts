"use server";

export const getEnvironment = async () => ({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
