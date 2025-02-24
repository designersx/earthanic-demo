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
export const addToCart = async ({ cartId, products }) => {
  try {
    const response = await axios.post(`${url}add-to-cart`, {
      cartId,
      products,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return null;
  }
};

// get cartlist
export const getCartList = async (cartId) => {
  try {
    const response = await fetch(`${url}get-cartlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return null;
  }
};

// remove cartitem
export const removeCartItem = async (cartId, lineId) => {
  try {
    const response = await fetch(`${url}remove-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: {
          cartId: cartId,
          lineIds: lineId, // Ensure it's an array
        },
      }),
    });

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

// update quantity
export const updateCartItem = async (cartId, cartItems) => {
  try {
    const response = await fetch(`${url}update-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: {
          cartId,
          items: cartItems.map((item) => ({
            id: item.id, // CartLine ID
            quantity: item.quantity, // New quantity
          })),
        },
      }),
    });
    console.log("response-----", response);

    const data = await response.json();

    if (data.error) {
      console.error("Error updating cart:", data.error);
      return null;
    }

    return data; // Updated cart data
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
