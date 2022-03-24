import '../styles/globals.css'
import Layout from '../components/Layout'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import HeaderMeta from '../components/HeaderMeta'
import LayoutMain from '../components/LayoutMain'


function MyApp({ Component, pageProps }) {
  return (
   <LayoutMain>
      <AnimatePresence
                  exitBeforeEnter
                  initial={false}
                  onExitComplete={() => window.scrollTo(0, 0)}
              >
                  <Component {...pageProps}/>
      </AnimatePresence>
    </LayoutMain>
  

  
  
)}

export default MyApp
