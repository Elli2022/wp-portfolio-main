// src/pages/projects/[slugs]/page.tsx

// Importera vår funktion för att hämta inlägg och React-biblioteket
import getPost from "@/pages/queries/getPost";
import React from "react";


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

  await fetchPostData(); // Utför datanhämtningen

  // Visar en laddningssida medan data hämtas
  if (!globalPostData) {
    return <div>Loading...</div>;
  }

  // När data är hämtad, rendera sida
  return (
    <div>
      <h1>{globalPostData.title}</h1> 
      {globalPostData.featuredImage && globalPostData.featuredImage.node && (
        <img
          src={globalPostData.featuredImage.node.mediaItemUrl} // Bildens URL
          alt={globalPostData.featuredImage.node.slug} // Alt-text för bilden
        />
      )}
    </div>
  );
};

export default ProjectPage; // Gör så att andra filer kan använda ProjectPage-komponent
