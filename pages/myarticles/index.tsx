import Head from 'next/head'
import Image from 'next/image'
import Article from '../../components/Article'
import { Prisma} from '@prisma/client'
import  prisma  from '../../db'
import Layout from '../../components/Layout'
import { useSession, getSession } from 'next-auth/react';



export default function Myarticles({initialArticles}) {
    const { data: session , status } = useSession();
    return (
        <Layout>
        <div className='w-2/3 m-auto'>
            <div className='grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {initialArticles.map(article => <Article key={article.id} id={article.id} title={article.title} image={article.image} author={article.author.name} />)}
            </div>
            
            
        </div>
        </Layout>
    )
}




export async function getServerSideProps({ req, res }) {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { initialArticles: [] } };
    }

    const articles = await prisma.articles.findMany({
        where: {
            author: { email: session.user.email },
        },
        include: {
            author: {
              select: { name: true },
            },
        },
    });
    console.log(articles)
    return {
        props: {
            initialArticles : articles
        }
    }
}