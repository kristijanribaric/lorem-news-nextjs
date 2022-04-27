import Head from 'next/head'
import Image from 'next/image'
import Article from '../../components/Article'
import { Prisma} from '@prisma/client'
import  prisma  from '../../db'
import Layout from '../../components/Layout'
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router'





export default function Myarticles({initialArticles,url}) {
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
    
    return (
        <Layout>
        <div className='w-full lg:w-2/3 px-4 m-auto'>
            <div className='grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {initialArticles.map(article => <Article key={article.id} articleData={article} isEditable={true} url={url} refresher={refreshData}/>)}
            </div>
            
        </div>
        </Layout>
    )
}




export async function getServerSideProps({ req, res }) {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return {
            redirect: {
              destination: '/signin',
              permanent: false,
            },
        };
    }

    const articles = await prisma.articles.findMany({
        where: {
            author: { email: session.user.email },
        },
       
        select: {
            id: true,
            image: true,
            short: true,
            title: true,
            publishedDate: true,
            author: {
                select: {
                    name: true,
                    image: true
                }
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
    });
    return {
        props: {
            initialArticles : JSON.parse(JSON.stringify(articles)),
            url : process.env.URL
        }
    }
}