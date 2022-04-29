import React, { useState} from 'react'
import Link from 'next/link'
import { Transition } from "@headlessui/react";
import styles from '../styles/Navbar.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession, signIn } from 'next-auth/react';
import { UnstyledButton,Divider, Menu, Burger, Avatar, Button, Notification } from '@mantine/core';
import { BsChevronDown, BsArrowDownUp,BsFillJournalBookmarkFill, BsBoxArrowRight, BsTools } from "react-icons/bs";
import classNames from 'classnames';
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const { data: session, status } = useSession();
	const router = useRouter();

	const signInWithGoogle = () => {
        <Notification
        loading
        disallowClose
      >
        Redirecting...
      </Notification>
        signIn('google', {
          callbackUrl: "/",
        });
    };

    const signInWithGithub = () => {
        <Notification
        loading
        disallowClose
      >
        Redirecting...
      </Notification>
        signIn('github', {
          callbackUrl: "/",
        });
    };
  return (
   
			<div className=" shadow-sm fixed top-0 w-full z-10 mb-24  text-white bg-black">
				<div>
					<div className='flex justify-between py-2'>
						<Link href="/" passHref>
							<div className="flex justify-center mx-6 items-center gap-4 flex-shrink-0 cursor-pointer">
								<Image src='/news_logo_red.png' alt='lorem news logo' width={80} height={80}/>
								<h1 className='cursor-pointer hidden md:block'>Lorem <span className='text-red-600 font-semibold'>News</span> </h1>
							</div>
						</Link>
						
						<div className='flex items-center'>
							<Menu
								size={260}
								placement="end"
								transition="pop-top-right"
								onClose={() => setUserMenuOpened(false)}
								onOpen={() => setUserMenuOpened(true)}
								control={
								<UnstyledButton
									className="hover:bg-white/30 transition-alltext-white rounded-md"
								>
									<div className='flex gap-2 py-2 mx-4 text-white items-center'>
									<Avatar src={session?.user.image} alt={session?.user.name} radius="xl"  size={28}/>
									<h2 className='font-medium hidden md:block leading-[2] '>{session?.user.name}</h2>
									
									<BsChevronDown className="  hidden md:block" />
									</div>
								</UnstyledButton>
								}
							>
								{!session ? 
								<div className='text-center m-4'>
									<h2 className='text-center'>Please login with: </h2>
									<Button variant='default' leftIcon={<FcGoogle/>} className="rounded-full px-12 w-full" onClick={()=> signInWithGoogle()}>Google</Button>
									<Divider label="Or with" labelPosition='center' className='my-8'/>
									<Button variant='default' leftIcon={<BsGithub/>} className="rounded-full px-12 w-full" onClick={()=> signInWithGithub()}>Github</Button>
									</div> : <><Link href="/myarticles" passHref><Menu.Item className='hover:bg-black/20' icon={<BsFillJournalBookmarkFill size={14} />}>My Articles</Menu.Item></Link>
								<Divider/>
								<Menu.Item className='hover:bg-black/20' icon={<BsTools size={14} />}>Account settings</Menu.Item>
								<Menu.Item className='hover:bg-black/20' icon={<BsArrowDownUp size={14} />}>Change account</Menu.Item>
								<Menu.Item className='hover:bg-black/20' icon={<BsBoxArrowRight size={14} />} onClick={() => signOut()}>Logout</Menu.Item></>}
								
							</Menu>
							<Burger opened={isOpen} onClick={() => setIsOpen(!isOpen)} className="md:hidden mt-1 mx-3" color="white" />
						</div>
						
						
					</div>
					{/* <Tabs variant='outline' position='center' className='hidden md:block'>
						<Tabs.Tab className=' transition-all duration-500 border-none mx-1' label="Home"/>
						<Tabs.Tab className=' transition-all duration-500 border-none mx-1' label="About"/>
						<Tabs.Tab className=' transition-all duration-500 border-none mx-1' label="Categories"/>
						<Tabs.Tab className=' transition-all duration-500 border-none mx-1' label="Upload"/>
					</Tabs> */}
					<div className=' justify-center gap-2 hidden md:flex'>
						<div className={classNames('px-4 py-2 rounded-t-lg transition-all duration-300',{'bg-white text-black font-semibold' : router.pathname == "/"})}><Link href="/" passHref>Home</Link></div>
						<div className={classNames('px-4 py-2 rounded-t-lg transition-all duration-300',{'bg-white text-black font-semibold' : router.pathname == "/about"})}><Link href="/about" passHref>About</Link></div>
						<div className={classNames('px-4 py-2 rounded-t-lg transition-all duration-300',{'bg-white text-black font-semibold' : router.pathname == "/categories"})}><Link href="/categories" passHref>Categories</Link></div>
						<div className={classNames('px-4 py-2 rounded-t-lg transition-all duration-300',{'bg-white text-black font-semibold' : router.pathname == "/upload"})}><Link href="/upload" passHref>Upload</Link></div>
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
								<div className={router.pathname == "/" ? styles.active : styles.btn} onClick={()=> setIsOpen(false)}>
										<span className=" ">Home</span>
										<em></em>
								</div>
									
								</Link>
								<Link
									href="/about"
									passHref
								>
									<div className={router.pathname == "/about" ? styles.active : styles.btn} onClick={()=> setIsOpen(false)}>
										<span className=" ">About</span>
										<em></em>
								</div>
								</Link>

								<Link
									href="/categories"
									passHref
								>
									<div className={router.pathname == "/categories" ? styles.active : styles.btn} onClick={()=> setIsOpen(false)}>
										<span className=" ">Categories</span>
										<em></em>
								</div>
								</Link>

								<Link
									href={session ? "/upload" : "/signin"}
									passHref	
									
								>
									<div className={router.pathname == "/upload" ? styles.active : styles.btn} onClick={()=> setIsOpen(false)}>
										<span className=" ">Upload</span>
										<em></em>
								</div>
								</Link>

								
								
								

								
								
							</div>
						</div>
					)}
				</Transition>
			</div>
		
  )
}

export default Navbar