"use client";

import React from "react";
import { useParams } from "next/navigation";

interface PostDetailProps {
  data: any;
}

export default function PostDetailPage({ data }: PostDetailProps) {
  const params = useParams();

  //   const env = useEnv();

  const postID = params?.id;

  //   const { data }: any = useQuery({
  //     query: GET_POST_QUERY,
  //     variables: {
  //       filters: {
  //         and: [
  //           {
  //             slug: {
  //               notContainsi: slug,
  //             },
  //           },
  //           AND_PUBLISH_FILTER,
  //         ],
  //       },
  //       sort: "createdAt:desc",
  //       pagination: {
  //         pageSize: 3,
  //       },
  //     },
  //   });

  //   const postData = data?.posts?.data;

  return (
    <div className="container mx-auto">This POst Detail with ID {postID}</div>
  );
}
