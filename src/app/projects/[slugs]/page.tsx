// src/pages/projects/[slugs]/page.tsx


import React from "react";
import getPages from "@/pages/queries/getPages";
import Navigation from "../../components/Navigation";
import WP from "@/pages/api/wp";
import getPost from "@/pages/queries/getPost";


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
  let globalPostData = null;
  let additionalPostInfo = null;  // Definiera additionalPostInfo här

  // Hämta data från WP
  const resPost = await WP(`
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
    }`,
    { slug: params.slugs }
  );

  if (resPost.data) {
    globalPostData = resPost.data.postBy;
  }

  // Hämta ytterligare data med getPost
  const additionalData = await getPost(params.slugs);
  if (additionalData && additionalData.data) {
    additionalPostInfo = additionalData.data.post;  // Tilldela data till additionalPostInfo
  }

  const navlinks = await getPages();
  const navHits = navlinks.edges.map((edge: any) => edge.node);
  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio."),
    about: navHits.find((hit: any) => hit.title === "about me."),
    contact: navHits.find((hit: any) => hit.title === "contact."),
  };

  if (!globalPostData || !additionalPostInfo) {
    return <div>Loading...</div>;
  }

  // När data är hämtad, renderas sidan
  return (
    <div>
    <Navigation 
      portfolioLink={mainLinks.portfolio}
      aboutLink={mainLinks.about}
      contactLink={mainLinks.contact}
    />
    <h1>{globalPostData.title}</h1> 
    {globalPostData.featuredImage && globalPostData.featuredImage.node && (
      <img
        src={globalPostData.featuredImage.node.mediaItemUrl}
        alt={globalPostData.featuredImage.node.slug}
      />
    )}
    <div dangerouslySetInnerHTML={{ __html: globalPostData.content }} />

    <div>
      <h2>{additionalPostInfo.PostInfo?.branding}</h2>
      <p>{additionalPostInfo.PostInfo?.subtitle}</p>
      <p>{additionalPostInfo.PostInfo?.projectintrotext}</p>
      <p>{additionalPostInfo.PostInfo?.projectdescription}</p>
      <p>{additionalPostInfo.PostInfo?.clientheading}</p>
      <p>{additionalPostInfo.PostInfo?.date}</p>
      <p>{additionalPostInfo.PostInfo?.client}</p>
    </div>
  </div>
  );
};

export default ProjectPage;
