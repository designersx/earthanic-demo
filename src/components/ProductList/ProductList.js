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
  };

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

    // Agar slug badla, toh detailProducts ko clear karo
    setdetailProducts(undefined);
  }, [selectedSlug]);

  const handleSlugChange = (slug) => {
    setSelectedSlug(slug);

    // Agar slug 'All' ho, toh detailProducts ko undefined karenge
    if (slug === "All") {
      setdetailProducts(undefined);
    }
  };

  return (
    <section className={styles.MainScro}>
      <div className={styles.Part1}>
        <div className={styles.Chatbot_div}>
          <Chatbot />
        </div>

        <div className={styles.Part2}>
          <div className={styles.Navbar_div}>
            {/* <Navbar
              onSlugChange={setSelectedSlug}
              selectedSlug={selectedSlug}
            /> */}
            <Navbar onSlugChange={handleSlugChange} />
          </div>

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
                          <span className={styles.price}>{`$${product.price}0 USD`}</span>
                          {/* <spna></spna> */}
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
