
// import React, { useEffect, useState } from "react";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import styles from "./Cart.module.css";
// import { addToCart, createCart } from "@/lib/api";

// const CartOffcanvas = ({ show, handleClose, checkoutUrl }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true); // New loading state
//   const [Url, setUrl] = useState();

//   const getProduct = () => {
//     setLoading(true);
//     let savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//     if (savedCartItems) {
//       // Agar quantity nahi hai to usko 1 set karenge
//       const itemsWithQuantity = savedCartItems.flat().map((item) => ({
//         ...item,
//         quantity: item?.quantity || 1,
//       }));
//       setCartItems(itemsWithQuantity);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       getProduct();
//     }, 1000); // Simulating async fetch time
//   }, [cartItems, show]);

//   const handleRemoveItem = (external_id) => {
//     const updatedCartItems = cartItems
//       .flat()
//       .filter((item) => item.external_id !== external_id);
//     console.log("updatedCartItems____", updatedCartItems);

//     // Update state and localStorage
//     setCartItems(updatedCartItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     localStorage.removeItem("reqbody");
//   };

//   const handleQuantityChange = async (index, change) => {
//     const updatedCartItems = cartItems.map((item, idx) =>
//       idx === index
//         ? {
//             ...item,
//             quantity: Math.max(1, item.quantity + change), // Minimum 1 quantity
//           }
//         : item
//     );
//     setCartItems(updatedCartItems);
//     console.log("updatedCartItems", updatedCartItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//   };

//   // Total price calculation
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       return total + item.quantity * item.price; // Multiply quantity with price f
//     }, 0);
//   };
//   const totalPrice = calculateTotal();

//   // const cartItem = await addToCart({
//   //   cartId,
//   //   variantId: "gid://shopify/ProductVariant/46548933705898",
//   //   quantity: 1,
//   // });

//   const handlelocalstorageremove = () => {
//     localStorage.removeItem("reqbody");
//     localStorage.removeItem("cartItems");
//     localStorage.removeItem("cartId");
//   };

//   // useEffect(() => {
//   //   GetCartItems();
//   // }, []);

//   // const GetCartItems = async () => {
//   //   let savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//   //   let cartId = localStorage.getItem("cartId");
//   //   const cartbodyitem = savedCartItems?.flat()?.map((item) => ({
//   //     variantId: item.variantId, // Extract variant ID
//   //     quantity: 1, // Custom quantity
//   //   }));

//   //   console.log("cartbodyitem---...>>", cartbodyitem); // Debugging ke liye
//   //   console.log("cartid---...>>", cartId);
//   //   try {
//   //     const cartItem = await addToCart({
//   //       cartId,
//   //       products: cartbodyitem, // API call me pass karna
//   //     });
//   //     cartItem.map((ite) => {
//   //       setUrl(ite?.checkoutUrl);
//   //     });

//   //     console.log("Cart updated:", cartItem);
//   //   } catch (error) {
//   //     console.error("Error adding to cart:", error);
//   //   }
//   // };

//   // const  checkout = localStorage.getItem("checkoutUrl") || "";

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
//         {loading ? (
//           <div className={styles.loader}></div>
//         ) : (
//           <div className={styles.cartContent}>
//             {cartItems.length > 0 ? (
//               cartItems.flat().map((item, index) => (
//                 <div key={index} className={styles.cartItem}>
//                   <div
//                     className={styles.removeButton}
//                     onClick={() => handleRemoveItem(item.external_id)}
//                   >
//                     <p>X</p>
//                   </div>
//                   <img
//                     src={item?.image}
//                     alt={item?.title}
//                     className={styles.productImage}
//                   />
//                   <div className={styles.details}>
//                     <p>{item?.title}</p>
//                     <p className={styles.price}>{`$${item?.price} USD`}</p>
//                     <div className={styles.quantity}>
//                       <button onClick={() => handleQuantityChange(index, -1)}>
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => handleQuantityChange(index, 1)}>
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center">Your cart is empty.</p>
//             )}
//           </div>
//         )}

//         {/* <div className="mt-4">
//           <p>Cart ID: {cartId}</p>
//           <a
//             href={checkoutUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-700 underline"
//           >
//             Go to Checkout
//           </a>
//         </div> */}

