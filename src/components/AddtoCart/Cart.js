// import React, { useEffect, useState } from "react";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import styles from "./Cart.module.css";

// const CartOffcanvas = ({ show, handleClose }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [cartItems, setCartItems] = useState([]);
//   console.log("cartItems---", cartItems);

//   // LocalStorage se cart items get karna on page load
//   let getProduct = () => {
//     let savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//     if (
//       savedCartItems &&
//       JSON.stringify(savedCartItems) !== JSON.stringify(cartItems)
//     ) {
//       setCartItems(savedCartItems);
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       getProduct();
//     }, [2000]);
//   }, [cartItems, show]);

//   const handleRemoveItem = (external_id) => {
//     // Filter out the item with matching id
//     const updatedCartItems = cartItems.flat().filter((item) => item.external_id !== external_id);
//     console.log("updatedCartItems____",updatedCartItems)

//     // Update state and localStorage
//     setCartItems(updatedCartItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//   };

//   return (
//     <Offcanvas
//       className={styles.OffcanvasMain}
//       show={show}
//       onHide={handleClose}
//       placement="end"
//     >
//       <Offcanvas.Header closeButton>
//         <Offcanvas.Title>My Cart</Offcanvas.Title>
//       </Offcanvas.Header>
//       <Offcanvas.Body>
//         <div className={styles.cartContent}>
//           {cartItems.length > 0 ? (
//             cartItems.flat().map((item, index) => (
//               <div key={index} className={styles.cartItem}>
//                 <div
//                   className={styles.removeButton}
//                   onClick={() => handleRemoveItem(item.external_id)}
//                 >
//                   <p>X</p>
//                 </div>
//                 <img
//                   src={item?.image}
//                   alt={item?.title}
//                   className={styles.productImage}
//                 />
//                 <div className={styles.details}>
//                   <p>{item?.title}</p>
//                   <p className={styles.price}>{`$${item?.price} USD`}</p>
//                   <div className={styles.quantity}>
//                     <button
//                       onClick={() =>
//                         setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
//                       }
//                     >
//                       -
//                     </button>
//                     <span>{quantity}</span>
//                     <button onClick={() => setQuantity((prev) => prev + 1)}>
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>Your cart is empty.</p>
//           )}
//         </div>

//         <div className={styles.footer}>
//           <div className={styles.summary}>
//             <p>
//               Taxes: <span>$0.00 USD</span>
//             </p>
//             <p>
//               Shipping: <span>Calculated at checkout</span>
//             </p>
//             <p>
//               Total: <span>$180.00 USD</span>
//             </p>
//           </div>
//           <button className={styles.checkoutButton}>Proceed to Checkout</button>
//         </div>
//       </Offcanvas.Body>
//     </Offcanvas>
//   );
// };

// export default CartOffcanvas;

import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Cart.module.css";
import { Circles, Oval } from "react-loader-spinner";

const CartOffcanvas = ({ show, handleClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  console.log("cartItems---", cartItems);

  // LocalStorage se cart items get karna on page load
  let getProduct = () => {
    setLoading(true); // Set loading to true when data is being fetched
    let savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
    setLoading(false); // Once data is set, stop loading
  };

  useEffect(() => {
    setTimeout(() => {
      getProduct();
    }, 2000); // Simulating async fetch time
  }, [cartItems, show]);

  const handleRemoveItem = (external_id) => {
    const updatedCartItems = cartItems
      .flat()
      .filter((item) => item.external_id !== external_id);
    console.log("updatedCartItems____", updatedCartItems);

    // Update state and localStorage
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

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
              ))
            ) : (
              <p className="text-center">Your cart is empty.</p>
            )}
          </div>
        )}

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
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
