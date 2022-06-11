import React from 'react'
import HeaderMeta from '../../components/HeaderMeta'
import Layout from '../../components/Layout'
import { BsGithub } from 'react-icons/bs'
import Link from 'next/link'
import { Button } from '@mantine/core'

const About = () => {
  return (
    <Layout>
      <div className='w-2/3 m-auto text-center'>
        <HeaderMeta title="About Lorem News | Lorem News" />
        <h1 className='text-2xl text-center'>About Lorem News</h1>
        <p className='w-full lg:w-2/3 m-auto mt-10 text-center uppercase text-gray-300 text-5xl md:text-8xl mb-8'>Coming soon!</p>
        <Button className='bg-gray-800 hover:bg-gray-500'  component='a' href="https://github.com/kristijanribaric/lorem-news-nextjs" target="_blank"  rel="noopener noreferrer" leftIcon={<BsGithub/>}>Source Code</Button>

      </div>
    </Layout>
  )
}

export default About