//         <div className={styles.footer}>
//           <div className={styles.summary}>
//             <p>
//               Taxes: <span>$0.00 USD</span>
//             </p>
//             <p>
//               Shipping: <span>Calculated at checkout</span>
//             </p>
//             <p>
//               Total: <span>${totalPrice.toFixed(2)} USD</span>
//             </p>
//           </div>
//           <a
//             href={checkoutUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-700 underline"
//           >
//             <button
//               className={styles.checkoutButton}
//               onClick={handlelocalstorageremove}
//             >
//               {" "}
//               Proceed to Checkout
//             </button>
//           </a>
//         </div>
//       </Offcanvas.Body>
//     </Offcanvas>
//   );
// };

// export default CartOffcanvas;



// PRODUCT LIST PAGE 


// import React, { useEffect, useState } from "react";
// import styles from "../ProductList/ProductList.module.css";
// import Chatbot from "../Chatbot/Chatbot";
// import Navbar from "../Navbar/Navbar";
// import { addToCart, createCart, getAllProduct, getCartList } from "@/lib/api";
// import ProductDetails from "../ProductDetails/Productdetail";
// import ProductData from "../../../Json/Product.json";
// import CartOffcanvas from "../AddtoCart/Cart";
// import Modal from "../Modal/Modal";
// import Loader from "../Loader/Loader";

// const ProductList = () => {
//   const [Products, setProducts] = useState();
//   const [filteredProducts, setfilteredProducts] = useState();
//   const [selectedSlug, setSelectedSlug] = useState("All");
//   const [detailProducts, setdetailProducts] = useState();
//   const [showCart, setShowCart] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [checkoutUrl, setCheckoutUrl] = useState(null);
//   const [cartId, setCartId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [addToCartData, setAddToCartData] = useState();

//   useEffect(() => {
//     getproduct();
//   }, []);

//   const getproduct = async () => {
//     const getProduct = await getAllProduct();
//     const compData = getProduct.data.products.nodes;
//     const extractedProducts = compData?.map((product) => ({
//       id: product.id,
//       title: product.title,
//       description: product.description,
//       price: product.variants.edges[0].node.price.amount,
//       image: product.images.edges[0].node.src,
//     }));
//     setProducts(compData);
//   };

//   const handleclick = (external_id) => {
//     console.log("external_id", external_id);
//     const filteredProducts = ProductData.filter(
//       (product) => product.external_id === external_id
//     );
//     setdetailProducts(filteredProducts);
//   };

//   const handleProductClick = async (product) => {
//     if (product.size) {
//       setSelectedProduct(product); // Modal open karne ke liye product store karo
//       setSelectedSize(product?.size[0]);
//       setModalOpen(true);
//     } else {
//       handleclick(product.external_id); // Agar size nahi hai toh direct call
//     }
//   };

//   useEffect(() => {
//     const filteredProducts =
//       selectedSlug === "All"
//         ? ProductData
//         : ProductData.filter((product) => product.slug === selectedSlug);
//     setfilteredProducts(filteredProducts);

//     // Agar slug badla, toh detailProducts ko clear karo
//     setdetailProducts(undefined);
//   }, [selectedSlug]);

//   const handleSlugChange = (slug) => {
//     setSelectedSlug(slug);

//     // Agar slug 'All' ho, toh detailProducts ko undefined karenge
//     if (slug === "All") {
//       setdetailProducts(undefined);
//     }
//   };


//   const handleSubmitAndCreateCart = async () => {
//     if (!selectedSize) {
//       alert("Please select a size before proceeding!");
//       return;
//     }
//     setLoading(true);
//     const existingCartItems =
//       JSON.parse(localStorage.getItem("cartItems")) || [];
//     let cartbodyitem = [
//       ...existingCartItems.map((item) => ({
//         variantId: item.variantId,
//         quantity: 1,
//       })),
//       {
//         variantId: selectedProduct.variantId,
//         quantity: 1,
//       },
//     ];

