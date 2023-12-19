import WP from "../api/wp";

export default async function getPosts() {
  try {
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
        }
      }`,
      {
        after: "", // Du kan definiera dessa värden eller ta emot dem som funktionens parametrar
        before: "",
        first: 10,
        last: null,
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
