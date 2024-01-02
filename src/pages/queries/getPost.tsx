// getPost.tsx
const apiKey = process.env.wordpressApiKey;

async function getPost(slug: string) {
  const query = `
    query GetPostBySlug($slug: String!) {
      postBy(slug: $slug) {
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
      }
    }
  `;

  try {
    const response = await fetch(`${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default getPost;
