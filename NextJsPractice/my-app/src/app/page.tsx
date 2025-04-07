"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Products", href: "/products" },
  {name:"Order-Products",href:"/order-products"}
];
export default function Home() {
  const pathname = usePathname();
  return (
    <>
      <h1>this is home page</h1>
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
    </>
  );
}
