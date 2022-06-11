import Head from 'next/head'
import Image from 'next/image'
import Article from '../components/Article'
import  prisma  from '../db'
import Layout from '../components/Layout'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';





export default function Home({initialArticles,url}) {
  // const hotTopics = initialArticles[Math.floor(Math.random() * initialArticles.length)]
  // const hotTopics = initialArticles[4];
  return (
    <Layout>
      <div>
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
        {/* <div className='flex'>
        <Carousel 
         autoPlay={true}
         axis="vertical"
         infiniteLoop={true}
         showArrows={false}
         showStatus={false}
         interval={6000}
         showThumbs={false}
         transitionTime={800}
         className="mb-6 hidden md:block"
        
         
         
         >
                <div>
                    <Image src={initialArticles[0].image} alt={initialArticles[0].image.split('/').at(-1)} layout="responsive" width={640}  height={320}/>
                    <p className="legend">{initialArticles[0].title}</p>
                </div>
                <div>
                <Image src={initialArticles[1].image} alt={initialArticles[1].image.split('/').at(-1)} layout="responsive" width={640}  height={320}/>
                    <p className="legend">{initialArticles[1].title}</p>
                </div>
                <div>
                <Image src={initialArticles[2].image} alt={initialArticles[2].image.split('/').at(-1)}  layout="responsive" width={640}  height={180}/>
                    <p className="legend">{initialArticles[2].title}</p>
                </div>
            </Carousel>
            <p className='px-3'>{initialArticles[0].short}</p>
        </div> */}
        

        <div className='grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {initialArticles.map(article => {
          article.publishedDate = article.publishedDate.toString();
        return <Article key={article.id} articleData={article} isEditable={false} url={url} />})}
        </div>
        
      </div>
    </Layout>
  )
}




export async function getServerSideProps() {
  const articles = await prisma.articles.findMany({
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
          url: process.env.URL
      }
  }
}