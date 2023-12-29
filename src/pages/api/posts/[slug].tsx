// pages/api/posts/[slug].tsx

import getPosts from "@/pages/queries/getPosts";

export default async function handler(
  req: { query: { slug: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error: string }): void; new (): any };
    };
  }
) {
  const { slug } = req.query;
  const { posts } = await getPosts();

  const post = posts.find((p: { slug: any }) => p.slug === slug);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
}
