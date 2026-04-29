import getAbout from '@/pages/queries/getAbout';
import getHome from '@/pages/queries/getHome';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  // Logga när du börjar hämta data
  console.log('Fetching home page data...');
  const data = await getHome("/home");

  // Logga datan som hämtats, om någon
  console.log("Fetched data:", data);

  // Logga specifika delar av datan för att se att de existerar
  console.log("Home page content:", data?.content);
  console.log("Portfolio link URL:", data?.homePage.portfolioLinkUrl);
  console.log("About Me link URL:", data?.homePage.aboutMeLinkUrl);
  console.log("Contact link URL:", data?.homePage.contactLinkUrl);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-24">
      <nav className="flex justify-between items-center">
        <a href={data?.homePage.portfolioLinkUrl.url} className="link">
          {data?.homePage.portfolioLinkText}
        </a>
        <a href={data?.homePage.aboutMeLinkUrl} className="link">
          {data?.homePage.aboutMeLinkText}
        </a>
        <a href={data?.homePage.contactLinkUrl} className="link">
          {data?.homePage.contactLinkText}
        </a>
      </nav>
      <header className="text-center mt-10">
        <p className="mt-4">{data?.homePage.presentingText}</p>
        <h1 className="text-5xl font-bold">
          {data?.homePage.homePageTitle}
        </h1>
      </header>
      <div className="mt-6">
        <p>{data?.content}</p>
        <a href={data?.homePage.buttonUrl} className="btn">
          {data?.homePage.buttonText}
        </a>
      </div>
    </main>
  );
}
