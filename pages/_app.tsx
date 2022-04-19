import '../styles/globals.css'
import Layout from '../components/Layout'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import HeaderMeta from '../components/HeaderMeta'
import LayoutMain from '../components/LayoutMain'
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
         
        }}
      ><NotificationsProvider  position="top-center">
          <LayoutMain>
            <AnimatePresence
                        exitBeforeEnter
                        initial={false}
                        onExitComplete={() => window.scrollTo(0, 0)}
                    >
                        <Component {...pageProps}/>
            </AnimatePresence>
          </LayoutMain>
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>

    <Toaster />
    </>
    
  

  
  
)}

export default MyApp
