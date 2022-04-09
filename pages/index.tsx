import Head from 'next/head'
import Image from 'next/image'
import Article from '../components/Article'
import  prisma  from '../db'
import Layout from '../components/Layout'




export default function Home({initialArticles}) {
  // const hotTopics = initialArticles[Math.floor(Math.random() * initialArticles.length)]
  // const hotTopics = initialArticles[4];
  return (
    <Layout>
      <div className='w-2/3 m-auto'>
        {/* <div className='relative mb-12'>
          <h1>Hot Topics</h1>
          <div>
            <div className='bg-gradient-to-tr from-black via-black to-black/60' >
            <Image className='opacity-40' src={`/imgs/${hotTopics.image}`} alt={hotTopics.image} placeholder="blur" layout="responsive" width={170} height={100} sizes="50vw"  blurDataURL={`/imgs/${hotTopics.image}`} />
            <h2 className='absolute z-10 text-white text-4xl bottom-32 w-2/3'>{hotTopics.title}</h2>
            <p className='absolute z-10 text-white bottom-10 font-thin opacity-80 w-1/3'>{hotTopics.author.name}</p>
            </div>
          </div>
        </div> */}
        <div className='grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {initialArticles.map(article => <Article key={article.id} id={article.id} title={article.title} image={article.image} author={article.author.name} />)}
        </div>
        
        
      </div>
    </Layout>
  )
}




export async function getServerSideProps() {
  const articles = await prisma.articles.findMany({
    include: {
      author: {
        select: { name: true },
      },
  }});
  return {
      props: {
          initialArticles : articles
      }
  }
}