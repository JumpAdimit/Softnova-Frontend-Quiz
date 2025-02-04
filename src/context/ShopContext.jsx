import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {

  const currency = '฿'
  const shippingCost = 0

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // Function add to cart
  const addToCart = async (itemId, quantity) => {

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = {};
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  // Function cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      try {
        if (cartItems[items] > 0) {
          totalCount += cartItems[items];
        }
      } catch (error) { }
    }
    return totalCount;
  };

  // Function update quantity
  const updateQuantity = (itemId, quantity) => {
    setCartItems((prevCart) => {
      let cartData = { ...prevCart };

      if (quantity <= 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId] = quantity;
      }

      return cartData;
    });
  };

  // Function calculate total amount
  const getCartAmount = () => {
    // Separate discounted and regular items
    const { discountedItems, regularItemsTotal } = separateItems(cartItems, products);
  
    // Calculate discountedTotal
    const discountedTotal = applyDiscounts(discountedItems, products);
  
    // Calculate total
    const totalAmount = discountedTotal + regularItemsTotal;
  
    return totalAmount;
  };
  
  // Function to separate discounted and regular
  const separateItems = (cartItems, products) => {
    let discountedItems = {};
    let regularItemsTotal = 0;
  
    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);
      if (!itemInfo) continue;
  
      const quantity = cartItems[item];
      if (quantity > 0) {
        if (itemInfo.discount === "Harry Potter Series") {
          discountedItems[item] = quantity;
        } else {
          regularItemsTotal += itemInfo.price * quantity;
        }
      }
    }
  
    return { discountedItems, regularItemsTotal };
  };
  
  // Function calculate discountedTotal
  const applyDiscounts = (discountedItems, products) => {
    let discountedTotal = 0;
  
    while (Object.keys(discountedItems).length > 0) {
      const cartLength = Object.keys(discountedItems).length;
      const stepAmount = calculateStepAmount(discountedItems, products);
  
      // Apply discount
      const discountMultiplier = getDiscountMultiplier(cartLength);
      discountedTotal += stepAmount * discountMultiplier;
    }
  
    return discountedTotal;
  };
  
  // Function calculate the step amount
  const calculateStepAmount = (discountedItems, products) => {
    let stepAmount = 0;
  
    for (const item in discountedItems) {
      const itemInfo = products.find((product) => product._id === item);
      if (!itemInfo) continue;
  
      stepAmount += itemInfo.price;
  
      // Reduce quantity item
      if (discountedItems[item] > 1) {
        discountedItems[item] -= 1;
      } else {
        delete discountedItems[item];
      }
    }
  
    return stepAmount;
  };
  
  // Function discount multiplier
  const getDiscountMultiplier = (cartLength) => {
    switch (cartLength) {
      case 2:
        return 0.9; // 10% discount
      case 3:
        return 0.8; // 20% discount
      case 4:
        return 0.7; // 30% discount
      case 5:
        return 0.6; // 40% discount
      case 6:
        return 0.5; // 50% discount
      case 7:
        return 0.4; // 60% discount
      default:
        return 1; // No discount
    }
  };

  const value = {
    products, currency, shippingCost, getCartCount, addToCart, updateQuantity, getCartAmount, cartItems, search, setSearch, showSearch, setShowSearch
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;