import '../styles/globals.css'
import Layout from '../components/Layout'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import HeaderMeta from '../components/HeaderMeta'
import LayoutMain from '../components/LayoutMain'
import { SessionProvider } from 'next-auth/react';


function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <LayoutMain>
        <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                    onExitComplete={() => window.scrollTo(0, 0)}
                >
                    <Component {...pageProps}/>
        </AnimatePresence>
      </LayoutMain>
    </SessionProvider>
  

  
  
)}

export default MyApp