//     let cartId = localStorage.getItem("cartId");
//     if (!cartId) {
//       const cart = await createCart();
//       if (cart) {
//         cartId = cart.id;
//         localStorage.setItem("cartId", cartId); // ✅ New cart ID store karo
//         setCartId(cartId);
//       }
//     }

//     try {
//       const cartItem = await addToCart({
//         cartId: cartId || "",
//         products: cartbodyitem, // ✅ API me sirf variantId aur quantity jayega
//       });

//       if (cartItem) {
//         // ✅ LocalStorage me pura product object store karna hai
//         const updatedCartItems = [...existingCartItems, selectedProduct];
//         localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

//         setCheckoutUrl(cartItem[0]?.checkoutUrl);
//         setShowCart(true);
//         setAddToCartData(cartItem);
//         setSelectedProduct(null); // Modal close
//         setSelectedSize(""); // Reset selected size
//       }
//       console.log({ addToCartData });
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };


  


//   useEffect(() => {
//     if (addToCartData) {
//       getCartList(cartId);
//     }
//   }, [addToCartData]);

//   const handleClose = () => setShowCart(false);

//   return (
//     <section className={styles.MainScro}>
//       <div className={styles.Part1}>
//         <div className={styles.Chatbot_div}>
//           <Chatbot />
//         </div>

//         <div className={styles.Part2}>
//           <div className={styles.Navbar_div}>
//             {/* <Navbar
//               onSlugChange={setSelectedSlug}
//               selectedSlug={selectedSlug}
//             /> */}
//             <Navbar onSlugChange={handleSlugChange} />
//           </div>

//           <div className={styles.ProductList_div}>
//             {detailProducts ? (
//               <ProductDetails
//                 data={detailProducts}
//                 onBack={() => setdetailProducts(undefined)}
//               />
//             ) : (
//               filteredProducts?.map((product) => {
//                 return (
//                   <div className={styles.flex} key={product.external_id}>
//                     <div className={styles.grid}>
//                       <div className={styles.card}>
//                         <img
//                           src={product.image}
//                           className={styles.image}
//                           onClick={() => handleclick(product.external_id)}
//                         />
//                         <div className={styles.details}>
//                           <p className={styles.name}>{product.title}</p>
//                           <span
//                             className={styles.price}
//                             onClick={() => handleProductClick(product)}
//                           >
//                             {`$${product.price}0 `}{" "}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* Modal for Size Selection */}
//           {selectedProduct && (
//             <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
//               <div className={styles.modal}>
//                 <div className={styles.modalContent}>
//                   <h3>Select Size for {selectedProduct.title}</h3>
//                   <div className={styles.Sizes}>
//                     {selectedProduct.size?.map((size, index) => (
//                       <p
//                         key={index}
//                         className={`${styles.sizeOption} ${
//                           selectedSize === size ? styles.selected : ""
//                         }`}
//                         onClick={() => setSelectedSize(size)}
//                       >
//                         {size}
//                       </p>
//                     ))}
//                   </div>
//                   <div className={styles.btnDiv}>
//                     <button
//                       onClick={handleSubmitAndCreateCart}
//                       disabled={!selectedSize}
//                       className={styles.subBtn}
//                     >
//                       {loading ? <Loader /> : "Submit"}
//                     </button>
//                     <button
//                       className={styles.cancelBtn}
//                       onClick={() => setSelectedProduct(null)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </Modal>
//           )}

//           <CartOffcanvas
//             show={showCart}
//             handleClose={handleClose}
//             addToCartData={addToCartData}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductList;



// PRODUCT DETAILS



// import React, { useEffect, useState } from "react";
// import styles from "./Productdetail.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import Modal from "../Modal/Modal";
// import CartOffcanvas from "../AddtoCart/Cart";
// import { addToCart, createCart, getCartList } from "@/lib/api";
// import Loader from "../Loader/Loader";

// const ProductDetails = ({ data, onBack, cartbodyiteem }) => {
//   // console.log("cartbodyiteem------->>", cartbodyiteem)
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [showCart, setShowCart] = useState(false);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedDescription, setSelectedDescription] = useState(""); // New state for storing description
//   const [loading, setLoading] = useState(false);
//   const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);
//   const [addToCartData, setAddToCartData] = useState();
//   const handleClose = () => setShowCart(false);
//   const handleShow = () => {
//     const existingCartItems =
//       JSON.parse(localStorage.getItem("cartItems")) || [];
//     const updatedCartItems = [...existingCartItems, data];
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     setCartItems(updatedCartItems);
//     setShowCart(true);
//   };

