"use client"
import Image from "next/image"
import React, { useState } from "react"
import Logo from "../../../assets/images/pyle.webp"
import User from "../../../assets/images/user.webp"

export default function NavBar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  return (
    <>
      {/*<!-- Component: Navbar with Avatar --> */}
      {/*<!-- Header --> */}
      <header className="sticky top-0 border-b-1  z-20 w-full border-b  bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden mb-10 flex flex-1 justify-between ">
        <div className=" mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem] flex flex-1 ">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700  w-full"
            role="navigation"
            
          >
            {/*      <!-- Brand logo --> */}
            <div className="flex lg:flex-1  justify-between">

                <a
                id="WindUI"
                aria-label="WindUI logo"
                aria-current="page"
                className=" items-center  whitespace-nowrap py-3 text-lg focus:outline-none flex justify-center align-middle gap-5"
                href="javascript:void(0)"
                >
                <Image src={Logo} height={100} width={100}/>
                </a>

                <form action="#" className="flex flex-row justify-center align-middle">
                <input
                    type="search"
                    placeholder="Search Your Product"
                    className="lg:w-[700px] bg-gray-200 border-0 rounded text-sm text-black h-12 m-5"
                />
                <button
                    type="submit"
                    className="bg-transparent border-0 absolute"
                >
                    {/* <Image src={Logo} alt="Search" /> */}
                </button>
            </form>
            </div>
            {/* <input
            type="text"
            placeholder="Search Your Product"
            className="px-4 border rounded-full w-80"
          /> */}
            {/* <div className="border border-red-500"> */}
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Blog</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Planning</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>About me</span>
                </a>
              </li>
            </ul>
            <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
              {/*        <!-- Avatar --> */}
              <a
                href="#"
                className="relative inline-flex h-10 w-10 items-center justify-center  text-white"
              >
                <Image
                  src={User}
                  alt="user name"
                />
                {/* <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                  <span className="sr-only"> 7 new emails </span>
                </span> */}
              </a>
              {/*        <!-- End Avatar --> */}
            </div>
            {/* </div> */}
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with Avatar--> */}
    </>
  )
}


// export default function NavBar(){
    //     return(
    //         <div className="navbar bg-base-100 flex flex-row bg-white p-8">
    //             <div className="">
    //                 <a className="btn btn-ghost text-xl">daisyUI</a>
    //                 <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    
    //             </div>
    //             <div className=" gap-2 flex flex-row">
    //                 <div className="form-control">
    //                     {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    //                 </div>
    //                 <div className="dropdown dropdown-end">
    //                     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    //                         <div className="w-10 rounded-full">
    //                             <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    //                         </div>
    //                     </div>
    //                     {/* <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
    //                         <li>
    //                             <a className="justify-between">
    //                                 Profile
    //                                 <span className="badge">New</span>
    //                             </a>
    //                         </li>
    //                         <li><a>Settings</a></li>
    //                         <li><a>Logout</a></li>
    //                     </ul> */}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }