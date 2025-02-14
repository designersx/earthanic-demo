import React, { useState } from "react";
import styles from "../Navbar/Navbar.module.css";

const Navbar = ({ onSlugChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <span>&#10006;</span> : <span>&#9776;</span>}
        </div>
        <div className={`${styles.nav} ${menuOpen ? styles.showMenu : ""}`}>
          <div onClick={() => handleClick("All")}><p>All</p></div>
          <div onClick={() => handleClick("Furniture")}><p>Furniture</p></div>
          <div onClick={() => handleClick("Bath Accessory")}><p>Bath</p></div>
          <div onClick={() => handleClick("Baskets")}><p>Baskets</p></div>
          <div onClick={() => handleClick("Art Work")}><p>Art Work</p></div>
          <div onClick={() => handleClick("Kitchen")}><p>Kitchen</p></div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
