import axios from "axios";

// let url = "http://localhost:2525/";

let url = "https://earthanic.truet.net/";

// get products
export async function getAllProduct() {
  try {
    let response = await fetch(url + "uvdvFvQz1BXdWQC", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: "uvdvFvQz1BXdWQC" }),
    });
    let data = JSON.parse(await response.text());
    if (data?.data) {
      let cdata = JSON.parse(data.data);
      // console.log({ cdata });
      return cdata;
    }
  } catch (error) {
    console.error("error in getting product", error);
  }
}

// create cart
export const createCart = async () => {
  try {
    const response = await axios.post(`${url}create-cart`);
    return response.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    return null;
  }
};

// add to cart
export const addToCart = async ({cartId,products
}) => {
  try {
    const response = await axios.post(`${url}add-to-cart`, {
      cartId,products
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return null;
  }
};
