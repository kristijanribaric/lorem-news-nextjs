import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/react';
import UploadForm from '../../components/UploadForm';
import prisma from '../../db';


export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        },
      };
    }

    const categories = await prisma.category.findMany();
    return {
        props: {
            initialCategories : categories
        }
    }
  
    
}


const Upload = ({initialCategories}) => {
   

    const addArticle = async data => {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify(data)
          });
        
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return await response.json();

    }
  return (
      <Layout>
          <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Article upload</h1>
        <p className="text-gray-500">
          Fill out the form below to add a new article.
        </p>
        <div className="mt-8">
          <UploadForm
            buttonText="Add article"
            redirectPath="/"
            onSubmit={addArticle}
            initialValues = {null}
            initialCategories = {initialCategories.map(categories => categories.name)}
          />

         

          
        </div>
      </div>
      </Layout>
  )
}

export default Upload