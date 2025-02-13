import React, { useEffect, useState } from "react";
import styles from "../ProductList/ProductList.module.css";
import Chatbot from "../Chatbot/Chatbot";
import Navbar from "../Navbar/Navbar";
import { getAllProduct } from "@/lib/api";
import ProductDetails from "../ProductDetails/Productdetail";
import ProductData from "../../../Json/Product.json";
const ProductList = () => {
  const [Products, setProducts] = useState();
  const [filteredProducts, setfilteredProducts] = useState();
  const [selectedSlug, setSelectedSlug] = useState("All");
  const [detailProducts, setdetailProducts] = useState();

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
    // console.log("extractedProducts-------", extractedProducts);
  };

  console.log("productjson---", ProductData);

  const handleclick = (external_id) => {
    const filteredProducts = ProductData.filter(
      (product) => product.external_id === external_id
    );
    setdetailProducts(filteredProducts);
  };

  useEffect(() => {
    const filteredProducts =
      selectedSlug === "All"
        ? ProductData
        : ProductData.filter((product) => product.slug === selectedSlug);
    setfilteredProducts(filteredProducts);
  }, [selectedSlug]);

  return (
    <section className={styles.MainScro}>
      <div className={styles.Part1}>
        <div className={styles.Chatbot_div}>
          <Chatbot />
        </div>

        <div className={styles.Part2}>
          <div className={styles.Navbar_div}>
            {/* <Navbar /> */}
            <Navbar onSlugChange={setSelectedSlug} />
          </div>

          {/* <div className={styles.ProductList_div}>
            {filteredProducts?.map((product) => {
              return (
                <>
                  <div className={styles.flex}>
                    <div className={styles.grid}>
                      <div
                        className={styles.card}
                        onClick={() => handleclick(product.external_id)}
                      >
                        <img src={product.image} className={styles.image} />
                        <div className={styles.details}>
                          <p className={styles.name}>{product.title}</p>
                          <span className={styles.price}>{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            {detailProducts && <ProductDetails data={detailProducts} />}

          
          </div> */}
          <div className={styles.ProductList_div}>
            {detailProducts ? (
              <ProductDetails data={detailProducts} />
            ) : (
              filteredProducts?.map((product) => {
                return (
                  <div className={styles.flex} key={product.external_id}>
                    <div className={styles.grid}>
                      <div
                        className={styles.card}
                        onClick={() => handleclick(product.external_id)}
                      >
                        <img src={product.image} className={styles.image} />
                        <div className={styles.details}>
                          <p className={styles.name}>{product.title}</p>
                          <span className={styles.price}>{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
