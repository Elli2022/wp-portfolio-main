// src/pages/projects/[slugs]/page.tsx

import React from "react";
import { useRouter } from "next/navigation";
import getPosts from "@/pages/queries/getPosts";
import WP from "@/pages/api/wp";

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

export async function generateStaticParams() {
  const posts = await WP(`
  query GetPosts {
    posts {
      edges {
        node {
          slug
        }
      }
    }
  }`);
  const paths: any = [];
  posts?.data?.posts?.edges?.map((post: any) => {
    if (post && post.node && post.node.slug) {
      paths.push({ params: { slug: post.node.slug } });
    }
  });

  return paths;
}

const ProjectPage = ({ params }: { params: { slugs: string } }) => {
  // Logga den mottagna slug
  console.log("Received slug:", params.slugs);

  const fetchPostData = async () => {
    // Antag att du har en funktion eller ett API-anrop för att hämta postdata baserat på slug
    // Här loggar vi bara slug som ett exempel
    console.log("Fetching data for slug:", params.slugs);
    // Här skulle du hämta och returnera postdata
  };

  // Kalla på funktionen för att hämta data
  fetchPostData();

  return (
    <div>
      <h1>{params.slugs}</h1>
    </div>
  );
};

export default ProjectPage;
