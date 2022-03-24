import Head from 'next/head'
import Image from 'next/image'
import Article from '../components/Article'
import { Prisma} from '@prisma/client'
import  prisma  from '../db'
import Layout from '../components/Layout'


export default function Home({initialArticles}) {
  return (
    <Layout>
      <div className='w-2/3 m-auto'>
        <div className='grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {initialArticles.map(article => <Article key={article.id} id={article.id} title={article.title} image={article.image} />)}
        </div>
        
        
      </div>
    </Layout>
  )
}



// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/articles`)
//   const initialArticles = await res.json()

//   return {
//     props: {
//       initialArticles,
//     },
//   }
// }

export async function getServerSideProps() {
  const articles = await prisma.articles.findMany();
  return {
      props: {
          initialArticles : articles
      }
  }
}