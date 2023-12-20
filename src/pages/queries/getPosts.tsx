// src/pages/queries/getPosts.tsx
import WP from "../api/wp";

export default async function getPosts(page = 1, perPage = 6, afterCursor = "", beforeCursor = "") {
  try {
    // Beräkna antalet inlägg att hoppa över baserat på sidan och per sidans inlägg
    const offset = (page - 1) * perPage;

    const queryArgs = {
      after: afterCursor || null,
      before: beforeCursor || null,
      first: perPage,
      last: null, // Ta bort last för att undvika att hämta tidigare inlägg
    };

    const resPost = await WP(
      `query GetPosts($after: String, $before: String, $first: Int, $last: Int) {
        posts(after: $after, before: $before, first: $first, last: $last) {
          edges {
            node {
              id
              title
              content
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
            cursor
          }
          pageInfo {
            startCursor
            hasNextPage
            hasPreviousPage
            endCursor
          }
        }
      }`,
      queryArgs
    );

    if (!resPost?.data) {
      throw new Error("Could not fetch posts");
    }

    // Hämta bara de inlägg som är relevanta för den aktuella sidan
    const relevantPosts = resPost?.data?.posts?.edges
      ?.map((edge: { node: any; }) => edge.node)
      .slice(offset, offset + perPage);

    return {
      posts: relevantPosts,
      pageInfo: resPost?.data?.posts?.pageInfo,
    };

  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; 
  }
}
