import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "./../baseUrl/baseUrl";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [events, setEvents] = useState([]);

  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const addToCart = async (itemId) => {
    try {
      // Update the cartItems state locally
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
  
      // Display success message
      toast.success("Added to cart");
  
      // If a token exists, call the backend API to update the cart
      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId }, // Send itemId in the request body
          {
            headers: {
              "Content-Type": "application/json", // Change content type to JSON
              Authorization: "Bearer " + token,
            },
          }
        );
      }
    } catch (error) {
      // Handle errors, if any
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart");
    }
  };
  
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    toast.success("Item removed");

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
    }
  };
  const fetchEvents = async () => {
    const response = await axios.get(`${url}/api/event/list`);
    setEvents(response.data.data);
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = events.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    setCartItems(response.data.cartData);
  };
  useEffect(() => {
    async function loadData() {
      await fetchEvents()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const contextValue = {
    token,
    setToken,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    events
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