//   // Disable scrolling when modal is open
//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isModalOpen]);

//   const handleDescriptionClick = (description) => {
//     setSelectedDescription(description);
//     setModalOpen(true);
//   };
//   // Set default selected size to the first size///
//   useEffect(() => {
//     if (data?.length > 0) {
//       const firstItem = data[0];
//       if (firstItem?.size?.length > 0 && selectedSize === null) {
//         setSelectedSize(firstItem.size[0]);
//       }
//     }
//   }, [data, selectedSize]);

//   // shopify cart
//   // const [cartId, setCartId] = useState(null);
//   const [checkoutUrl, setCheckoutUrl] = useState(null);
//   const [cartbodyitem, setcartbodyitem] = useState([]);

//   // console.log("checkoutUrl---", checkoutUrl);

//   // console.log(cartId,"cartId-----");

//   // useEffect(() => {
//   //   getCartId(); // Call getCartId which will call reqbodyitem once cartId is set
//   // }, []);

//   // const getCartId = async () => {
//   //   const cart = await createCart();
//   //   // console.log("CART---", cart);
//   //   if (cart) {
//   //     setCartId(cart.id); // Set the cartId
//   //   }
//   // };

//   let arr = [];
//   let allProducts = new Set();

//   const reqbodyitem = () => {
//     if (!cartId) {
//       // If cartId is not yet set, do not proceed with the rest of the function
//       console.log("Cart ID is not available yet.");
//       return;
//     }

//     const newProduct = data?.map((variant) => ({
//       // cartId: cartId,
//       variantId: variant.variantId,
//       quantity: 1,
//     }));

//     // Get existing products from localStorage
//     const existingProducts = JSON.parse(localStorage.getItem("reqbody")) || [];

//     // Check if the new product already exists in the list (to avoid duplicates)
//     const combinedProducts = [...existingProducts];

//     // Add new product only if it's not already in the list
//     newProduct.forEach((product) => {
//       const exists = combinedProducts.some(
//         (existingProduct) => existingProduct.variantId === product.variantId
//       );
//       if (!exists) {
//         combinedProducts.push(product);
//       }
//     });

//     // Remove duplicates by creating a Set of stringified products
//     const uniqueProducts = Array.from(
//       new Set(combinedProducts.map((product) => JSON.stringify(product)))
//     ).map((product) => JSON.parse(product));

//     // Save the unique products back to localStorage
//     localStorage.setItem("reqbody", JSON.stringify(uniqueProducts));

//     // Update allProducts set with unique products
//     newProduct.forEach((product) => allProducts.add(JSON.stringify(product)));

//     // Convert allProducts set back to an array of objects
//     const allProductsArray = Array.from(allProducts).map((product) =>
//       JSON.parse(product)
//     );

//     arr.push(uniqueProducts);
//     setcartbodyitem(arr[0]);
//     // console.log({ cartbodyitem });

//     return arr[0];
//   };

//   // Call reqbodyitem after cartId is set
//   useEffect(() => {
//     if (cartId) {
//       reqbodyitem(); // Now call reqbodyitem only after cartId is available
//     }
//   }, [cartId]);

//   // console.log({ cartbodyitem });

//   // const handleCreateCart = async () => {
//   //   setLoading(true); // Start loader

//   //   let cartId = localStorage.getItem("cartId");

//   //   if (!cartId) {
//   //     cartId = await createCart();
//   //     localStorage.setItem("cartId", cartId?.id); // ✅ New cart ID store karo
//   //     setCartId(cartId?.id);

//   //   }

//   //   try {
//   //     const cartItem = await addToCart({
//   //       cartId:cartId ,
//   //       products: cartbodyitem,
//   //     });

//   //     if (cartItem) {
//   //       const existingCartItems =
//   //         JSON.parse(localStorage.getItem("cartItems")) || [];
//   //       const updatedCartItems = [...existingCartItems, ...data]

