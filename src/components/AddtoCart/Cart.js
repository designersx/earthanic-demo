import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Cart.module.css";
import {
  addToCart,
  createCart,
  getCartList,
  removeCartItem,
  updateCartItem,
} from "@/lib/api";
import { useFormState } from "react-dom";
// import Loader from "../Loader/Loader";
// import { debounce } from "lodash";

const CartOffcanvas = ({ show, handleClose, cartItemsdet, addToCartData, setCartCount= null  }) => {
  const [loading, setLoading] = useState(false); // New loading state
  const [cartItemss, setCartItemss] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [quantities, setQuantities] = useState({});
  const [totalTax, setTotalTax] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loader state


  useEffect(() => {
    getCartDetails();
  }, [cartItemsdet, addToCartData, show]);

  useEffect(() => {
    getCartDetails();
  }, []);

  // get cartlist
  const getCartDetails = async () => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return console.error("No Cart ID found!");
    setLoading(true);
    try {
      const cartResponse = await getCartList(cartId);
      const res = JSON.parse(cartResponse?.data);

      const checkoutLink = res?.data?.cart?.checkoutUrl || "";
      setCheckoutUrl(checkoutLink);
      const items =
        res?.data?.cart?.lines?.edges?.map((item) => {
          const selectedSize =
            item?.node?.merchandise?.selectedOptions?.find(
              (option) => option.name === "Size"
            )?.value || "No Size";

          return {
            title: item?.node?.merchandise?.product?.title || "No Title",
            imageUrl: item?.node?.merchandise?.image?.url || "",
            amount: item?.node?.merchandise?.price?.amount || "0",
            quantity: item?.node?.quantity || 1,
            id: item?.node?.id,
            size: selectedSize, // Size ko add kar diya object me
          };
        }) || [];

      setCartItemss(items);
      let abc = items?.length
      setCartCount = abc  

      // Initialize individual quantities
      const initialQuantities = {};
      items.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
      });
      setQuantities(initialQuantities);

      const total = res?.data?.cart?.cost?.totalAmount?.amount || "0";
      setTotalAmount(total);
      setTotalTax(res?.data?.cart?.cost?.totalTaxAmount?.amount || "0");
    } catch (error) {
      console.error("Error fetching cart details:", error);
    } finally {
      setLoading(false);
    }
  };

  // remove cartitem
  const removeCartitem = async (id) => {
    const cartId = localStorage.getItem("cartId");
    const lineId = id;
    setLoading(true);
    try {
      const response = await removeCartItem(cartId, lineId);

      await getCartDetails();
    } catch (error) {
      console.error("Error fetching cart details:", error);
    } finally {
      setLoading(false); // Loader stop
    }
  };

  // Increment Quantity
  const handleIncrement = (id) => {
    setIsLoading(true);
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 1) + 1;
      updateCartQuantity(id, newQuantity);
      return { ...prev, [id]: newQuantity };
    });
  };

  // Decrement Quantity
  const handleDecrement = (id) => {
    setIsLoading(true);
    setQuantities((prev) => {
      if (prev[id] > 1) {
        const newQuantity = prev[id] - 1;
        updateCartQuantity(id, newQuantity);
        return { ...prev, [id]: newQuantity };
      }
      return prev;
    });
  };

  // Update API with latest quantity
  const updateCartQuantity = async (id, quantity) => {
    const cartId = localStorage.getItem("cartId");
    await updateCartItem(cartId, [{ id, quantity }]); // Call API
    await getCartDetails(); // Refresh cart details
    setIsLoading(false);
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
            {cartItemss.length > 0 ? (
              cartItemss?.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <div
                    className={styles.removeButton}
                    onClick={() => removeCartitem(item.id)}
                  >
                    <p>X</p>
                  </div>
                  <img
                    src={item?.imageUrl}
                    alt={item?.title}
                    className={styles.productImage}
                  />
                  <div className={styles.details}>
                    <p>{item?.title}</p>
                    <p className={styles.price}>{`$${item?.amount} USD`}</p>
                    <p className={styles.price}>
                      <b>size:</b> {`${item?.size}`}
                    </p>
                    <div className={styles.quantity}>
                      <button onClick={() => handleDecrement(item.id)}>
                        -
                      </button>
                      <span>{quantities[item.id]}</span>
                      <button onClick={() => handleIncrement(item.id)}>
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

        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          <>
            <div className={styles.footer}>
              <div className={styles.summary}>
                <p>
                  Taxes: <span>{`$${totalTax} USD`}</span>
                </p>
                <p>
                  Shipping: <span>Calculated at checkout</span>
                </p>
                <p>
                  Total: <span>${totalAmount} USD</span>
                </p>
              </div>
              <a
                href={
                  cartItemss.length === 0
                    ? "https://demo.earthanic.com/"
                    : checkoutUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                <button
                  className={styles.checkoutButton}
                  // onClick={handlelocalstorageremove}
                >
                  Proceed to Checkout
                </button>
              </a>
            </div>
          </>
        )}
        {/* <div className={styles.footer}>
          <div className={styles.summary}>
            <p>
              Taxes: <span>{`$${totalTax} USD`}</span>
            </p>
            <p>
              Shipping: <span>Calculated at checkout</span>
            </p>
            <p>
              Total: <span>${totalAmount} USD</span>
            </p>
          </div>
          <a
            href={
              cartItemss.length === 0
                ? "https://demo.earthanic.com/"
                : checkoutUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            <button
              className={styles.checkoutButton}
              // onClick={handlelocalstorageremove}
            >
              Proceed to Checkout
            </button>
          </a>
        </div> */}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
