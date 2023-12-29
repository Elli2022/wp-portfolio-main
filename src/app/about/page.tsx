//src/app/about/page.tsx
import getAbout from "@/pages/queries/getAbout";
import getPages from "@/pages/queries/getPages";

export default async function About() {
  console.log("Fetching about page data...");
  const aboutData = await getAbout("/about");
  const navlinks = await getPages();
  const navHits = Object.values(navlinks.edges).map((hit: any) => hit.node);

  console.log("Fetched data:", aboutData);

  const specialLink = navHits.find((hit) => hit.title === "Special Link");

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-24">
      <nav className="flex justify-between items-center">
        {navHits.map((hit: any) => (
          <a key={hit.id} href={hit.uri} className="link">
            {hit.title}
          </a>
        ))}
      </nav>
      <header className="text-center mt-10">
        <p className="mt-4">{aboutData?.aboutPage.presentingText}</p>
        <h1 className="text-5xl font-bold">
          {aboutData?.aboutPage.aboutPageTitle}
        </h1>
      </header>
      <div className="text-center">
        <p>{aboutData?.content}</p>
        {specialLink && (
          <a href={specialLink.uri} className="btn">
            {specialLink.title}
          </a>
        )}
      </div>
    </main>
  );
}
