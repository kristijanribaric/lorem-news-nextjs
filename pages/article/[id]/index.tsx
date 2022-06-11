import { useRouter } from "next/router"
import Link from "next/link"
import HeaderMeta from "../../../components/HeaderMeta"
import Image from 'next/image'
import prisma from '../../../db'
import Layout from "../../../components/Layout"
import { Loader, Button, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { BsClock, BsClipboardCheck } from 'react-icons/bs'
import { BiShareAlt } from 'react-icons/bi'

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



const Articles = ({ article, url  } ) => {
    const router = useRouter();
    const clipboard = useClipboard();
  return (
    <Layout>
      <div className="w-full px-5 m-auto lg:w-2/3 ">
          <HeaderMeta title={`${article?.initialArticle?.title ?? " loading"} | Lorem News`} />
          <h1 className="font-semibold  text-4xl md:text-6xl">{article?.initialArticle?.title ?? " "}</h1>
          <p className="font-semibold  mt-5">By {article?.initialArticle?.author?.name ?? " "}</p>
          <p className="font-thin  flex items-center ju gap-2"><BsClock/>{new Date(article?.initialArticle?.publishedDate).toLocaleDateString("hr-HR") ?? " "}</p>
          <div className="mt-3 flex">
            <Tooltip
              label={<div className='flex items-center space-x-2 p-1'><BsClipboardCheck className='text-lg'/><p>Copied article link!</p> </div>}
              gutter={5}
              placement="center"
              position="bottom"
              radius="md"
              transition="slide-down"
              transitionDuration={200}
              opened={clipboard.copied}
            >
              <Button className="text-black text-3xl p-1 hover:bg-black/20 mr-4"  onClick={() => clipboard.copy(`${url}/article/${article.initialArticle.id}`)}>
                <BiShareAlt  />
              </Button>
            </Tooltip>
            {article?.initialArticle?.categories?.map(categories => <p className=" bg-gradient-to-tr from-black/30 to-white/40  font-semibold rounded-lg inline-block p-2 mx-2" key={categories.category.id}>{categories.category.name}</p>)}
          </div>
          <div className=" mt-4 ">
            <div className=" mb-5  h-[1px] bg-black"/>
            {article?.initialArticle?.image ? <Image src={article.initialArticle.image} alt={article.initialArticle.title} layout="responsive" width={170} height={100} /> : <Loader color="red" size="lg" variant="bars" />}
          </div>
          
         
          
          
          <p className=" mt-6  font-semibold whitespace-pre-line">{article?.initialArticle?.short ?? " "}</p>
          <p className=" mt-6  whitespace-pre-line">{article?.initialArticle?.long ?? " "}</p>
           
           <Link href="/"><Button className="bg-black hover:bg-red-600 text-white  transition-all mt-5">&larr; Go Back</Button></Link>
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
    return {
      props :   {
          article : JSON.parse(JSON.stringify({initialArticle})),
          url : process.env.URL
        }
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




export default Articles