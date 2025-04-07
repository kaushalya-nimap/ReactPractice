"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

const navLinks=[
    {name:"Register",href:"/register"},
    {name:"Login",href:"/login"},
    {name:"Forgot-Password",href:"/forgot-password"}
]

export default function AuthLayout({children}:{children:React.ReactNode}){
    const[input,setInput]=useState("")
    const pathname=usePathname()
    console.log(pathname)
    return(
        <>
        <input type="text" onChange={(e)=>setInput(e.target.value)}/>
        <Link href="/">Back to home</Link>
         {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (pathname.startsWith(link.href) && link.href !== "/");
        return (
          <Link className={isActive?"font-bold mr-4":"text-blue-500 mr-4"} href={link.href} key={link.name}>
            {link.name}
          </Link>
        );
      })}
        <div>{children}</div>
        </>
    )
}