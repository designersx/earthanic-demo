import React, { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";
import styles from "./Productdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "../Modal/Modal";
import CartOffcanvas from "../AddtoCart/Cart";
import { addToCart, createCart } from "@/lib/api";

const ProductDetails = ({ data, onBack }) => {
const ProductDetails = ({ data, onBack }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(""); // New state for storing description

  const handleClose = () => setShowCart(false);
  const handleShow = () => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...existingCartItems, data];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setShowCart(true);
  };

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isModalOpen]);

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
    setModalOpen(true);
  };
   // Set default selected size to the first size///
   useEffect(() => {
    if (data?.length > 0) {
      const firstItem = data[0];
      if (firstItem?.size?.length > 0 && selectedSize === null) {
        setSelectedSize(firstItem.size[0]);
      }
    }
  }, [data, selectedSize]);

  // shopify cart
  const [cartId, setCartId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [cartbodyitem, setcartbodyitem] = useState([]);

  console.log("checkoutUrl---", checkoutUrl);

  // console.log(cartId,"cartId-----");

  useEffect(() => {
    getCartId(); // Call getCartId which will call reqbodyitem once cartId is set
  }, []);

  const getCartId = async () => {
    const cart = await createCart();
    // console.log("CART---", cart);
    if (cart) {
      setCartId(cart.id); // Set the cartId
    }
  };

  let arr = [];
  let allProducts = new Set();

  const reqbodyitem = () => {
    if (!cartId) {
      // If cartId is not yet set, do not proceed with the rest of the function
      console.log("Cart ID is not available yet.");
      return;
    }

    const newProduct = data?.map((variant) => ({
      // cartId: cartId,
      variantId: variant.variantId,
      quantity: 1,
    }));

    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem("reqbody")) || [];

    // Check if the new product already exists in the list (to avoid duplicates)
    const combinedProducts = [...existingProducts];

    // Add new product only if it's not already in the list
    newProduct.forEach((product) => {
      const exists = combinedProducts.some(
        (existingProduct) => existingProduct.variantId === product.variantId
      );
      if (!exists) {
        combinedProducts.push(product);
      }
    });

    // Remove duplicates by creating a Set of stringified products
    const uniqueProducts = Array.from(
      new Set(combinedProducts.map((product) => JSON.stringify(product)))
    ).map((product) => JSON.parse(product));

    // Save the unique products back to localStorage
    localStorage.setItem("reqbody", JSON.stringify(uniqueProducts));

    // Update allProducts set with unique products
    newProduct.forEach((product) => allProducts.add(JSON.stringify(product)));

    // Convert allProducts set back to an array of objects
    const allProductsArray = Array.from(allProducts).map((product) =>
      JSON.parse(product)
    );

    arr.push(uniqueProducts);
    setcartbodyitem(arr[0]);
    console.log({ cartbodyitem });

    return arr[0];
  };

  // Call reqbodyitem after cartId is set
  useEffect(() => {
    if (cartId) {
      reqbodyitem(); // Now call reqbodyitem only after cartId is available
    }
  }, [cartId]);

  console.log({ cartbodyitem });

  const handleCreateCart = async () => {
    const cartItem = await addToCart({
      cartId,
      products: cartbodyitem,
    });

    if (cartItem) {
      const existingCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = [...existingCartItems, data];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
      setCheckoutUrl(cartItem[0]?.checkoutUrl);
      setShowCart(true);
    }
  };

  // console.log("data----", data);
  return (
    <section>
      <div className={styles.backButton} onClick={onBack}>
        X
      </div>
      <div className={styles.ProductDetails}>
        {data.map((item) => {
          const descriptionWords = item?.description.split(" ");
          const isLongDescription = descriptionWords.length > 10;
          const truncatedDescription = descriptionWords.slice(0, 10).join(" ");
          ("...");

          return (
            <>
              <div className={styles.ProductImg}>
                <img src={item?.image} />
              </div>
              <div className={styles.ProductContent}>
                <div className={styles.ProductTittle}>
                  <h2>{item?.title}</h2>
                </div>
                <div className={styles.ProductPrice}>
                  <p>{`$${item?.price}0 USD`}</p>
                </div>
                <hr className={styles.hr} />
                {item?.size?.length > 0 && (
                  <>
                    <div className={styles.SizeDiv}>
                      <p>Size</p>
                    </div>
                    <div className={styles.Sizes}>
                      {item.size.map((size, index) => (
                        <p
                          key={index}
                          className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ""
                            }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </p>
                      ))}
                    </div>

                    
                  </>
                )}

                <div className={styles.description}>
                  <p >
                    {isLongDescription
                      ? truncatedDescription
                      : item?.description}{" "}
                    {isLongDescription && (
                      <span onClick={() => handleDescriptionClick(item?.description)} className={styles.readMore}>Read More</span>
                    )}
                  </p>
                  <div
                    className={styles.cartDiv}
                    // onClick={handleShow}
                    onClick={handleCreateCart}
                  >
                    Add to cart
                  </div>
                </div>
              </div>

              {/* OFFCANVAS */}

              <CartOffcanvas
                show={showCart}
                handleClose={handleClose}
                cartId={cartId}
                checkoutUrl={checkoutUrl}
                // cartItems={cartItems}
              // cartItems={cartItems}
              />

              {/* Modal to show full description */}
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2 className={styles.Pcontent}>Item Details</h2>
                <p>{selectedDescription}</p>{" "}
                {/* Display selected description */}
              </Modal>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ProductDetails;
