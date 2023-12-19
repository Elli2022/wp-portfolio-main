//src/pages/queries/getPages2.tsx
import gql from 'graphql-tag';



export const PagesQuery = gql`
  query GetPages($after: String, $before: String, $first: Int, $last: Int) {
    pages(after: $after, before: $before, first: $first, last: $last) {
      edges {
        node {
          id
          title
          content
          excerpt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
