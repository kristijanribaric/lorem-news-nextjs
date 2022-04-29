import Image from "next/image"
import Link from "next/link"
import { BsGithub } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='border-t-2 md:grid md:grid-cols-3 w-[95%]  m-auto'>
        <div className="flex items-center justify-center my-4">
        <Image src='/news_logo_red.png' alt='lorem news logo' width={60} height={60}/>
        <h2 className="text-3xl font-semibold ml-4">Lorem <span className=" font-semibold">News</span></h2>
        </div>
        <div className="flex justify-center gap-8 text-gray-500 my-4  items-center">
            <Link passHref href="/"><a className="hover:text-gray-300">Contact</a></Link>
            <Link passHref href="/"><a className="hover:text-gray-300">About</a></Link>
            <Link passHref href="/"><a className="hover:text-gray-300">My page</a></Link>
        </div>
        <div className="flex justify-center my-4 items-center">
            <a  target="_blank"  rel="noopener noreferrer" href="https://github.com/kristijanribaric/lorem-news-nextjs" className="text-3xl hover:bg-gray-500"><BsGithub /></a>
        </div>
    </div>
  )
}

export default Footer