import { useRouter } from "next/router"
import Link from "next/link"
import HeaderMeta from "../../../components/HeaderMeta"
import Image from 'next/image'
import prisma from '../../../db'
import Layout from "../../../components/Layout"
import { Loader } from '@mantine/core';

interface Author {
  name: string,
  email: string
}

interface Category {
  name: string
}

interface Article {
  id: string,
  title: string,
  short: string,
  long: string,
  categoryId: number,
  image?: string,
  authorId: string,
  publishedDate: string,
  author: Author,
  category: Category
}



const ArticleS = ({ initialArticle  = null } ) => {
    const router = useRouter()
    const {id} = router.query
  return (
    <Layout>
      <div className="mt-10">
          <HeaderMeta title={`${initialArticle?.title ?? " loading"} | Lorem News`} />
          <div className="w-2/3 lg:w-3/5 m-auto">
          {initialArticle?.image ? <Image src={initialArticle.image} alt={initialArticle.title} placeholder="blur" blurDataURL={initialArticle.image} layout="responsive" width={170} height={100} sizes="50vw"/> : <Loader color="red" size="lg" variant="bars" />}
          </div>
          <p className="font-thin text-gray-500">Author: {initialArticle?.author.name ?? " "}</p>
          {initialArticle?.categories.map(categories => <p className="bg-blue-600 text-white rounded-lg inline-block p-2 mx-2" key={categories.category.id}>{categories.category.name}</p>)}
          <p className="font-thin text-gray-500 text-right">{new Date(initialArticle?.publishedDate).toLocaleDateString("hr-HR") ?? " "}</p>
          <h1 className="font-bold text-center text-2xl">{initialArticle?.title ?? " "}</h1>
         
          <p className="w-2/3 mt-6 m-auto whitespace-pre-line">{initialArticle?.long ?? " "}</p>
          <Link href="/"> Go Back</Link>
      </div>
    </Layout>
  )
}


export const getStaticProps = async (context) => {
  const initialArticle = await prisma.articles.findUnique({
    where: {
      id: context.params.id,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
      categories: {
        select: { category : {
          select: {
            id: true,
            name: true
          }
        }},
      },
    }
  })
  if (initialArticle) {
    const ArticleParsed = JSON.parse(JSON.stringify({initialArticle}));
    return {
      props :   ArticleParsed
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}

export const getStaticPaths = async () => {
  const articles = await prisma.articles.findMany()
  
  const ids = articles.map(article => article.id)
  const paths = ids.map(id => ({params: {id: id.toString()}}))
  
  return {
      paths,
      fallback : true
  }

}




export default ArticleS 