import React, { useState } from "react";
import styles from "../Navbar/Navbar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import CartOffcanvas from "../AddtoCart/Cart";

const Navbar = ({ onSlugChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
    const [showCart, setShowCart] = useState(false);


  const handleClick = (slug) => {
    onSlugChange(slug);
    setMenuOpen(false); // Close menu on selection
  };
  const handleClose = () => setShowCart(false);
  const handleShow= () => setShowCart(true);

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

   
          {/* OFFCANVAS  */}
          <CartOffcanvas show={showCart} handleClose={handleClose} />
      </div>
    </section>
  );
};

export default Navbar;
