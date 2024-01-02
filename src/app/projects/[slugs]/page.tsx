// src/pages/projects/[slugs]/page.tsx

// Importera vår funktion för att hämta inlägg och React-biblioteket
import React from "react";
import getPost from "@/pages/queries/getPost";
import Navigation from "@/app/components/Navigation";
import getPages from "@/pages/queries/getPages";




// Definiera en struktur för våra inlägg
interface Post {
  title: string; // Titeln på inlägget
  content: string; // Innehållet i inlägget
  featuredImage: { // Objekt för framträdande bild
    node: {
      mediaItemUrl: string; // Bildens URL
      slug: string; // En identifierare för bilden
    };
  };
  slug: string; // En identifierare för inlägget
}

// En global variabel för att lagra vårt inläggsdata
let globalPostData: Post | null = null;

// Vår huvudkomponent för att visa inlägg baserat på dess 'slug'
const ProjectPage = async ({ params }: { params: { slugs: string } }) => {

  // En funktion för att hämta inläggsdata från vår API
  const fetchPostData = async () => {
    const resPost = await getPost(params.slugs); // Använder vår getPost-funktion med slug
    if (resPost && resPost.data) { // Kontrollerar om vi faktiskt fick tillbaka data
      globalPostData = resPost.data.postBy; // Sparar datan i vår globala variabel
    }
  };

  const navlinks = await getPages();
  const navHits = navlinks.edges.map((edge: any) => edge.node);

  // Identifiera länkar för "Portfolio", "About", och "Contact"
  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio."),
    about: navHits.find((hit: any) => hit.title === "about me."),
    contact: navHits.find((hit: any) => hit.title === "contact."),
  };

  await fetchPostData(); // Utför datanhämtningen

  // Visar en laddningssida medan data hämtas
  if (!globalPostData) {
    return <div>Loading...</div>;
  }

  // När data är hämtad, rendera sida
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
          src={globalPostData.featuredImage.node.mediaItemUrl} // Bildens URL
          alt={globalPostData.featuredImage.node.slug} // Alt-text för bilden
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: globalPostData.content }} />
    </div>
  );
};

export default ProjectPage; // Gör så att andra filer kan använda ProjectPage-komponent
