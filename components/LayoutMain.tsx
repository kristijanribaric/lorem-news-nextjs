import Navbar from "./Navbar"
import Footer from "./Footer";
import HeaderMeta from "./HeaderMeta"
import { useSession } from 'next-auth/react';


const LayoutMain = ({children}) => {
  const { data: session, status } = useSession();
  return (
    <>
      <HeaderMeta/>
        <Navbar/>
       
        <div className="mt-28 md:mt-44 mb-28 md:mb-44" >
            <main>
                {children}
            </main>
        </div>
      <Footer/>
    </>
  )
}

export default LayoutMain