import WP from "../api/wp";

export default async function getPosts(page = 1, perPage = 6, afterCursor = "", beforeCursor = "") {
  try {
    const queryArgs = {
      after: afterCursor || null,
      before: beforeCursor || null,
      first: afterCursor ? perPage : null,
      last: beforeCursor ? perPage : null,
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

    return {
      posts: resPost?.data?.posts?.edges?.map((edge: { node: any; }) => edge.node),
      pageInfo: resPost?.data?.posts?.pageInfo,
    };

  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; 
  }
}
