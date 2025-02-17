import React, { useEffect, useState } from "react";
import styles from "../ProductList/ProductList.module.css";
import Chatbot from "../Chatbot/Chatbot";
import Navbar from "../Navbar/Navbar";
import { getAllProduct } from "@/lib/api";
import ProductDetails from "../ProductDetails/Productdetail";
import ProductData from "../../../Json/Product.json";
const ProductList = () => {
  const [Products, setProducts] = useState();
  const [filteredProducts, setfilteredProducts] = useState();
  const [selectedSlug, setSelectedSlug] = useState("All");
  const [detailProducts, setdetailProducts] = useState();

  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    const getProduct = await getAllProduct();
    const compData = getProduct.data.products.nodes;
    const extractedProducts = compData?.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.variants.edges[0].node.price.amount,
      image: product.images.edges[0].node.src,
    }));

    setProducts(compData);
    // console.log("extractedProducts-------", extractedProducts);
  };

  console.log("productjson---", ProductData);

  const handleclick = (external_id) => {
    const filteredProducts = ProductData.filter(
      (product) => product.external_id === external_id
    );
    setdetailProducts(filteredProducts);
  };

  useEffect(() => {
    const filteredProducts =
      selectedSlug === "All"
        ? ProductData
        : ProductData.filter((product) => product.slug === selectedSlug);
    setfilteredProducts(filteredProducts);
  }, [selectedSlug]);

  return (
    <section className={styles.MainScro}>
      <div className={styles.Part1}>
        <div className={styles.Chatbot_div}>
          <Chatbot />
        </div>

        <div className={styles.Part2}>
          <div className={styles.Navbar_div}>
            {/* <Navbar /> */}
            <Navbar onSlugChange={setSelectedSlug} />
          </div>

          {/* <div className={styles.ProductList_div}>
            {filteredProducts?.map((product) => {
              return (
                <>
                  <div className={styles.flex}>
                    <div className={styles.grid}>
                      <div
                        className={styles.card}
                        onClick={() => handleclick(product.external_id)}
                      >
                        <img src={product.image} className={styles.image} />
                        <div className={styles.details}>
                          <p className={styles.name}>{product.title}</p>
                          <span className={styles.price}>{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            {detailProducts && <ProductDetails data={detailProducts} />}

          
          </div> */}
          <div className={styles.ProductList_div}>
            {detailProducts ? (
              <ProductDetails data={detailProducts} />
            ) : (
              filteredProducts?.map((product) => {
                return (
                  <div className={styles.flex} key={product.external_id}>
                    <div className={styles.grid}>
                      <div
                        className={styles.card}
                        onClick={() => handleclick(product.external_id)}
                      >
                        <img src={product.image} className={styles.image} />
                        <div className={styles.details}>
                          <p className={styles.name}>{product.title}</p>
                          <span className={styles.price}>{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;




// <Offcanvas
// className={styles.OffcanvasMain}
// show={show}
// onHide={handleClose}
// placement="end"
// >
// <Offcanvas.Header closeButton>
//   <Offcanvas.Title>My Cart</Offcanvas.Title>
// </Offcanvas.Header>
// <Offcanvas.Body>
//   <div className={styles.cartContent}>
//     {/* Static Product */}
//     <div className={styles.cartItem}>
//       <div className={styles.removeButton}>
//         <p>X</p>
//       </div>
//       <img
//         src={item?.image}
//         alt="Acme Slip-On Shoes"
//         className={styles.productImage}
//       />
//       <div className={styles.details}>
//         <p>{item?.title}</p>
//         <p className={styles.price}>{`$${item?.price}USD`}</p>
//         {/* <div className={styles.quantity}>
//           <button>-</button>
//           <span>4</span>
//           <button>+</button>
//         </div> */}
//         <div className={styles.quantity}>
//           <button
//             onClick={() =>
//               setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
//             }
//           >
//             -
//           </button>
//           <span>{quantity}</span>
//           <button
//             onClick={() => setQuantity((prev) => prev + 1)}
//           >
//             +
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className={styles.cartProduct}></div>

//   <div className={styles.footer}>
//     <div className={styles.summary}>
//       <p>
//         Taxes: <span>$0.00 USD</span>
//       </p>
//       <p>
//         Shipping: <span>Calculated at checkout</span>
//       </p>
//       <p>
//         Total: <span>$180.00 USD</span>
//       </p>
//     </div>
//     <button className={styles.checkoutButton}>
//       Proceed to Checkout
//     </button>
//   </div>
// </Offcanvas.Body>
// </Offcanvas>