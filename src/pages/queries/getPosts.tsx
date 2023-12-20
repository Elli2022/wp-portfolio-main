import WP from "../api/wp";

export default async function getPosts(page = 1, perPage = 6, endCursor = "") {
  try {
    console.log(`Fetching posts with page: ${page}, perPage: ${perPage}, endCursor: ${endCursor}`);

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
        after: endCursor,
        first: perPage,
      }
    );

    if (!resPost?.data) {
      throw new Error("Could not fetch posts");
    }

    console.log("Response from WP GraphQL:", resPost?.data);

    const postsData = resPost?.data?.posts?.edges?.map((edge: { node: any; }) => edge.node);
    return postsData;
    

  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; 
  }
}
