"use client";
import React, { ChangeEvent, useState } from "react";

// interface NewsPageProps {
//   data: {
//     posts: PostEntity[];
//   };
// }

const LIMIT_PAGE = 12;

function PostsPage({ data }: any) {
  const posts = data?.posts;

  const [newsData, setNewsData] = useState(posts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //   const { isLoading } = useQuery({
  //     query: GET_POST_QUERY,
  //     variables: {
  //       filters: {
  //         or: [
  //           {
  //             title: {
  //               containsi: search,
  //             },
  //           },
  //           {
  //             article: {
  //               containsi: search,
  //             },
  //           },
  //         ],
  //         and: [
  //           {
  //             category: {
  //               containsi: filter,
  //             },
  //           },
  //           {
  //             category: {
  //               containsi: activeTab,
  //             },
  //           },
  //           AND_PUBLISH_FILTER,
  //         ],
  //       },
  //       sort: "createdAt:desc",
  //       pagination: {
  //         pageSize: 25,
  //       },
  //     },
  //     onComplete: (data: PostEntityResponseCollection) => {
  //       setNewsData(data?.posts.data);
  //     },
  //   });

  //   const { data: headlineData }: any = useQuery({
  //     query: GET_POST_QUERY,
  //     variables: {
  //       filters: {
  //         headline: {
  //           eq: true,
  //         },
  //         and: [AND_PUBLISH_FILTER],
  //       },
  //       sort: "createdAt:desc",
  //       pagination: {
  //         pageSize: 3,
  //       },
  //     },
  //   });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearch(event.target.value as string);
    }, 1000);
  };

  const handlePagination = () => {
    setPage((prev: number) => prev + 1);
  };

  return <main className="container mx-auto select-none">This Posts Page</main>;
}

export default PostsPage;
