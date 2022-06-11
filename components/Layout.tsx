import Navbar from "./Navbar"
import HeaderMeta from "./HeaderMeta"
import { motion } from 'framer-motion'

const slideIn = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const rollIn = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { translateX:["-1000px","0px"], rotate:["-720deg","0deg"], opacity: [0,1], blur: ["50px","0px"] },
  exit: {translateX:["0px","-1000px"], rotate:["0deg","-720deg"], opacity: [1,0], blur: ["px","50px"]  },
}

const swingIn = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { rotateX:["-100deg","0deg"], originY: ["top","top"], opacity: [0,1]},
  exit: {rotateX:["0deg","-100deg"], originY: ["top","top"], opacity: [1,0]  },
}

const slideInSec = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { translateZ:["-1400px","0px"],opacity: [0,1] },
  exit: { translateZ:["0px","-1400px"],opacity: [1,0]  },
}

const Layout = ({children}) => {
  return (
      <>
      <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={slideInSec}
            transition={{ type: 'linear' }}
            className="w-full lg:w-3/5 px-4 m-auto"
        >
            {children}
        </motion.main>
      </>
    
  )
}

export default Layout