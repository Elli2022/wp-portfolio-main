//src/pages/queries/getPost.tsx

const apiKey = process.env.wordpressApiKey;

async function getPost(slug: any) {
  console.log("getPost called with slug:", slug);  // Loggar vilken slug som används

  const query = `
    query getPost($id: ID = "") {
      post(id: $id, idType: URI) {
        PostInfo {
          branding
          subtitle
          projectintrotext
          projectdescription
          clientheading
          date
          client
        }
        content
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
        variables: { id: slug },  // Använder slug som ID
      }),
    });

    const data = await response.json();

    console.log("GraphQL query response:", data);  // Loggar hela svaret från GraphQL

    if (data.errors) {
      console.error("GraphQL query errors:", data.errors);  // Loggar eventuella fel från GraphQL-svaret
    }

    if (data.data) {
      console.log("Fetched post data:", data.data.post);  // Loggar den hämtade postdata
    }

    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default getPost;
