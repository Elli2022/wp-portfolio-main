//src/pages/queries/getAbout.tsx
import WP from "../api/wp";

export default async function getAbout(uri:string){
    try {
        const res = await WP(`
        query getAbout($uri: ID!){
            page(id: $uri, idType: URI) {
              id
              aboutPage {
                fieldGroupName
                aboutPageTitle
              }
              content
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