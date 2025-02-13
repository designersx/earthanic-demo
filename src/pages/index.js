
import styles from "@/styles/Home.module.css";
import ProductList from "@/components/ProductList/ProductList";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";



export default function Home() {
  const [selectedSlug, setSelectedSlug] = useState('All');
  return (
    <>
      <div>
        {/* <Navbar onSlugChange={setSelectedSlug} /> */}
        <ProductList selectedSlug={selectedSlug} />
      </div>
    </>
  );
}
