import Navbar from "./Navbar"
import HeaderMeta from "./HeaderMeta"
import { useSession } from 'next-auth/react';


const LayoutMain = ({children}) => {
  const { data: session, status } = useSession();
  return (
    <>
      <HeaderMeta/>
        <Navbar/>
       
        <div className="mt-24 md:mt-36" >
            <main>
                {children}
            </main>
        </div>
    </>
  )
}

export default LayoutMain