//   //       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//   //       setCartItems(updatedCartItems);
//   //       setCheckoutUrl(cartItem[0]?.checkoutUrl);
//   //       setShowCart(true);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error adding to cart:", error);
//   //   } finally {
//   //     setLoading(false); // Stop loader
//   //   }
//   // };

//   const handleCreateCart = async () => {
//     setLoading(true); // Start loader

//     let cartId = localStorage.getItem("cartId");

//     if (!cartId) {
//       const cart = await createCart();
//       if (cart) {
//         cartId = cart.id;
//         localStorage.setItem("cartId", cartId); // ✅ New cart ID store karo
//         setCartId(cartId);
//       }
//     }

//     // ✅ Get existing cart items from localStorage
//     const existingCartItems =
//       JSON.parse(localStorage.getItem("cartItems")) || [];

//     // ✅ API ke liye sirf variantId aur quantity bhejna hai
//     let cartbodyitem = [
//       ...existingCartItems.map((item) => ({
//         variantId: item.variantId,
//         quantity: 1, // Assuming each stored item has quantity 1
//       })),
//       ...data.map((item) => ({
//         variantId: item.variantId,
//         quantity: 1,
//       })),
//     ];

//     try {
//       const cartItem = await addToCart({
//         cartId: cartId,
//         products: cartbodyitem, // ✅ Ab sirf variantId aur quantity jayega API me
//       });

//       if (cartItem) {
//         const updatedCartItems = [...existingCartItems, ...data];
//         localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//         setCartItems(updatedCartItems);
//         setCheckoutUrl(cartItem[0]?.checkoutUrl);
//         setShowCart(true);
//         setAddToCartData(cartItem);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };
//   useEffect(() => {
//     if (addToCartData) {
//       getCartList(cartId);
//     }
//   }, [addToCartData]);
//   const getremoveitem = () => {
//     localStorage.removeItem("reqbody");
//     onBack();
//   };

//   // console.log("data----", data);
//   return (
//     <section>
//       <div className={styles.backButton} onClick={getremoveitem}>
//         X
//       </div>
//       <div className={styles.ProductDetails}>
//         {data.map((item) => {
//           const descriptionWords = item?.description.split(" ");
//           const isLongDescription = descriptionWords.length > 10;
//           const truncatedDescription = descriptionWords.slice(0, 10).join(" ");
//           ("...");

//           return (
//             <>
//               <div className={styles.ProductImg}>
//                 <img src={item?.image} />
//               </div>
//               <div className={styles.ProductContent}>
//                 <div className={styles.ProductTittle}>
//                   <h2>{item?.title}</h2>
//                 </div>
//                 <div className={styles.ProductPrice}>
//                   <p>{`$${item?.price}0 USD`}</p>
//                 </div>
//                 <hr className={styles.hr} />
//                 {item?.size?.length > 0 && (
//                   <>
//                     <div className={styles.SizeDiv}>
//                       <p>Size</p>
//                     </div>
//                     <div className={styles.Sizes}>
//                       {item.size.map((size, index) => (
//                         <p
//                           key={index}
//                           className={`${styles.sizeOption} ${
//                             selectedSize === size ? styles.selected : ""
//                           }`}
//                           onClick={() => setSelectedSize(size)}
//                         >
//                           {size}
//                         </p>
//                       ))}
//                     </div>
//                   </>
//                 )}

//                 <div className={styles.description}>
//                   <p>
//                     {isLongDescription
//                       ? truncatedDescription
//                       : item?.description}{" "}
//                     {isLongDescription && (
//                       <span
//                         onClick={() =>
//                           handleDescriptionClick(item?.description)
//                         }
//                         className={styles.readMore}
//                       >
//                         Read More
//                       </span>
//                     )}
//                   </p>
//                   <div
//                     className={styles.cartDiv}
//                     // onClick={handleShow}
//                     onClick={handleCreateCart}
//                   >
//                     {loading ? (
//                       // <div className={styles.loader}></div>
//                       <Loader />
//                     ) : (
//                       "Add to Cart"
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* OFFCANVAS */}

