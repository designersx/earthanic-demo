import React, { useState } from "react";
import styles from "./Productdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const ProductDetails = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section>
      <div className={styles.ProductDetails}>
        <div className={styles.ProductImg}>
          <img src="images/image.png" />
        </div>
        <div className={styles.ProductContent}>
          <div className={styles.ProductTittle}>
            <h2>
              Acme Slip-On <br /> Shoes
            </h2>
          </div>
          <div className={styles.ProductPrice}>
            <p>$45.00USD</p>
          </div>
          <hr className={styles.hr} />

          <div className={styles.SizeDiv}>
            <p>Size</p>
          </div>
          <div className={styles.Sizes}>
            <p>S</p>
            <p>M</p>
            <p>L</p>
            <p>XL</p>
            <p>XXL</p>
          </div>
          <div className={styles.description}>
            <p>
              Step into summer! Every time your head looks down, youl see these
              beauties, and your mood bounces right back up.
            </p>
            <p>
              Sleek, easy, and effortlessly stylish. Acme Slip-On Shoes are the
              ultimate get-up-and-go footwear. The low-profile slip-on canvas
              upper offers unbeatable convenience, while the clean design makes
              this all-white slip-on the perfect choice for anyone with places
              to go and things to do. One of the most popular designs, these
              shoes are the perfect middle ground between style and convenience.
            </p>

            <div className={styles.cartDiv} onClick={handleShow}>
              Add to cart
            </div>
          </div>
        </div>

        {/* OFFCANVAS */}

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </section>
  );
};

export default ProductDetails;
