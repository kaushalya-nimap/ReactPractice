"use client";

import { useRouter } from "next/navigation";
export default function Order() {
  const router = useRouter();
  const handleSubmit = () => {
    console.log("order processed");
    router.push("/");
  };
  return (
    <>
      <h1>Order Product</h1>
      <button onClick={handleSubmit}>Place order</button>
    </>
  );
}
