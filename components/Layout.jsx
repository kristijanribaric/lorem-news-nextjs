import Navbar from "./Navbar"
import HeaderMeta from "./HeaderMeta"

const Layout = ({children}) => {
  return (
      <>
      <HeaderMeta/>
        <Navbar/>
        <div className="mt-8">
            <main>
                {children}
            </main>
        </div>
      </>
    
  )
}

export default Layout