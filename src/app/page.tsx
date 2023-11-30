import getAbout from '@/lib/queries/getAbout';
import getHome from '@/lib/queries/getHome'
import Image from 'next/image'


export default async function Home() {
  const data = await getHome("/home")
  console.log("data==>",data?.content);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>{data?.text}</p>
        <h1>{data?.homePageTitle.homePageTitle}</h1>
        <p>{data?.content}</p>
       
      </div>
    </main>
  )
}
