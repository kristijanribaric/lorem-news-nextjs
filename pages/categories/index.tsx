import prisma from '../../db';
import CategorySelector from '../../components/CategorySelector';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';

const Categories = ({initialCategories}) => {
  // const [count, setCount] = useState(5);
  const [categories, setCategories] = useState(initialCategories);
  const [inputText, setInputText] = useState("");

  const inputHandler = (e) => {
    //convert input text to lower case
    // var lowerCase = e.target.value.toLowerCase();
    setInputText(e.target.value);
  };

  const fetchCategory = async () => {
    const response = await fetch('/api/searchCategory', {
      method: 'POST',
      body: JSON.stringify(inputText)
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const recievedCategory = await response.json();
    setCategories(recievedCategory)
  }
  
  // useEffect(() => {
  //   setCategories(initialCategories.slice(0,count));
  // },[count]);

  useEffect(() => {
    fetchCategory()
  },[inputText]);

  return (
    <Layout>
      
      <h1 className='text-2xl'>Categories</h1>
      
        <div className='flex flex-col my-5'>
          <label className='font-semibold'>Search Categories</label>
          <input type="text"  className='border-2 border-black rounded-lg p-2' name="searchCategory" id="searchCategory" onChange={inputHandler}/>
        </div>
      {initialCategories && categories.map(category => <CategorySelector key={category.id} categoryName={category.name}/> )}
      {categories.length === 0 && <p className='text-gray-600'>No categories meet the criteria.</p>}
      {/* {categories.length !== initialCategories.length && <a className='text-gray-700 cursor-pointer hover:font-medium' onClick={() => setCount(count + 4)}>Load more...</a>} */}
        
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