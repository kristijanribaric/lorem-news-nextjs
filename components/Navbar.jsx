import React, { useState} from 'react'
import Link from 'next/link'
import { Transition } from "@headlessui/react";
import Burger from '@animated-burgers/burger-squeeze'
import '@animated-burgers/burger-squeeze/dist/styles.css'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession, signIn } from 'next-auth/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
	const { data, status } = useSession();
	const router = useRouter();
  return (
    <div>
			<nav className=" shadow-sm fixed top-0 w-full z-10  text-white">
				<div className="w-full">
					<div className="flex items-center h-20 w-full bg-black">
						<div className="flex items-center  mx-20  justify-between w-full">
							<Link href="/" passHref>
								<div className="flex justify-center items-center flex-shrink-0 cursor-pointer">
									<Image src='/news_logo_red.png' alt='lorem news logo' width={80} height={80}/>
									<h1 className=" ml-4 font-bold text-xl cursor-pointer">
										Lorem <span className="text-red-700">News</span>
									</h1>
								</div>
							</Link>
							
							<div className="hidden md:block">
								<div className="ml-10 flex items-baseline space-x-4">
									<div className="px-4 py-2  ">
										<Link						
											href="/"
											passHref
										>
											<span className="cursor-pointer  px-8 py-2 " >Home</span>	
										</Link>
										<div className={router.pathname == "/" ? "h-1 w-full bg-white transition-all duration-500" : "h-1 bg-transparent w-0 transition-all duration-500"}></div>
									</div>
									<div className="px-4 py-2  ">
										<Link						
											href="/about"
											passHref
										>
											<span className="cursor-pointer  px-8 py-2 " >About</span>	
										</Link>
										<div className={router.pathname == "/about" ? "h-1 w-full bg-white transition-all duration-500" : "h-1 bg-transparent w-0 transition-all duration-500"}></div>
									</div>
									<div className="px-4 py-2  ">
										<Link						
											href={session ? "/upload" : "/api/auth/signin"}
											passHref
										>
											<span className="cursor-pointer  px-8 py-2 " >Upload</span>	
										</Link>
										<div className={router.pathname == "/upload" ? "h-1 w-full bg-white transition-all duration-500" : "h-1 bg-transparent w-0 transition-all duration-500"}></div>
									</div>

									{!session && <div className="px-4 py-2  ">
										<button onClick={signIn}>Sign in</button>
									</div>}
									{session && <div className="px-4 py-2  ">
										<Link						
											href="/myarticles"
											passHref
										>
											<span className="cursor-pointer  px-8 py-2 " >My Articles</span>	
										</Link>
										<div className={router.pathname == "/myarticles" ? "h-1 w-full bg-white transition-all duration-500" : "h-1 bg-transparent w-0 transition-all duration-500"}></div>
									</div>}
									{session && <div><p>{session.user.name}({session.user.email})</p><button className='px-2 py-1 bg-red-700' onClick={() => signOut()}><a>Log out</a> </button></div>}
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
									passHref
									
								>	
								<div className={router.pathname == "/" ? styles.active : styles.btn}>
										<span className=" ">Home</span>
										<em></em>
								</div>
									
								</Link>
								<Link
									href="/about"
									passHref
								>
									<div className={router.pathname == "/about" ? styles.active : styles.btn}>
										<span className=" ">About</span>
										<em></em>
								</div>
								</Link>

								<Link
									href={session ? "/upload" : "/api/auth/signin"}
									passHref
									
								>
									<div className={router.pathname == "/upload" ? styles.active : styles.btn}>
										<span className=" ">Upload</span>
										<em></em>
								</div>
								</Link>

								{!session && <Link
									href="/api/auth/signin"
									passHref
									
								>
									<div className={styles.btn}>
										<span className=" ">Log in</span>
										<em></em>
								</div>
								</Link>}
								
								{session && <Link
									href="/myarticles"
									passHref
									
								>
									<div className={router.pathname == "/myarticles" ? styles.active : styles.btn}>
										<span className=" ">My Articles</span>
										<em></em>
								</div>
								</Link>}

								{session && <button
									onClick={() => signOut()}
									className={styles.btn}
									
								>
									
										<span className=" ">Log out</span>
										<em></em>

								</button>}

								{session &&
								 <div className='text-center  text-gray-400 pb-2'><p>{session.user.name} ({session.user.email})</p></div>}
							</div>
						</div>
					)}
				</Transition>
			</nav>
		</div>
  )
}

export default Navbar