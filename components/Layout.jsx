import Navbar from "./Navbar"
import HeaderMeta from "./HeaderMeta"

const Layout = ({children}) => {
  return (
      <>
      <HeaderMeta/>
        <Navbar/>
        <div className="mt-28">
            <main>
                {children}
            </main>
        </div>
      </>
    
  )
}

export default Layout