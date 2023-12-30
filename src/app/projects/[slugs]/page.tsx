// src/pages/projects/[slugs]/page.tsx

import React from "react";

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

interface FeaturedImageNode {
  mediaItemUrl: string;
  slug: string;
}

const apiKey = process.env.wordpressApiKey;

const WP = async (query: string, variables?: any) => {
  try {
    const res = await fetch(`${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: variables || null,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

export async function generateStaticParams() {
  // Fetch all the slugs for the posts
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

const ProjectPage = async ({ params }: { params: { slugs: string } }) => {
  // Logga den mottagna slug
  console.log("Received slug:", params.slugs);

  const fetchPostData = async () => {
    try {
      const resPost = await WP(
        `
        query GetPostBySlug($slug: String!) {
          postBy(slug: $slug) {
            id
            title
            content
            featuredImage {
              node {
                mediaItemUrl
                altText
              }
            }
            slug
          }
        }
        `,
        { slug: params.slugs }
      );

      // Here, you would handle the fetched post data
      if (resPost.data) {
        console.log("Fetched post data:", resPost.data.postBy);
      } else {
        console.log("No post found for slug:", params.slugs);
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  // Här loggar vi bara slug som ett exempel
  console.log("Fetching data for slug:", params.slugs);
  // Här skulle du hämta och returnera postdata

  // Kalla på funktionen för att hämta data
  fetchPostData();

  return (
    <div>
      <h1>{params.slugs}</h1>
    </div>
  );
};

export default ProjectPage;
