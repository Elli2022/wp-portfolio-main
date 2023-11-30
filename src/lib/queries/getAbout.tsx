import WP from "../wp";

export default async function getAbout(uri:string){
    try {
        const res = await WP(`
        query getAbout($uri: ID!){
            page(id: $uri, idType: URI) {
              content
              GQL_content {
                blocks {
                    ... on Page_GqlContent_Blocks_Text {
                      textField
                    }
                    ... on Page_GqlContent_Blocks_PortfolioTitle {
                      portfolioTitleField
                    }
                    ... on Page_GqlContent_Blocks_Gallery {
                      galleryField {
                        image {
                          sourceUrl
                        }
                        description
                      }
                    }
                    }
                  }
                }
              }
            }
          }
        `, {uri})

        if(!res?.data){
            throw `error couldn't fetch api`;
        }
        const data = res?.data?.page
        return data
    } catch (error) {
        console.error(error)
    }
}