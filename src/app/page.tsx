// src/app/page.tsx
import React from 'react';
import { useRouter } from 'next/router';
import getHome from "@/pages/queries/getHome";
import getPages from "@/pages/queries/getPages";
import getPosts from "@/pages/queries/getPosts";
import GalleryPagination from './components/GalleryPagination';

export default async function Home() {
  // Hämta data...
  const data = await getHome("/home");
  const navlinks = await getPages();
  const postsData = await getPosts(); // Anropa getPosts med rätt URI
  console.log(postsData);
  const navHits = Object.values(navlinks.edges).map((hit: any) => hit.node);
  

  // Identifiera länkar för "Portfolio", "About", och "Contact"
  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio"),
    about: navHits.find((hit: any) => hit.title === "About"),
    contact: navHits.find((hit: any) => hit.title === "Contact"),
  };

  // Filtrera ut dessa specifika länkar så att de inte renderas igen senare
  const otherLinks = navHits.filter(
    (hit: any) => !["Portfolio", "About", "Contact"].includes(hit.title)
  );
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-24">
      {/* Navigationsmenyn */}
      <nav className="flex justify-between items-center">
        {Object.values(mainLinks).map(
          (link: any) => link && (
            <a key={link.id} href={link.uri} className="link">
              {link.title}
            </a>
          )
        )}
      </nav>

      {/* Header-sektionen */}
      <header className="text-center mt-10">
        <p className="mt-4">{data?.homePage.presentingText}</p>
        <h1
          className="text-5xl font-bold"
          dangerouslySetInnerHTML={{
            __html: data?.homePage.homePageTitle.replace("fueled", "fueled<br>")
          }}
        ></h1>
      </header>

      {/* "Explore Works"-knappen och andra länkar */}
      <div className="text-center mt-10">
        <a href={data?.homePage.buttonUrl} className="btn inline-block my-4">
          {data?.homePage.buttonText}
        </a>
        <div className="other-links-container">
          {otherLinks.map((link: any) => (
            <a key={link.id} href={link.uri} className="link inline-block mx-2 my-2">
              {link.title}
            </a>
          ))}
        </div>
      </div>

{/* Inläggen */}
<div className="posts-container">
  {postsData && postsData.map((post: any) => (
    <div key={post.id} className="post-item">
      {post.featuredImage && post.featuredImage.node && post.featuredImage.node.mediaItemUrl && (
        <img src={post.featuredImage.node.mediaItemUrl} alt={post.title} />
      )}
      <div className="post-info">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  ))}
</div>


<GalleryPagination initialProjects={[]}/>

      {/* Freelance-projektsektionen */}
      <div className="mt-4 text-center">
        <p className="text-xl">{data?.homePage.freelanceProjects.freelanceTitle}</p>
        <h3 className="text-4xl font-semibold">{data?.homePage.freelanceProjects.freelanceDescription}</h3>
        <a href={data?.homePage.freelanceProjects.freelanceContactUrl} className="btn bg-[var(--primary-color)] hover:bg-[var(--hover-color)] mt-4">
          {data?.homePage.freelanceProjects.freelanceProjectsButton}
        </a>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </main>
  );
}
