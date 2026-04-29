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
        <p className="mt-4">{data?.homePage.presentingText}</p>
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

        <div className="gallery-container text-center">
          <section className="gallery">
            {data?.homePage.projectGallery.map(
              (project: any, index: number) =>
                project.projectImage && project.projectImage.mediaItemUrl ? ( // Kontrollerar att projectImage och mediaItemUrl inte är null
                  <div key={index} className="gallery-item">
                    <a
                      href={project.projectUrl || "#"} // Om projectUrl är null, sätt en fallback (t.ex. "#")
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={project.projectImage.mediaItemUrl} // Använder mediaItemUrl för att hämta bilden
                        alt={
                          project.projectTitle || `Project image ${index + 1}`
                        }
                        className="gallery-image"
                      />
                      <h3>{project.projectTitle}</h3>
                    </a>
                  </div>
                ) : null // Om projectImage är null, rendera inte elementet
            )}
          </section>
        </div>
      </div>
      <GalleryPagination
        initialImages={data?.homePage.projectGalleryGallery || []}
      />
    </main>
  );
}
