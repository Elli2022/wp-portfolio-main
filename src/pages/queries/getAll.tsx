//src/pages/queries/getAll.tsx
import WP from "../api/wp";

export default async function getAll(uri:string){
    try {
        const res = await WP(`
        query getAll {
            page(id: "/all", idType: URI) {
              content
              id
              allPage {
                allPageTitle
                fieldGroupName
                orkarInteMer
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