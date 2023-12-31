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

// Define a global variable to store the post data
let globalPostData: {
  [x: string]: any;
  title: string;
};

const ProjectPage = async ({ params }: { params: { slugs: string } }) => {
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

      if (resPost.data) {
        // Store the fetched data in the global variable
        globalPostData = resPost.data.postBy;
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  // Fetch the data
  await fetchPostData();

  return (
    <div>
      {/* <h1>{params.slugs}</h1> */}
      {globalPostData && <h1>{globalPostData.title}</h1>}
      {globalPostData.featuredImage && globalPostData.featuredImage.node && (
        <img
          src={globalPostData.featuredImage.node.mediaItemUrl}
          alt={globalPostData.featuredImage.node.slug}
        />
      )}
    </div>
  );
};

export default ProjectPage;
