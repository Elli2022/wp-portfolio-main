//src/pages/queries/getPosts.tsx
import WP from "../api/wp";

export default async function getPosts(afterCursor = '', first = 10) {
  try {
    const resPost = await WP(
      `query GetPosts($after: String , $first: Int, $last: Int, $before: String) {
        posts(after: $after, first: $first, last: $last, before: $before,) {
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
      {
        after: afterCursor,
        first,
      }
    );

    if (!resPost?.data) {
      throw new Error("Could not fetch posts");
    }

    // Notera ändringen här från `.page` till `.posts.edges`
    const postsData = resPost?.data?.posts?.edges?.map((edge: { node: any; }) => edge.node);
    return postsData;

  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; 
  }
}
