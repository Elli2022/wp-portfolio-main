//src/pages/queries/getPages.tsx
import WP from "../api/wp";

export default async function getPages() {
  try {
    const resPages = await WP(`
   
   query getPages {
    pages {
      edges {
        node {
          content
          id
          slug
          uri
          title
        }
      }
    }
  }`);
    if (!resPages?.data) {
      throw `error couldn't fetch api`;
    }
    const data = resPages?.data?.pages;
    return data;
  } catch (error) {
    console.error(error);
  }
}
