import React, { useState } from "react";
import styles from "./Productdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import CartOffcanvas from "../AddtoCart/Cart";

const ProductDetails = ({ data }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...existingCartItems, data];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setShowCart(true);
  };


  return (
    <section>
      <div className={styles.ProductDetails}>
        {data.map((item) => {
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

                {/* <div className={styles.SizeDiv}>
                  <p>Size</p>
                </div>
                <div className={styles.Sizes}>
                  <p>S</p>
                  <p>M</p>
                  <p>L</p>
                  <p>XL</p>
                  <p>XXL</p>
                </div> */}
                {item?.size?.length > 0 && (
                  <>
                    <div className={styles.SizeDiv}>
                      <p>Size</p>
                    </div>
                    <div className={styles.Sizes}>
                      {item.size.map((size, index) => (
                        <p key={index}>{size}</p>
                      ))}
                    </div>
                  </>
                )}

                <div className={styles.description}>
                  <p>{item?.description}</p>

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
            
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ProductDetails;
