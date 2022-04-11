import Link from 'next/link'
import Image from 'next/image'


const Article = ({id,title,image,author}) => {
  return (
    <Link href='/article/[id]' as={`/article/${id}`} passHref>
        <div className='cursor-pointer'>
        <Image src={image} alt={title} placeholder="blur" layout="responsive" width={170} height={100} sizes="50vw"/>
        <h1 className='font-bold text-xl'>{title}</h1>
        <p className='font-thin text-gray-600'>{author}</p>
        </div>
        
    </Link>
  )
}

export default Article