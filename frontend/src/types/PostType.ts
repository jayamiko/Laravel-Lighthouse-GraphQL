import { User } from "./UserType";

export interface PostRequest {
  title: string;
  content: string;
}
export interface PostData {
  id: string;
  title: string;
  content: string;
  user: User;
  created_at: string;
}
