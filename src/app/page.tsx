//src/app/page.tsx
import getAbout from "@/pages/queries/getAbout";
import getHome from "@/pages/queries/getHome";
import getPages from "@/pages/queries/getPages";
import Image from "next/image";
import Link from "next/link";
import { HomePageData, ImageItem, NavHit } from "@/types"; // Update this path to the actual location of your types.ts file
import GalleryPagination from "./components/GalleryPagination";

export default async function Home() {
  console.log("Fetching home page data...");
  const data = await getHome("/home");
  const navlinks = await getPages();
  const navHits = Object.values(navlinks.edges).map((hit: any) => hit.node);

  // Extrahera projectGallery från homeData
  const projectGallery = data?.homePage?.projectGallery || [];

  console.log("Fetched data:", data);
  console.log("testdata:", navHits);

  const home2Link = navHits.find((hit) => hit.title === "Home 2");
  const otherLinks = navHits.filter((hit) => hit.title !== "Home 2");

  const categoryLinks = [
    { title: "Bootstrap", uri: "/bootstrap" },
    { title: "All", uri: "/all" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-24">
      <nav className="flex justify-between items-center">
        {otherLinks.map((hit: any) => (
          <a key={hit.id} href={hit.uri} className="link">
            {hit.title}
          </a>
        ))}
      </nav>
      <header className="text-center mt-10">
        <p className="text-center mt-4">{data?.homePage.presentingText}</p>
        <h1 className="text-5xl font-bold">{data?.homePage.homePageTitle}</h1>
      </header>
      <div className="button-and-link-container text-center">
        <a href={data?.homePage.buttonUrl} className="btn">
          {data?.homePage.buttonText}
        </a>
        {home2Link && (
          <a href={home2Link.uri} className="link home2-link">
            {home2Link.title}
          </a>
        )}

        <GalleryPagination initialProjects={projectGallery} />
        <div className="mt-4 ">
          <p className="text-xl">
            {data?.homePage.freelanceProjects.freelanceTitle}
          </p>
          <h3 className="text-2xl font-semibold">
            {data?.homePage.freelanceProjects.freelanceDescription}
          </h3>
          <a
            href={data?.homePage.freelanceProjects.freelanceContactUrl}
            className="btn bg-[var(--primary-color)] hover:bg-[var(--hover-color)] mt-4"
          >
            {data?.homePage.freelanceProjects.freelanceProjectsButton}
          </a>
        </div>
      </div>
      <footer className=" text-center py-4 mt-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </main>
  );
}
