# WordPress Portfolio

`wordpress-portfolio` is a Next.js and TypeScript portfolio site that pulls content from a WordPress GraphQL endpoint.

The project renders editorial content for the main pages, shows portfolio work in a paginated project grid, and builds individual project pages from WordPress slugs. This repository is also the cleaned-up home for the full development history that previously lived across many separate GitHub repositories.

## What The Project Does

- Fetches page content such as home, about, and contact from WordPress
- Renders portfolio posts with featured images and project subtitles
- Supports cursor-based pagination for the project listing
- Generates project detail pages from WordPress slugs
- Keeps the older repo-by-repo evolution preserved as snapshot tags

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- WordPress GraphQL API
- Tailwind CSS

## Main Areas

- `src/app/page.tsx` renders the landing page and paginated portfolio listing
- `src/app/projects/[slugs]/page.tsx` renders an individual project page from its slug
- `src/pages/queries/` contains the GraphQL query helpers for pages, posts, and single-project data
- `src/pages/api/wp.tsx` is the shared WordPress request layer

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app runs locally at `http://localhost:3000`.

## Environment

Create a local environment file and define the WordPress GraphQL endpoint:

```bash
wordpressApiKey=https://your-wordpress-graphql-endpoint
```

## Repository History

This repository was consolidated from many earlier `wp-portfolio-...` repositories so the project can now live in one place with a single `main` branch and chronological snapshot tags.

`main` represents the latest consolidated state. The historical milestones are preserved as tags rather than separate repositories.

<details>
<summary>Snapshot timeline</summary>

- `snapshot/2023-11-30-main`
- `snapshot/2023-11-30-rendering-ok`
- `snapshot/2023-11-30-rendering-ok-explore-works-button`
- `snapshot/2023-12-01-begun-on-navbar`
- `snapshot/2023-12-01-serverside-rendering-works`
- `snapshot/2023-12-01-navbar-navigation-works-Home-and-About`
- `snapshot/2023-12-03-navbar-navigation-works-Home-and-About-test-for-gallery`
- `snapshot/2023-12-04-two-gallery-sections-at-once-on-front-page`
- `snapshot/2023-12-11-navbar-navigation-works-Home-and-About-test-for-gallery-main-3`
- `snapshot/2023-12-12-test-with-new-gallery`
- `snapshot/2023-12-12-test-with-new-gallery-master`
- `snapshot/2023-12-13-test-with-new-gallery-and-pagination`
- `snapshot/2023-12-17-lets-talk-now-button`
- `snapshot/2023-12-18-test-with-bootstrap-and-all-links-and-border-on-pagination-buttons`
- `snapshot/2023-12-18-test-with-bootstrap-and-all-links-and-border-on-pagination-buttons-main`
- `snapshot/2023-12-19-test-graphQL-posts`
- `snapshot/2023-12-19-test-graphQL-posts-query-works`
- `snapshot/2023-12-20-test-graphQL-posts-first-6-works`
- `snapshot/2023-12-20-test-graphQL-posts-all-posts-page-1-per-page-6-before`
- `snapshot/2023-12-20-test-graphQL-posts-6-posts-nothing-on-2nd-page`
- `snapshot/2023-12-21-server-side-pagination-works`
- `snapshot/2023-12-21-server-side-pagination-works-fixed-url-on-page-1`
- `snapshot/2023-12-21-trying-fix-slugs`
- `snapshot/2023-12-22-adding-new-posts-works`
- `snapshot/2023-12-22-fixed-navbar`
- `snapshot/2023-12-22-fixed-navbar-again`
- `snapshot/2023-12-22-fixed-pagination-forward-and-backwards`
- `snapshot/2023-12-29-slug-works-for-each-project`
- `snapshot/2023-12-30-fetched-data-posts-by-slug`
- `snapshot/2023-12-31-rendering-ok-for-each-projects`
- `snapshot/2024-01-02-seperated-query-for-getting-posts`
- `snapshot/2024-01-02-navigation-links-on-project-page`
- `snapshot/2024-01-02-generateStaticParams-Navlinks-onProjects`
- `snapshot/2024-01-02-getPost-and-more-info-about-each-project`
- `snapshot/2024-01-03-works-now-with-each-slug-and-info-for-each-project`

</details>
