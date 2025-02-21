import React, { useEffect, useState } from "react";
import styles from "./Productdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "../Modal/Modal";
import CartOffcanvas from "../AddtoCart/Cart";
import { addToCart, createCart, getCartList } from "@/lib/api";
import Loader from "../Loader/Loader";

const ProductDetails = ({ data, onBack, cartbodyiteem }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(""); // New state for storing description
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);
  const [addToCartData, setAddToCartData] = useState();
  const handleClose = () => setShowCart(false);


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




  const handleCreateCart = async () => {
    setLoading(true);
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      const cart = await createCart();
      if (cart) {
        cartId = cart.id;
        localStorage.setItem("cartId", cartId);
        setCartId(cartId);
      }
    }
    

    // let bodyContent = data.map((item) => ({
    //   variantId: item.variantId,
    //   quantity: 1,
    // }));


    let bodyContent = data.map((item) => {
      let finalVariantId = item.variantId; // Default variant ID
  
      // Check if selectedSize exists and matches any variant ID
      if (selectedSize && item.variantSizeId) {
        const matchedVariant = item.variantSizeId.find(
          (variant) => variant.title.toLowerCase() === selectedSize.toLowerCase() 
        );
  
        if (matchedVariant) {
          finalVariantId = matchedVariant.id;
        }
      }
  
      return {
        variantId: finalVariantId,
        quantity: 1,
      };
    });





    try {
      const cartItem = await addToCart({
        cartId: cartId,
        products: bodyContent, 
      });

      if (cartItem) {
        setShowCart(true);
        setAddToCartData(cartItem);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (addToCartData) {
      getCartList(cartId);
    }
  }, [addToCartData]);
  const getremoveitem = () => {
    localStorage.removeItem("reqbody");
    onBack();
  };

  // console.log("data----", data);
  return (
    <section>
      <div className={styles.backButton} onClick={getremoveitem}>
        X
      </div>
      <div className={styles.ProductDetails}>
        {data.map((item) => {

  
          const descriptionWords = item?.description.split(" ");
          const isLongDescription = descriptionWords.length > 10;
          const truncatedDescription = descriptionWords.slice(0, 10).join(" ") + "...";
        

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
                {item?.variantSizeId?.length > 0 && (
                  <>
                    <div className={styles.SizeDiv}>
                      <p>Size</p>
                    </div>
                    <div className={styles.Sizes}>
                      {item?.variantSizeId?.map((size, index) => (
                        <p
                          key={index}
                          className={`${styles.sizeOption} ${
                            selectedSize === size.title ? styles.selected : ""
                          }`}
                          onClick={() => setSelectedSize(size?.title)}
                        >
                          {size.title}
                        </p>
                      ))}
                    </div>
                  </>
                )}

                <div className={styles.description}>
                  <p>
                    {isLongDescription
                      ? truncatedDescription
                      : item?.description}{" "}
                    {isLongDescription && (
                      <span
                        onClick={() =>
                          handleDescriptionClick(item?.description)
                        }
                        className={styles.readMore}
                      >
                        Read More
                      </span>
                    )}
                  </p>
                  <div
                    className={styles.cartDiv}
                    // onClick={handleShow}
                    onClick={handleCreateCart}
                  >
                    {loading ? (

                      <Loader />
                    ) : (
                      "Add to Cart"
                    )}
                  </div>
                </div>
              </div>

              {/* OFFCANVAS */}

              <CartOffcanvas
                show={showCart}
                handleClose={handleClose}
         
                cartItemsdet={addToCartData}
              />

           
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2 className={styles.Pcontent}>Item Details</h2>
                <p>{selectedDescription}</p>
               
              </Modal>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ProductDetails;
