import Navbar from "./Navbar"
import HeaderMeta from "./HeaderMeta"


const LayoutMain = ({children}) => {
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

export default LayoutMain