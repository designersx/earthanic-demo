import styles from "@/styles/Home.module.css";
import ProductList from "@/components/ProductList/ProductList";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedSlug, setSelectedSlug] = useState("All");
  useEffect(() => {
    // On page load, remove item from localStorage if it exists
    if (localStorage.getItem("reqbody")) {
      localStorage.removeItem("reqbody");
    }
  }, []);

  return (
    <>
      <div>
        {/* <Navbar onSlugChange={setSelectedSlug} /> */}
        <ProductList selectedSlug={selectedSlug} />
      </div>
    </>
  );
}
