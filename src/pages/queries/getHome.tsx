//src/lib/queries/getHome.tsx
import WP from "../api/wp";

export default async function getHome(uri: string) {
  try {
    const res = await WP(
      `
        query getHome($uri: ID!){
            page(id: $uri, idType: URI) {
              id
    content
    homePage {
      homePageTitle
      presentingText
      buttonText
      buttonUrl
      portfolioLinkText
      aboutMeLinkText
      aboutMeLinkUrl {
        url
      }
      contactLinkText
      contactLinkUrl {
        url
      }
      portfolioLinkUrl {
        url
      }
      homePageGallery {
        mediaItemUrl
        uri
      }
      homePageGallery2 {
        mediaItemUrl
        uri
      }
    }
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
