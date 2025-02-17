import React, { useState } from "react";
import styles from "./Productdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "../Modal/Modal";
import CartOffcanvas from "../AddtoCart/Cart";

const ProductDetails = ({ data, onBack  }) => {
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
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isModalOpen]);

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description); // Set the full description when clicked
    setModalOpen(true); // Open the modal
  };

  return (
    <section>
      <div className={styles.backButton} onClick={onBack} >X</div>
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
                          className={`${styles.sizeOption} ${
                            selectedSize === size ? styles.selected : ""
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
                  <p onClick={() => handleDescriptionClick(item?.description)}>
                    {isLongDescription
                      ? truncatedDescription
                      : item?.description}{" "}
                    {isLongDescription && (
                      <span className={styles.readMore}>Read More</span>
                    )}
                  </p>
                  <div className={styles.cartDiv} onClick={handleShow}>
                    Add to cart
                  </div>
                </div>
              </div>

              {/* OFFCANVAS */}

              <CartOffcanvas
                show={showCart}
                handleClose={handleClose}
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
