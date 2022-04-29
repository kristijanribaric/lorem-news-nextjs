import Head from 'next/head'
import Image from 'next/image'
import Article from '../../../components/Article'
import { Prisma} from '@prisma/client'
import prisma from '../../../db'
import Layout from '../../../components/Layout'


export default function SelectedCategory({initialArticles,url}) {
  
    return (
        <Layout>
        <div>
            <div className='grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {initialArticles.articles.map(articles => <Article key={articles.article.id} articleData={articles.article} isEditable={false} url={url}/>)}
            </div>
            
        </div>
        </Layout>
    )
}




export async function getServerSideProps(context) {

    const articles = await prisma.category.findUnique({
        where: {
           name : context.params.name
        },
        include: {
          articles: {
            select: {
              article: { 
                select: {
                  id: true,
                  title: true,
                  short: true, 
                  long: true, 
                  categories: {
                    select: { category : {
                      select: {
                        id: true,
                        name: true
                      }
                    }},
                  },
                  image: true,
                  author: {
                    select: { 
                      name: true, 
                      image: true
                    },
                  },
                  publishedDate: true
              }
                

              }
            }
          }
        }
       
       
    });
    return {
        props: {
            initialArticles : JSON.parse(JSON.stringify(articles)),
            url : process.env.URL
        }
    }
}