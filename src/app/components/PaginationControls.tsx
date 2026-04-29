//src/app/components/PaginationControls.tsx
"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getPosts from "@/pages/queries/getPosts";

interface PaginationControlsProps {
  startCursor: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string;
  data: any;
  beforeCursor: string;
  posts: string;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  startCursor,
  hasNextPage,
  hasPrevPage,
  endCursor,
  beforeCursor,
  data,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams) {
    console.log("No search params available");
    return null;
  }

  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "6", 10);

  console.log("Current Page:", page);
  console.log("Posts Per Page:", perPage);
  console.log("Has Next Page:", hasNextPage);
  console.log("Has Previous Page:", hasPrevPage);
  console.log("Start Cursor:", startCursor);
  console.log("End Cursor:", endCursor);
  console.log("Before Cursor:", beforeCursor);
  console.log("Total Posts:");

  const handlePrevPage = () => {
    console.log("Handling Previous Page");
    if (hasPrevPage && page > 1) {
      const prevPageUrl = `/?page=${
        page - 1
      }&per_page=${perPage}&before=${encodeURIComponent(startCursor)}`;
      console.log("Navigating to Previous Page URL:", prevPageUrl);
      router.push(prevPageUrl);
    }
  };

  const handleNextPage = () => {
    console.log("Handling Next Page");
    if (hasNextPage) {
      const nextPageUrl = `/?page=${
        page + 1
      }&per_page=${perPage}&after=${encodeURIComponent(endCursor)}`;
      console.log("Navigating to Next Page URL:", nextPageUrl);
      router.push(nextPageUrl);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasPrevPage}
        onClick={handlePrevPage}
      >
        {"<"}
      </button>

      <div>{page}</div>

      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasNextPage}
        onClick={handleNextPage}
      >
        {">"}
      </button>
    </div>
  );
};

export default PaginationControls;
