// src/pages/queries/getPosts.tsx
import WP from "../api/wp";

export default async function getPosts(
  page = 1,
  perPage = 6,
  afterCursor = "",
  beforeCursor = ""
) {
  try {
    let queryArgs = {};

    if (afterCursor) {
      queryArgs = { after: afterCursor, first: perPage };
    } else if (beforeCursor && page > 1) {
      queryArgs = { before: beforeCursor, last: perPage };
    } else {
      queryArgs = { first: perPage };
    }

    console.log("Page:", page);
    console.log("PerPage:", perPage);
    console.log("AfterCursor:", afterCursor);
    console.log("BeforeCursor:", beforeCursor);
    console.log("Query Arguments:", queryArgs);

    const resPost = await WP(
      `query GetPosts($after: String, $first: Int, $last: Int, $before: String) {
        posts(after: $after, first: $first, last: $last, before: $before) {
          edges {
            node {
              id
              title
              content
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
              slug
              PostInfo {
                subtitle
              }
            }
            cursor
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }`,
      queryArgs
    );

    if (!resPost?.data) {
      throw new Error("Could not fetch posts");
    }

    return {
      posts: resPost?.data?.posts?.edges?.map(
        (edge: { node: any }) => edge.node
      ),
      pageInfo: resPost?.data?.posts?.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
