import { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/react';
import Image from 'next/image'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import UploadForm from '../../components/UploadForm';


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
  
    return {
      props: {},
    };
}


const Upload = () => {
   

    const addArticle = async data => {
        // axios.post('/api/upload', data);
        console.log(data);
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
            buttonText="Add home"
            redirectPath="/"
            onSubmit={addArticle}
            initialValues = {null}
          />

         

          
        </div>
      </div>
      </Layout>
  )
}

export default Upload