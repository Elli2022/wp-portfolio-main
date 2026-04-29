//src/lib/queries/getHome.tsx
import WP from "../api/wp"; // Om din WP-funktion är korrekt exporterad från "../api/wp"


export default async function getHome(uri: string) {
  try {
    const res = await WP(
      `
        query getHome($uri: ID!){
            page(id: $uri, idType: URI) {
              id
              content
    homePage {
      aboutMeLinkText
      aboutMeLinkUrl {
        title
        url
      }
      buttonText
      buttonUrl
      contactLinkText
      contactLinkUrl {
        title
        url
      }
      portfolioLinkText
      portfolioLinkUrl {
        title
        url
      }
      projectGallery {
        fieldGroupName
        projectTitle
        projectUrl
        projectImage {
          mediaItemUrl
        } 
      }
      freelanceProjects {
        freelanceDescription
        freelanceProjectsButton
        freelanceTitle
        freelanceProjectsLink {
          title
          url
        }
      }
      homePageTitle
      presentingText
      
    }
    uri
    
  }
}
        `,
      { uri }
    );

    if (!res?.data) {
      throw `error couldn't fetch api`;
    }
    const data = res?.data?.page;
    return data;
  } catch (error) {
    console.error(error);
  }
}
