// src/app/page.tsx
import getHome from "@/pages/queries/getHome";
import getPages from "@/pages/queries/getPages";
import GalleryPagination from "./components/GalleryPagination";

export default async function Home() {
  // Hämta data...
  const data = await getHome("/home");
  const navlinks = await getPages();
  const navHits = Object.values(navlinks.edges).map((hit: any) => hit.node);

  // Filtrera ut 'Bootstrap' och 'All' från navigationslänkarna.
  const filteredNavHits = navHits.filter((hit: any) => hit.title !== "Bootstrap" && hit.title !== "All");

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-24">
      <nav className="flex justify-between items-center">
        {filteredNavHits.map((hit: any) => (
          <a key={hit.id} href={hit.uri} className="link">
            {hit.title}
          </a>
        ))}
      </nav>

      <header className="text-center mt-10">
        <p className="mt-4">{data?.homePage.presentingText}</p>
        <h1 className="text-5xl font-bold">{data?.homePage.homePageTitle}</h1>
      </header>

      <div className="text-center mt-10">
        <a href={data?.homePage.buttonUrl} className="btn inline-block my-4">
          {data?.homePage.buttonText}
        </a>

        {/* Här renderas "Bootstrap" och "All" länkarna i samma stil som de andra länkarna */}
        <div className="mt-4">
          <a href="/bootstrap" className="link inline-block mx-2 my-2">
            Bootstrap
          </a>
          <a href="/all" className="link inline-block mx-2 my-2">
            All
          </a>
        </div>
      </div>

      <GalleryPagination initialProjects={data?.homePage.projectGallery || []} />

      <div className="mt-4 text-center">
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

      <footer className="text-center py-4 mt-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </main>
  );
}
