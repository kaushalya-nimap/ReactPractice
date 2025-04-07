import Link from "next/link"
export const metadata={
    title:"Product"
}

export default function ProductList(){
    return(
        <>
        <Link href="/">Home</Link>
        <h1>Details about product</h1>
        <h2>Product 1</h2>
        <h2>Product 2</h2>
        <h2>Product 3</h2>
        </>
    )
}