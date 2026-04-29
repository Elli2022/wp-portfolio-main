// src/app/components/GalleryPagination.tsx
"use client";
import React, { useState } from "react";
import { ImageItem } from "../../types";

export const GalleryPagination = ({
  initialImages,
}: {
  initialImages: ImageItem[];
}) => {
  const imagesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(initialImages.length / imagesPerPage);

  const currentImages = initialImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <section className="gallery">
        {currentImages.map((image, index) => (
          <img
            key={index}
            src={image.mediaItemUrl}
            alt={
              image.altText ||
              `Gallery image ${index + currentPage * imagesPerPage}`
            }
            className="gallery-image"
          />
        ))}
      </section>
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Föregående
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Nästa
        </button>
      </div>
    </div>
  );
};

export default GalleryPagination;