//               <CartOffcanvas
//                 show={showCart}
//                 handleClose={handleClose}
//                 checkoutUrl={checkoutUrl}
//                 cartItemsdet={addToCartData}
//               />

//               {/* Modal to show full description */}
//               <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
//                 <h2 className={styles.Pcontent}>Item Details</h2>
//                 <p>{selectedDescription}</p>{" "}
//                 {/* Display selected description */}
//               </Modal>
//             </>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default ProductDetails;










  // let arr = [];
  // let allProducts = new Set();

  // const reqbodyitem = () => {
  //   if (!cartId) {
  //     // If cartId is not yet set, do not proceed with the rest of the function
  //     console.log("Cart ID is not available yet.");
  //     return;
  //   }

  //   const newProduct = data?.map((variant) => ({
  //     // cartId: cartId,
  //     variantId: variant.variantId,
  //     quantity: 1,
  //   }));

  //   // Get existing products from localStorage
  //   const existingProducts = JSON.parse(localStorage.getItem("reqbody")) || [];

  //   // Check if the new product already exists in the list (to avoid duplicates)
  //   const combinedProducts = [...existingProducts];

  //   // Add new product only if it's not already in the list
  //   newProduct.forEach((product) => {
  //     const exists = combinedProducts.some(
  //       (existingProduct) => existingProduct.variantId === product.variantId
  //     );
  //     if (!exists) {
  //       combinedProducts.push(product);
  //     }
  //   });

  //   // Remove duplicates by creating a Set of stringified products
  //   const uniqueProducts = Array.from(
  //     new Set(combinedProducts.map((product) => JSON.stringify(product)))
  //   ).map((product) => JSON.parse(product));

  //   // Save the unique products back to localStorage
  //   localStorage.setItem("reqbody", JSON.stringify(uniqueProducts));

  //   // Update allProducts set with unique products
  //   newProduct.forEach((product) => allProducts.add(JSON.stringify(product)));

  //   // Convert allProducts set back to an array of objects
  //   const allProductsArray = Array.from(allProducts).map((product) =>
  //     JSON.parse(product)
  //   );

  //   arr.push(uniqueProducts);
  //   setcartbodyitem(arr[0]);
  //   // console.log({ cartbodyitem });

  //   return arr[0];
  // };

  // // Call reqbodyitem after cartId is set
  // useEffect(() => {
  //   if (cartId) {
  //     reqbodyitem(); // Now call reqbodyitem only after cartId is available
  //   }
  // }, [cartId]);

  // new cart 


  // import React, { useEffect, useState } from "react";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import styles from "./Cart.module.css";
// import {
//   addToCart,
//   createCart,
//   getCartList,
//   removeCartItem,
//   updateCartItem,
// } from "@/lib/api";
// import Loader from "../Loader/Loader";

// const CartOffcanvas = ({ show, handleClose, cartItemsdet, addToCartData }) => {
//   const [loading, setLoading] = useState(false); // New loading state
//   const [cartItemss, setCartItemss] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [checkoutUrl, setCheckoutUrl] = useState("");
//   const [quantities, setQuantities] = useState({});
//   const [totalTax, setTotalTax] = useState(0);
//   const [isLoading, setIsLoading] = useState(false); // Loader state

//   useEffect(() => {
//     getCartDetails();
//   }, [cartItemsdet, addToCartData]);

//   useEffect(() => {
//     getCartDetails();
//   }, []);

//   // get cartlist
//   const getCartDetails = async () => {
//     const cartId = localStorage.getItem("cartId");
//     if (!cartId) return console.error("No Cart ID found!");

//     try {
//       const cartResponse = await getCartList(cartId);
//       const res = JSON.parse(cartResponse?.data);

//       const checkoutLink = res?.data?.cart?.checkoutUrl || "";
//       setCheckoutUrl(checkoutLink);
//       console.log("respose-->", res?.data?.cart);
//       const items =
//         res?.data?.cart?.lines?.edges?.map((item) => ({
//           title: item?.node?.merchandise?.product?.title || "No Title",
//           imageUrl: item?.node?.merchandise?.image?.url || "",
//           amount: item?.node?.merchandise?.price?.amount || "0",
//           quantity: item?.node?.quantity || 1,
//           id: item?.node?.id,
//         })) || [];

