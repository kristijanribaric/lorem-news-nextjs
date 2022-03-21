import React from 'react'
import HeaderMeta from '../../components/HeaderMeta'

const About = () => {
  return (
    <div className='w-2/3 m-auto'>
        <HeaderMeta title="About Lorem News | Lorem News" />
        <h1 className='text-2xl text-center'>About Lorem News</h1>
        <p className='w-full lg:w-2/3 m-auto mt-10'>Lorem News is a personal project site which main goal is to be an unbiased news site where relevant articles are decided by the ratio of upvotes and downvotes. This way users prove the legitimacy of an article. </p>
    </div>
  )
}

export default About