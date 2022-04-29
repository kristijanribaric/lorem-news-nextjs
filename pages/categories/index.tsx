import prisma from '../../db';
import CategorySelector from '../../components/CategorySelector';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';

const Categories = ({initialCategories}) => {
  const [count, setCount] = useState(5)
  const [categories, setCategories] = useState(initialCategories.slice(0,count))
  
  useEffect(() => {
    setCategories(initialCategories.slice(0,count));
  },[count]);
  return (
    <Layout>
      
      <h1 className='text-2xl'>Categories</h1>
      {initialCategories && categories.map(category => <CategorySelector key={category.id} categoryName={category.name}/> )}
      
      {categories.length !== initialCategories.length && <a className='text-gray-700 cursor-pointer hover:font-medium' onClick={() => setCount(count + 4)}>Load more...</a>}
        
    </Layout>
  )
}

export default Categories; 

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({});
  return {
      props: {
        initialCategories : categories
      }
  }
}``