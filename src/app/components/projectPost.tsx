// components/ProjectPost.tsx
import React from "react";

let globalPostData: any;

const ProjectPost = () => {
  if (!globalPostData) {
    // Om globalPostData är undefined eller null, visa en laddningsindikator eller något annat
    return <div>Loading...</div>;
  }

  const { title, content, featuredImage } = globalPostData;

  return (
    <div className="p-4 border border-gray-200 rounded shadow-sm">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      {featuredImage?.node?.mediaItemUrl && (
        <img
          src={featuredImage.node.mediaItemUrl}
          alt={featuredImage.node.slug}
          className="w-full h-auto object-cover rounded"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ProjectPost;
