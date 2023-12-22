//src/app/components/PaginationControls.tsx
'use client'

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


interface PaginationControlsProps {
  startCursor: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string;
  
}

const PaginationControls: FC<PaginationControlsProps> = ({
  startCursor,
  hasNextPage,
  hasPrevPage,
  endCursor,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams) {
    return null;
  }

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const perPage = parseInt(searchParams.get('per_page') ?? '6', 10);

  const handlePrevPage = () => {
    if (hasPrevPage && page > 1) {
      const prevPageUrl = startCursor
        ? `/?page=${page - 1}&per_page=${perPage}&before=${encodeURIComponent(startCursor)}`
        : `/?page=${page - 1}&per_page=${perPage}`;
      router.push(prevPageUrl);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      // Använd encodeURIComponent för att hantera speciella tecken i cursor-strängen
      const nextPageUrl = `/?page=${page + 1}&per_page=${perPage}&after=${encodeURIComponent(endCursor)}`;
      router.push(nextPageUrl);
    }
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={handlePrevPage}>
        {"<"}
      </button>

      <div>
        {page} / {Math.ceil(10 / perPage)}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={handleNextPage}>
        {">"}
      </button>
    </div>
  );
};

export default PaginationControls;

