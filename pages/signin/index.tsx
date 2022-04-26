import { getSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs'
import { Divider } from '@mantine/core';
import { Button } from '@mantine/core';
import { Notification } from '@mantine/core';
import { signIn } from 'next-auth/react';

export default function SignIn() {
    const signInWithGoogle = () => {
        <Notification
        loading
        disallowClose
      >
        Redirecting...
      </Notification>
        signIn('google', {
          callbackUrl: "/",
        });
    };

    const signInWithGithub = () => {
        <Notification
        loading
        disallowClose
      >
        Redirecting...
      </Notification>
        signIn('github', {
          callbackUrl: "/",
        });
    };
  return (
    <Layout>
        <div className='w-3/4 md:w-1/2 lg:w-1/3  m-auto my-32 shadow-xl text-center py-8 px-6 rounded-lg'>
            <h1>Welcome to Lorem <span className='text-red-600'>News</span></h1>
            <h2 className='mb-6'>Please login with </h2>
            <Button variant='default' leftIcon={<FcGoogle/>} className="rounded-full px-12" onClick={()=> signInWithGoogle()}>Google</Button>
            <Divider label="Or with" labelPosition='center' className='my-8'/>
            <Button variant='default' leftIcon={<BsGithub/>} className="rounded-full px-12" onClick={()=> signInWithGithub()}>Github</Button>
        </div>
    </Layout>
  )
}

export async function getServerSideProps({req, res}) {
    const session = await getSession({ req });
  
    if (session) {
        res.statusCode = 302;
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  
    return {
      props: {},
    };
  }
