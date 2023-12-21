//src/pages/queries/getPosts.tsx
import WP from "../api/wp";

export default async function getPosts(page = 1, perPage = 6, afterCursor = "") {
  try {
    let queryArgs = {};

    // Använd endast 'first' och 'after' för paginering
    if (page === 1) {
      queryArgs = {
        after: null,
        first: perPage,
      };
    } else {
      queryArgs = {
        after: afterCursor,
        first: perPage,
      };
    }

    console.log("Page:", page);
    console.log("PerPage:", perPage);
    console.log("AfterCursor:", afterCursor);

    console.log('GraphQL Query Parameters:', queryArgs);

    const resPost = await WP(
      `query GetPosts($after: String, $first: Int) {
        posts(after: $after, first: $first) {
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
            slug
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }`,
      queryArgs
    );

    if (!resPost?.data) {
      throw new Error("Could not fetch posts");
    }

    return {
      posts: resPost?.data?.posts?.edges?.map((edge: { node: any; }) => edge.node),
      pageInfo: resPost?.data?.posts?.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; 
  }
}
