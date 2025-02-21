import React, { useEffect, useState } from "react";
import styles from "../ProductList/ProductList.module.css";
import Chatbot from "../Chatbot/Chatbot";
import Navbar from "../Navbar/Navbar";
import { addToCart, createCart, getAllProduct, getCartList } from "@/lib/api";
import ProductDetails from "../ProductDetails/Productdetail";
import ProductData from "../../../Json/Product.json";
import CartOffcanvas from "../AddtoCart/Cart";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

const ProductList = () => {
  const [Products, setProducts] = useState();
  const [filteredProducts, setfilteredProducts] = useState();
  const [selectedSlug, setSelectedSlug] = useState("All");
  const [detailProducts, setdetailProducts] = useState();
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addToCartData, setAddToCartData] = useState();
  const [loadingStates, setLoadingStates] = useState({});



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
  };

  const handleclick = (external_id) => {
    const filteredProducts = ProductData.filter(
      (product) => product.external_id === external_id
    );
    setdetailProducts(filteredProducts);
  };

  const handleProductClick = async (product) => {

    if (product.variantSizeId) {
      setSelectedProduct(product); // Modal open karne ke liye product store karo
      setSelectedSize(product?.variantSizeId[0]?.title);
      setModalOpen(true);
    } else {
      // handleclick(product.external_id);
      handleSubmitAndCreateCart(product?.variantId, product.external_id);
    }
  };

  useEffect(() => {
    const filteredProducts =
      selectedSlug === "All"
        ? ProductData
        : ProductData.filter((product) => product.slug === selectedSlug);
    setfilteredProducts(filteredProducts);

    // Agar slug badla, toh detailProducts ko clear karo
    setdetailProducts(undefined);
  }, [selectedSlug]);

  const handleSlugChange = (slug) => {
    setSelectedSlug(slug);

    // Agar slug 'All' ho, toh detailProducts ko undefined karenge
    if (slug === "All") {
      setdetailProducts(undefined);
    }
  };

  const handleSubmitAndCreateCart = async (variantId, productId) => {
    // if (!selectedSize) {
    //   alert("Please select a size before proceeding!");
    //   return;
    // }

    // let finalVariantId = variantId;
    // if (selectedProduct) {
    //   finalVariantId = selectedSize;
    // }
    // if (!finalVariantId) {
    //   console.error("Variant ID is undefined!");
    //   return;
    // }

    let finalVariantId = variantId;
   
    if (selectedProduct && selectedProduct.variantSizeId) {
      const matchedVariant = selectedProduct.variantSizeId.find(
        (variant) =>
          variant.title.toLowerCase() === selectedSize.toLowerCase() 
      );

      if (matchedVariant) {
        finalVariantId = matchedVariant.id;
      }
    }

    if (!finalVariantId) {
      console.error("Variant ID is undefined!");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [productId]: true }));
    setLoading(true);
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      const cart = await createCart();
      if (cart) {
        cartId = cart.id;
        localStorage.setItem("cartId", cartId);
        setCartId(cartId);
      }
    }

    let cartbodyitem = [
      {
        variantId: finalVariantId,
        quantity: 1,
      },
    ];

    try {
      const cartItem = await addToCart({
        cartId: cartId || "",
        products: cartbodyitem,
      });

      if (cartItem) {
        setShowCart(true);
        setAddToCartData(cartItem);
        setSelectedProduct(null);
        setSelectedSize("");
      }

    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false); // Stop loader
      setLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  useEffect(() => {
    if (addToCartData) {
      getCartList(cartId);
    }
  }, [addToCartData]);

  const handleClose = () => setShowCart(false);

  return (
    <section className={styles.MainScro}>
      <div className={styles.Part1}>
        <div className={styles.Chatbot_div}>
          <Chatbot />
        </div>

        <div className={styles.Part2}>
          <div className={styles.Navbar_div}>
            {/* <Navbar
              onSlugChange={setSelectedSlug}
              selectedSlug={selectedSlug}
            /> */}
            <Navbar onSlugChange={handleSlugChange} />
          </div>

          <div className={styles.ProductList_div}>
            {detailProducts ? (
              <ProductDetails
                data={detailProducts}
                onBack={() => setdetailProducts(undefined)}
              />
            ) : (
              filteredProducts?.map((product) => {
                return (
                  <div className={styles.flex} key={product.external_id}>
                    <div className={styles.grid}>
                      <div className={styles.card}>
                        <img
                          src={product.image}
                          className={styles.image}
                          onClick={() => handleclick(product.external_id)}
                        />
                        <div className={styles.details}>
                          <p className={styles.name}>{product.title}</p>
                          <span
                            className={styles.price}
                            onClick={() => handleProductClick(product)}
                          >
                            {loadingStates[product.external_id] ? (
                              <Loader />
                            ) : (
                              `$${Number(product.price).toFixed(2)}`
                            )}

                            {/* {loadingStates[product.external_id] ? <Loader /> : `$${product.price} `} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Modal for Size Selection */}
          {selectedProduct && (
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h3>Select Size for {selectedProduct.title}</h3>
                  <div className={styles.Sizes}>
                    {selectedProduct?.variantSizeId?.map((size, index) => (
                      <p
                        key={index}
                        className={`${styles.sizeOption} ${
                          selectedSize === size?.title ? styles.selected : ""
                        }`}
                        onClick={() => setSelectedSize(size?.title)}
                      >
                        {size.title}
                      </p>
                    ))}
                  </div>
                  <div className={styles.btnDiv}>
                    <button
                      onClick={handleSubmitAndCreateCart}
                      disabled={!selectedSize}
                      className={styles.subBtn}
                    >
                      {loading ? <Loader /> : "Submit"}
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => setSelectedProduct(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          <CartOffcanvas
            show={showCart}
            handleClose={handleClose}
            addToCartData={addToCartData}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductList;
