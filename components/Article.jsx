import Link from 'next/link'
import Image from 'next/image'


const Article = ({id,title,image,author}) => {
  return (
    <Link href='/article/[id]' as={`/article/${id}`}>
        <div className='cursor-pointer'>
        <Image src={`/imgs/${image}`} alt={image} placeholder="blur" layout="responsive" width={170} height={100} sizes="50vw"  blurDataURL={`/imgs/${image}`} />
        <h1 className='font-bold text-xl'>{title}</h1>
        <p className='font-thin text-gray-600'>{author}</p>
        </div>
        
    </Link>
  )
}

export default Article