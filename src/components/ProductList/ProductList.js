import React, { useEffect, useState } from "react";
import styles from "../ProductList/ProductList.module.css";
import Chatbot from "../Chatbot/Chatbot";
import Navbar from "../Navbar/Navbar";
import { getAllProduct } from "@/lib/api";
import ProductDetails from "../ProductDetails/Productdetail";
import ProductData from "../../../Json/Product.json";
import CartOffcanvas from "../AddtoCart/Cart";

const ProductList = () => {
  const [Products, setProducts] = useState();
  const [filteredProducts, setfilteredProducts] = useState();
  const [selectedSlug, setSelectedSlug] = useState("All");
  const [detailProducts, setdetailProducts] = useState();
  const [showCart, setShowCart] = useState(false);

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
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);



  // Lens function start //
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState(null); // Track hovered image

  const handleMouseMove = (e, productId) => {
    const { left, top } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setHoveredImage(productId); // Set hovered image ID
    setLensPosition({ x, y });
  };

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
              <ProductDetails data={detailProducts} onBack={() => setdetailProducts(undefined)} />
            ) : (
              filteredProducts?.map((product) => {
                return (
                  <div className={styles.flex} key={product.external_id}>
                    <div className={styles.grid}>
                      <div className={styles.card}
                        onMouseEnter={() => setHoveredImage(product.id)} // Hover start
                        onMouseLeave={() => setHoveredImage(null)} // Hover end
                        onMouseMove={(e) => handleMouseMove(e, product.id)}
                      >
                        <img src={product.image} className={styles.image} />

                        {hoveredImage === product.id && (
                          <div
                            className={styles.lens}
                            style={{
                              left: `${lensPosition.x}px`,
                              top: `${lensPosition.y}px`,
                              display: "block",
                            }}
                          />
                        )}

                        {/* 👇 Jab details par cursor aaye, toh lens hatao */}
                        <div
                          className={styles.details}
                          onMouseEnter={() => setHoveredImage(null)} // Details par enter kare toh lens hide ho
                          onMouseLeave={() => setHoveredImage(product.id)} // Details se nikle toh wapas show ho
                          onClick={() => handleclick(product.external_id)}
                        >
                          <p className={styles.name}>{product.title}</p>
                          <span className={styles.price}>{`$${product.price}0 `}</span>
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
