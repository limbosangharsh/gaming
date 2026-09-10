import { useState } from "react";
import { allSkins } from "../../utils/constants/Constants";
import { useNavigate } from "react-router-dom";

export const useCartData = () => {
   const navigate = useNavigate("");
   const [cartData, setCartData] = useState(
      JSON.parse(localStorage.getItem("cart") || "[]"),
   );
   const [loading, setLoading] = useState(false);
   const cartItems = cartData.map((item) => ({
      ...allSkins.find((skin) => skin.id === item.id),
      quantity: item.quantity,
   }));

const isCartEmpty = cartItems.length === 0;
   const syncCart = (updatedCart) => {
      setCartData(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
   };

   const handleIncrementQuantity = (id) => {
      let updatedQuantity = cartData.map((item) =>
         item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      syncCart(updatedQuantity);
   };

   const handleDecrementQuantity = (id) => {
      let updatedQuantity = cartData.map((item) =>
         item.id === id
            ? { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - 1 }
            : item,
      );

      syncCart(updatedQuantity);
   };

   const handleRemoveFromCart = (id, setErrors) => {
      let updatedCart = cartData.filter((item) => item.id !== id);
      syncCart(updatedCart);
      window.dispatchEvent(
         new CustomEvent("showToast", {
            detail: {
               title: "Remove from cart",
               description: id,
            },
         }),
      );
      setErrors({});
   };

   const handlePlaceOrder = () => {
      if (isCartEmpty) return;
      setLoading(true);

      setTimeout(() => {
         setLoading(false);
         window.dispatchEvent(
            new CustomEvent("showToast", {
               detail: {
                  title: "Order Placed Successfully!",
                  description: "Skins on their way to Steam inventory.",
               },
            }),
         );
         const existing = JSON.parse(localStorage.getItem("orders") || "[]");
         const newOrder = {
            id: `SV-${Date.now()}`,
            items: cartItems.map(
               ({
                  id,
                  name,
                  weapon,
                  condition,
                  price,
                  quantity,
                  rarity,
                  float,
                  image,
               }) => ({
                  id,
                  name,
                  weapon,
                  condition,
                  price,
                  quantity,
                  rarity,
                  float,
                  image,
               }),
            ),
            total: cartItems.reduce(
               (acc, item) => acc + item.price * item.quantity,
               0,
            ),
            placedAt: new Date().toISOString(),
            status: "delivering",
         };
         localStorage.setItem(
            "orders",
            JSON.stringify([...existing, newOrder]),
         );
         syncCart([]);
      }, 1000);
   };

   console.log("is Cart Empty ", isCartEmpty);

   return {
      cartData,
      cartItems,
      handleIncrementQuantity,
      handleDecrementQuantity,
      handleRemoveFromCart,
      isCartEmpty,
      handlePlaceOrder,
      loading,
   };
};
