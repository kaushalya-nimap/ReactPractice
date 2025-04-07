"use client"
import { usePathname } from "next/navigation"
export default function ErrorBoundary(){
    const pathname=usePathname()
    return(
        <h1>Error occured in {pathname} page</h1>
    )
}