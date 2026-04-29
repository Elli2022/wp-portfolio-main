
import getAbout from '@/pages/queries/getAbout';
import getHome from '@/pages/queries/getHome';
import getPages from '@/pages/queries/getPages';
import Image from 'next/image';
import Link from 'next/link';

export default async function About() {
  // Logga när du börjar hämta data
  console.log('Fetching home page data...');
  const data = await getAbout("/about");
  // Logga datan som hämtats, om någon
  console.log("Fetched data:", data);

  const navlinks = await getPages()
  const navHits = Object.values(navlinks.edges).map((hit:any) =>(hit.node))

  // Logga specifika delar av datan för att se att de existerar
  console.log("Home page content:", data?.content);
  console.log("Portfolio link URL:", data?.aboutPage.portfolioLinkUrl);
  console.log("About Me link URL:", data?.aboutPage.aboutMeLinkUrl);
  console.log("Contact link URL:", data?.aboutPage.contactLinkUrl);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-24">
      <nav className="flex justify-between items-center">
      {navHits.map((hit: any) => (
          <a href={hit.uri} className="link">
          {hit.title}
        </a>
        ))}
        <a href={data?.aboutPage.aboutMeLinkUrl} className="link">
          {data?.aboutPage.aboutMeLinkText}
        </a>
        <a href={data?.aboutPage.contactLinkUrl} className="link">
          {data?.aboutPage.contactLinkText}
        </a>
      </nav>
      <header className="text-center mt-10">
        <p className="mt-4">{data?.aboutPage.presentingText}</p>
        <h1 className="text-5xl font-bold">
          {data?.aboutPage.aboutPageTitle}
        </h1>
      </header>
      <div className="mt-6">
        <p>{data?.content}</p>
        <a href={data?.aboutPage.buttonUrl} className="btn">
          {data?.aboutPage.buttonText}
        </a>
      </div>
    </main>
  );
}
