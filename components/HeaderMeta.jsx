import Head from "next/head"

const HeaderMeta = ({title,description}) => {
  return (
    <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={description} />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <title>{title}</title>
    </Head>
  )
}


HeaderMeta.defaultProps = {
    title: 'Lorem News',
    description: 'Lorem News - Your daily source of unbiased news',
  }

export default HeaderMeta