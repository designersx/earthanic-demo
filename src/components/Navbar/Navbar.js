import React, { useEffect, useState } from "react";
import styles from "../Navbar/Navbar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import CartOffcanvas from "../AddtoCart/Cart";
import { getCartList } from "@/lib/api";

const Navbar = ({ onSlugChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleClick = (slug) => {
    onSlugChange(slug);
    setMenuOpen(false); // Close menu on selection
  };
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  useEffect(() => {
    getProductDetails();
  }, [showCart, handleClose]);

  const getProductDetails = async () => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return console.error("No Cart ID found!");
    try {
      const cartResponse = await getCartList(cartId);
      const res = JSON.parse(cartResponse?.data);
      setCartCount(res?.data?.cart?.lines?.edges.length);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  return (
    <section className={styles.navsection}>
      <div className={styles.Navbar}>
        <div className={styles.logo_div}>
          <a href="https://demo.earthanic.com/">
            <img src="images/Earthanic-Logo.png" alt="Logo" />
          </a>
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
          <img src="images/cart-plus.svg" />
         
        </div>
        <div>
          {/* {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )} */}
        </div>

        {/* OFFCANVAS  */}
        <CartOffcanvas
          show={showCart}
          handleClose={handleClose}
        />
      </div>
    </section>
  );
};

export default Navbar;
