import React, { useState } from "react";
import styles from "./Productdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const ProductDetails = ({ data }) => {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("data----", data);


  return (
    <section>
      <div className={styles.ProductDetails}>
        {data.map((item) => {
          console.log(item);
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

              <Offcanvas
                className={styles.OffcanvasMain}
                show={show}
                onHide={handleClose}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className={styles.cartContent}>
                    {/* Static Product */}
                    <div className={styles.cartItem}>
                      <div className={styles.removeButton}>
                        <p>X</p>
                      </div>
                      <img
                        src={item?.image}
                        alt="Acme Slip-On Shoes"
                        className={styles.productImage}
                      />
                      <div className={styles.details}>
                        <p>{item?.title}</p>
                        <p className={styles.price}>{`$${item?.price}USD`}</p>
                        {/* <div className={styles.quantity}>
                          <button>-</button>
                          <span>4</span>
                          <button>+</button>
                        </div> */}
                        <div className={styles.quantity}>
                          <button
                            onClick={() =>
                              setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                            }
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => setQuantity((prev) => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cartProduct}></div>

                  <div className={styles.footer}>
                    <div className={styles.summary}>
                      <p>
                        Taxes: <span>$0.00 USD</span>
                      </p>
                      <p>
                        Shipping: <span>Calculated at checkout</span>
                      </p>
                      <p>
                        Total: <span>$180.00 USD</span>
                      </p>
                    </div>
                    <button className={styles.checkoutButton}>
                      Proceed to Checkout
                    </button>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ProductDetails;
