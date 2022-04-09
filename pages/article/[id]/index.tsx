import { useRouter } from "next/router"
import Link from "next/link"
import HeaderMeta from "../../../components/HeaderMeta"
import Image from 'next/image'
import prisma from '../../../db'
import Layout from "../../../components/Layout"




const ArticleS = ({initialArticle}) => {
    const router = useRouter()
    const {id} = router.query
  return (
    <Layout>
      <div className="mt-10">
          <HeaderMeta title={`${initialArticle.title} | Lorem News`} />
          <div className="w-2/3 lg:w-3/5 m-auto">
          <Image src={`/imgs/${initialArticle.image}`} alt={initialArticle.image} placeholder="blur" layout="responsive" width={170} height={100} sizes="50vw"  blurDataURL={`/imgs/${initialArticle.image}`} />
          </div>
          <p className="font-thin text-gray-500">Author: {initialArticle.author.name}</p>
          <h1 className="font-bold text-center text-2xl">{initialArticle.title}</h1>
         
          <p className="w-2/3 mt-6 m-auto whitespace-pre-line">{initialArticle.long}</p>
          <Link href="/"> Go Back</Link>
      </div>
    </Layout>
  )
}


// export const getStaticProps = async (context) => {
//   const initialArticle = await prisma.articles.findUnique({
//     where: {
//       id: context.params.id,
//     },
//     include: {
//       author: {
//         select: { name: true, email: true },
//       },
//     }
//   })
//   return {
//     props : { initialArticle }
//   }
// }

// export const getStaticPaths = async () => {
//   const articles = await prisma.articles.findMany()
  
//   const ids = articles.map(article => article.id)
//   const paths = ids.map(id => ({params: {id: id.toString()}}))
//   return {
//       paths,
//       fallback : false
//   }

// }


export async function getServerSideProps({ params }) {
  const article = await prisma.articles.findUnique({
    where: {
      id: params?.id,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
      props: {
          initialArticle : article
      }
  }
}


export default ArticleS