//       setCartItemss(items);

//       // Initialize individual quantities
//       const initialQuantities = {};
//       items.forEach((item) => {
//         initialQuantities[item.id] = item.quantity;
//       });
//       setQuantities(initialQuantities);

//       const total = res?.data?.cart?.cost?.totalAmount?.amount || "0";
//       setTotalAmount(total);
//       setTotalTax(res?.data?.cart?.cost?.totalTaxAmount?.amount || "0");
//     } catch (error) {
//       console.error("Error fetching cart details:", error);
//     }
//   };

//   // remove cartitem
//   const removeCartitem = async (id) => {
//     const cartId = localStorage.getItem("cartId");
//     const lineId = id;
//     setLoading(true);
//     try {
//       const response = await removeCartItem(cartId, lineId);
//       console.log(" remove response--->", response);
//       await getCartDetails();
//     } catch (error) {
//       console.error("Error fetching cart details:", error);
//     } finally {
//       setLoading(false); // Loader stop
//     }
//   };

//   // Increment Quantity
//   const handleIncrement = (id) => {
//     setIsLoading(true);
//     setQuantities((prev) => {
//       const newQuantity = (prev[id] || 1) + 1;
//       updateCartQuantity(id, newQuantity);
//       return { ...prev, [id]: newQuantity };
//     });
//   };

//   // Decrement Quantity
//   const handleDecrement = (id) => {
//     setIsLoading(true);
//     setQuantities((prev) => {
//       if (prev[id] > 1) {
//         const newQuantity = prev[id] - 1;
//         updateCartQuantity(id, newQuantity);
//         return { ...prev, [id]: newQuantity };
//       }
//       return prev;
//     });
//   };

//   // Update API with latest quantity
//   const updateCartQuantity = async (id, quantity) => {
//     const cartId = localStorage.getItem("cartId");
//     await updateCartItem(cartId, [{ id, quantity }]); // Call API
//     await getCartDetails(); // Refresh cart details
//     setIsLoading(false);
//   };

//   const handlelocalstorageremove = () => {
//     window.location.reload();
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
//         {loading ? (
//           <div className={styles.loader}></div>
//         ) : (
//           <div className={styles.cartContent}>
//             {cartItemss.length > 0 ? (
//               cartItemss?.map((item, index) => (
//                 <div key={index} className={styles.cartItem}>
//                   <div
//                     className={styles.removeButton}
//                     onClick={() => removeCartitem(item.id)}
//                   >
//                     <p>X</p>
//                   </div>
//                   <img
//                     src={item?.imageUrl}
//                     alt={item?.title}
//                     className={styles.productImage}
//                   />
//                   <div className={styles.details}>
//                     <p>{item?.title}</p>
//                     <p className={styles.price}>{`$${item?.amount} USD`}</p>
//                     <div className={styles.quantity}>
//                       <button onClick={() => handleDecrement(item.id)}>
//                         -
//                       </button>
//                       <span>{quantities[item.id]}</span>
//                       <button onClick={() => handleIncrement(item.id)}>
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center">Your cart is empty.</p>
//             )}
//           </div>
//         )}

//         {isLoading ? (
//           <div className={styles.loader}></div>
//         ) : (
//           <>
//             <div className={styles.footer}>
//               <div className={styles.summary}>
//                 <p>
//                   Taxes: <span>{`$${totalTax} USD`}</span>
//                 </p>
//                 <p>
//                   Shipping: <span>Calculated at checkout</span>
//                 </p>
//                 <p>
//                   Total: <span>${totalAmount} USD</span>
//                 </p>
//               </div>
//               <a
//                 href={
//                   cartItemss.length === 0
//                     ? "https://demo.earthanic.com/"
//                     : checkoutUrl
//                 }
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-700 underline"
//               >
//                 <button
//                   className={styles.checkoutButton}
//                   // onClick={handlelocalstorageremove}
//                 >
//                   Proceed to Checkout
//                 </button>
//               </a>
//             </div>
//           </>
//         )}
//       </Offcanvas.Body>
//     </Offcanvas>
//   );
// };

// export default CartOffcanvas;
