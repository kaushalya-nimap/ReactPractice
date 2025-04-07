// export default async function ProductId({params,}:{params:Promise<{productId:string}>}){
//     return(
//         const productId=(await params).productId
//         <h1>Details about product</h1>
//     )
// }
import Link from "next/link";
import { Metadata } from "next";
type Props={
    params: Promise<{ productId: string }>;
}
export const generateMetadate=async({params}:Props):Promise<Metadata>=>{
    const {productId}=await params
    return{
        title:`Product ${productId}`
    }

}

export default async function ProductId({
  params,
}:Props) {
  const productId = (await params).productId;
  return (
    <>
    <Link href="/">Home</Link>
      <h1>details about Products{productId}</h1>
    </>
  );
}
