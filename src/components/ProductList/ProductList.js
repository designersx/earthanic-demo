import React, { useEffect, useState } from "react";
import styles from "../ProductList/ProductList.module.css";
import Chatbot from "../Chatbot/Chatbot";
import Navbar from "../Navbar/Navbar";
import { getAllProduct } from "@/lib/api";
import ProductDetails from "../ProductDetails/Productdetail";
const ProductList = () => {
  const [Products, setProducts] = useState();
  console.log("ddddd", Products);
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    const getProduct = await getAllProduct();
    const compData = getProduct.data.products.nodes;
    const extractedProducts = compData?.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.variants.edges[0].node.price.amount,
      image: product.images.edges[0].node.src,
    }));

    setProducts(compData);
    console.log("extractedProducts-------", extractedProducts);
  };

  return (
    <section className={styles.MainScro}>
      <div className={styles.Part1}>
        <div className={styles.Chatbot_div}>
          <Chatbot />
        </div>

        <div className={styles.Part2}>
          <div className={styles.Navbar_div}>
            <Navbar />
          </div>

          <div className={styles.ProductList_div}>
            {Products?.map((product) => {
              return (
                <>
                
                <div className={styles.flex}>
                    <div className={styles.grid}>
                      <div className={styles.card}>
                        <img
                          src={product.images.edges[0].node.src}
                          className={styles.image}
                        />
                        <div className={styles.details}>
                          <p className={styles.name}>{product.title}</p>
                          <span className={styles.price}>$78 USD</span>
                        </div>
                      </div>                     
                    </div>
                  </div>

                
                  
                </>
              );
            })}

{/* <ProductDetails/>  */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
