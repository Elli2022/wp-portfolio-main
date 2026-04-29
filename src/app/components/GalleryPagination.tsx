// src/app/components/GalleryPagination.tsx
"use client";
import React, { useState } from "react";

export const GalleryPagination = ({
  initialProjects,
}: {
  initialProjects: any[]; // Typen här kan vara mer specifik om du definierar en interface för dina projekt
}) => {
  const imagesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(initialProjects.length / imagesPerPage);

  const currentProjects = initialProjects.slice(
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
      <section className="gallery ">
        {currentProjects.map(
          (project, index) =>
            project.projectImage &&
            project.projectImage.mediaItemUrl && (
              <div key={index} className="gallery-item">
                <a
                  href={project.projectUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={project.projectImage.mediaItemUrl}
                    alt={project.projectTitle || `Project image ${index + 1}`}
                    className="gallery-image"
                  />
                  <h3>{project.projectTitle}</h3>
                </a>
              </div>
            )
        )}
      </section>
      <div className="flex justify-center items-center space-x-1">
        <button
          className="px-4 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-blue-500 transition ease-in-out duration-150"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-1 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-blue-500 transition ease-in-out duration-150 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-blue-500 transition ease-in-out duration-150"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default GalleryPagination;
