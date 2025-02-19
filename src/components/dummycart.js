import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Cart.module.css";
import { addToCart, createCart } from "@/lib/api";

const CartOffcanvas = ({ show, handleClose, checkoutUrl }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [Url, setUrl] = useState();

  const getProduct = () => {
    setLoading(true);
    let savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      // Agar quantity nahi hai to usko 1 set karenge
      const itemsWithQuantity = savedCartItems.flat().map((item) => ({
        ...item,
        quantity: item?.quantity || 1,
      }));
      setCartItems(itemsWithQuantity);
    }
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getProduct();
    }, 1000); // Simulating async fetch time
  }, [cartItems, show]);

  const handleRemoveItem = (external_id) => {
    const updatedCartItems = cartItems
      .flat()
      .filter((item) => item.external_id !== external_id);
    console.log("updatedCartItems____", updatedCartItems);

    // Update state and localStorage
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    localStorage.removeItem("reqbody");
  };

  const handleQuantityChange = async (index, change) => {
    const updatedCartItems = cartItems.map((item, idx) =>
      idx === index
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + change), // Minimum 1 quantity
          }
        : item
    );
    setCartItems(updatedCartItems);
    console.log("updatedCartItems", updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Total price calculation
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.price; // Multiply quantity with price f
    }, 0);
  };
  const totalPrice = calculateTotal();

  // const cartItem = await addToCart({
  //   cartId,
  //   variantId: "gid://shopify/ProductVariant/46548933705898",
  //   quantity: 1,
  // });

  const handlelocalstorageremove = () => {
    localStorage.removeItem("reqbody");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartId");
  };

  // useEffect(() => {
  //   GetCartItems();
  // }, []);

  // const GetCartItems = async () => {
  //   let savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  //   let cartId = localStorage.getItem("cartId");
  //   const cartbodyitem = savedCartItems?.flat()?.map((item) => ({
  //     variantId: item.variantId, // Extract variant ID
  //     quantity: 1, // Custom quantity
  //   }));

  //   console.log("cartbodyitem---...>>", cartbodyitem); // Debugging ke liye
  //   console.log("cartid---...>>", cartId);
  //   try {
  //     const cartItem = await addToCart({
  //       cartId,
  //       products: cartbodyitem, // API call me pass karna
  //     });
  //     cartItem.map((ite) => {
  //       setUrl(ite?.checkoutUrl);
  //     });

  //     console.log("Cart updated:", cartItem);
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };

  // const  checkout = localStorage.getItem("checkoutUrl") || "";

  return (
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
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <div className={styles.cartContent}>
            {cartItems.length > 0 ? (
              cartItems.flat().map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <div
                    className={styles.removeButton}
                    onClick={() => handleRemoveItem(item.external_id)}
                  >
                    <p>X</p>
                  </div>
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className={styles.productImage}
                  />
                  <div className={styles.details}>
                    <p>{item?.title}</p>
                    <p className={styles.price}>{`$${item?.price} USD`}</p>
                    <div className={styles.quantity}>
                      <button onClick={() => handleQuantityChange(index, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(index, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Your cart is empty.</p>
            )}
          </div>
        )}

        {/* <div className="mt-4">
          <p>Cart ID: {cartId}</p>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            Go to Checkout
          </a>
        </div> */}

        <div className={styles.footer}>
          <div className={styles.summary}>
            <p>
              Taxes: <span>$0.00 USD</span>
            </p>
            <p>
              Shipping: <span>Calculated at checkout</span>
            </p>
            <p>
              Total: <span>${totalPrice.toFixed(2)} USD</span>
            </p>
          </div>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            <button
              className={styles.checkoutButton}
              onClick={handlelocalstorageremove}
            >
              {" "}
              Proceed to Checkout
            </button>
          </a>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
