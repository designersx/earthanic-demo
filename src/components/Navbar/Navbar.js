import React from "react";
import styles from "../Navbar/Navbar.module.css";

const Navbar = ({ onSlugChange }) => {
  const handleClick = (slug) => {
    onSlugChange(slug);
  };

  return (
    <section className={styles.navsection}  >
      <div className={styles.Navbar}>
        <div className={styles.logo_div}>
          <img src="images/Earthanic-Logo.png" />
        </div>
        <div className={styles.nav}>
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
      </div>
    </section>
  );
};

export default Navbar;
