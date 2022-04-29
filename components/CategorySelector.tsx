import Link from "next/link"
import { BsChevronDoubleRight } from 'react-icons/bs'

const CategorySelector = ({categoryName}) => {
  return (
    <div className='border-t-2'>
        <Link passHref href={`/categories/${categoryName}`}><a className="flex items-center hover:font-semibold group transition-all py-2 duration-200">{categoryName} <BsChevronDoubleRight className=" ml-2 group-hover:ml-6 duration-500"/></a></Link>
    </div>
  )
}

export default CategorySelector