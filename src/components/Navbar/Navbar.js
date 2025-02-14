import React, { useState } from "react";
import styles from "../Navbar/Navbar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";

const Navbar = ({ onSlugChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (slug) => {
    onSlugChange(slug);
    setMenuOpen(false); // Close menu on selection
  };

  return (
    <section className={styles.navsection}>
      <div className={styles.Navbar}>
        <div className={styles.logo_div}>
          <img src="images/Earthanic-Logo.png" alt="Logo" />
        </div>
        <div className={styles.forCart}>
          <div className={styles.CartIcon2} onClick={handleShow}>
            {" "}
            <img src="images/cart-plus.svg" />
          </div>
          <div className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <span>&#10006;</span> : <span>&#9776;</span>}
          </div>
        </div>
        <div className={`${styles.nav} ${menuOpen ? styles.showMenu : ""}`}>
          <div onClick={() => handleClick("All")}>
            <p>All</p>
          </div>
          <div onClick={() => handleClick("Furniture")}>
            <p>Furniture</p>
          </div>
          <div onClick={() => handleClick("Bath Accessory")}>
            <p>Bath</p>
          </div>
          <div onClick={() => handleClick("Baskets")}>
            <p>Baskets</p>
          </div>
          <div onClick={() => handleClick("Art Work")}>
            <p>Art Work</p>
          </div>
          <div onClick={() => handleClick("Kitchen")}>
            <p>Kitchen</p>
          </div>
        </div>
        <div className={styles.CartIcon1} onClick={handleShow}>
          {" "}
          <img src="images/cart-plus.svg" />
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
                  src="https://cdn.shopify.com/s/files/1/0638/8013/4826/files/Riya_Marble_Tissue_Box_Long_2.jpg?v=1739334338"
                  alt="Acme Slip-On Shoes"
                  className={styles.productImage}
                />
                <div className={styles.details}>
                  <p>
                    {/* {item?.title}  */}
                    Riya Marble Tissue Box
                  </p>
                  <p className={styles.price}>
                    {/* {`$${item?.price}USD`} */}
                    $99.00 USD
                  </p>
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
                    <button onClick={() => setQuantity((prev) => prev + 1)}>
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
      </div>
    </section>
  );
};

export default Navbar;
