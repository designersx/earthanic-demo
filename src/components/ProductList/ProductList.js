import React, { useEffect, useState } from "react";
import styles from "../ProductList/ProductList.module.css";
import Chatbot from "../Chatbot/Chatbot";
import Navbar from "../Navbar/Navbar";
import { getAllProduct } from "@/lib/api";
import ProductDetails from "../ProductDetails/Productdetail";
import ProductData from "../../../Json/Product.json";
import CartOffcanvas from "../AddtoCart/Cart";
import Modal from "../Modal/Modal";

const ProductList = () => {
  const [Products, setProducts] = useState();
  const [filteredProducts, setfilteredProducts] = useState();
  const [selectedSlug, setSelectedSlug] = useState("All");
  const [detailProducts, setdetailProducts] = useState();
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

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
    console.log("external_id", external_id);
    const filteredProducts = ProductData.filter(
      (product) => product.external_id === external_id
    );
    setdetailProducts(filteredProducts);
  };

  const handleProductClick = (product) => {
    if (product.size) {
      setSelectedProduct(product); // Modal open karne ke liye product store karo
      setModalOpen(true);
    } else {
      handleclick(product.external_id); // Agar size nahi hai toh direct call
    }
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
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  // Lens function start //
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState(null); // Track hovered image

  const handleMouseMove = (e, productId) => {
    const { left, top } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setHoveredImage(productId); // Set hovered image ID
    setLensPosition({ x, y });
  };

  const handleSubmit = () => {
    if (selectedSize) {
      handleclick(selectedProduct.external_id);
      setSelectedProduct(null); // Modal close
      setSelectedSize(""); // Size reset
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
              <ProductDetails
                data={detailProducts}
                onBack={() => setdetailProducts(undefined)}
              />
            ) : (
              filteredProducts?.map((product) => {
                return (
                  <div className={styles.flex} key={product.external_id}>
                    <div className={styles.grid}>
                      <div className={styles.card}>
                        <img
                          src={product.image}
                          className={styles.image}
                          onClick={() => handleclick(product.external_id)}
                        />
                        <div className={styles.details}>
                          <p className={styles.name}>{product.title}</p>
                          <span
                            className={styles.price}
                            onClick={() => handleProductClick(product)}
                          >
                            {`$${product.price}0 `}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Modal for Size Selection */}
          {selectedProduct && (
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h3>Select Size for {selectedProduct.title}</h3>
                  <div className={styles.Sizes}>
                    {selectedProduct.size?.map((size, index) => (
                      <p
                        key={index}
                        className={`${styles.sizeOption} ${
                          selectedSize === size ? styles.selected : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </p>
                    ))}
                  </div>

                  <button onClick={handleSubmit} disabled={!selectedSize}>
                    Submit
                  </button>
                  <button onClick={() => setSelectedProduct(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
