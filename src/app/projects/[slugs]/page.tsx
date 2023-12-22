// src/pages/projects/[slugs]/page.tsx

interface Post {
  title: string;
  content: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
      slug: string;
    };
  };
  slug: string; 
}

interface PostNode {
  featuredImage: {
    node: {
      slug: string;
    };
  };
  slug: string; 
}

interface ProjectPageProps {
  post: Post;
}

const ProjectPage = ({ params }: {params:{slugs: string}}) => {
  console.log(params);

  return (
    <div>
      <h1>{params.slugs}</h1>

    </div>
  );
};

export default ProjectPage;

