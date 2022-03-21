import React, { useState} from 'react'
import Link from 'next/link'
import { Transition } from "@headlessui/react";
import Burger from '@animated-burgers/burger-squeeze'
import '@animated-burgers/burger-squeeze/dist/styles.css'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
  return (
    <div>
			<nav className=" shadow-sm fixed top-0 w-full z-10  text-white">
				<div className="w-full">
					<div className="flex items-center h-20 w-full bg-black">
						<div className="flex items-center  mx-20  justify-between w-full">
							<div className="flex justify-center items-center flex-shrink-0 ">
								<Image src='/news_logo_red.png' alt='lorem news logo' width={64} height={64}/>
								<h1 className=" ml-4 font-bold text-xl cursor-pointer">
									Lorem <span className="text-red-700">News</span>
								</h1>
							</div>
							<div className="hidden md:block">
								<div className="ml-10 flex items-baseline space-x-4">
									<Link
										
										href="/"
										className="cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black"
									>
										Home
									</Link>
									<Link
										href="/about"
										className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
									>
										About
									</Link>
									<Link
										href="/upload"
										className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
									>
										Upload
									</Link>
								</div>
							</div>
						</div>
						<div className="mr-10 flex md:hidden ">
						<button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className=""
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{!isOpen ? (
									<Burger />
								) : (
									<Burger isOpen={ true } />
								)}
							</button>
						</div>
					</div>
				</div>

				<Transition
					show={isOpen}
					enter="transition ease-out duration-300 transform"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="transition ease-in duration-200 transform"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					{(ref) => (
						<div className="md:hidden " id="mobile-menu">
							<div
								ref={ref}
								className="px-2 pt-10 space-y-4 sm:px-3 bg-black grid grid-cols-1  "
							>
								<Link
									href="/"
									
								>	
								<div className={router.pathname == "/" ? styles.active : styles.btn}>
										<span className=" ">Home</span>
										<em></em>
								</div>
									
								</Link>
								<Link
									href="/about"
									
								>
									<div className={router.pathname == "/about" ? styles.active : styles.btn}>
										<span className=" ">About</span>
										<em></em>
								</div>
								</Link>

								<Link
									href="/upload"
									
								>
									<div className={router.pathname == "/upload" ? styles.active : styles.btn}>
										<span className=" ">Upload</span>
										<em></em>
								</div>
								</Link>
								
							</div>
						</div>
					)}
				</Transition>
			</nav>
		</div>
  )
}

export default Navbar