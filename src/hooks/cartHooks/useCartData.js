import { useEffect, useState } from "react";
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

   const [initialItem, setInitialItem] = useState(cartItems[0]?.id ?? null);

   const selectedItem = cartItems.find((item) => item.id === initialItem); // img filtering

   const handleInitialItem = (id) => {
      const item = cartItems.find((item) => item.id === id);

      setInitialItem(id);

      window.dispatchEvent(
         new CustomEvent("initialItemChanged", {
            detail: {
               id,
               item,
            },
         }),
      );
   };

   useEffect(() => {
      const handleChange = (event) => {
         const { id, item } = event.detail;

         setInitialItem(id);

         // console.log("Updated ID:", id);
         // console.log("Updated item:", item);
      };

      window.addEventListener("initialItemChanged", handleChange);

      return () => {
         window.removeEventListener("initialItemChanged", handleChange);
      };
   }, []);

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
      const updatedCart = cartData.filter((item) => item.id !== id);

      // If the removed item was selected
      if (initialItem === id) {
         const nextSelectedItem = updatedCart[0];

         setInitialItem(nextSelectedItem?.id ?? null);
      }

      syncCart(updatedCart);

      window.dispatchEvent(
         new CustomEvent("showToast", {
            detail: {
               title: "Removed from cart",
               description: id,
            },
         }),
      );

      setErrors({});
   };


   // console.log(selectedItem)
   const handleNavigateCheckout = () => {
      navigate("/checkout")
      // console.log('hello world ')
   }
   const handlePlaceOrder = () => {
      if (isCartEmpty) return;
      setLoading(true);
      navigate("/checkout");

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
            ) * 1.02,
            placedAt: new Date().toISOString(),
            status: "delivering",
         };
         localStorage.setItem(
            "orders",
            JSON.stringify([...existing, newOrder]),
         );
         syncCart([]);
      }, 6000);
   };

   return {
      cartData,
      cartItems,
      handleIncrementQuantity,
      handleDecrementQuantity,
      handleRemoveFromCart,
      isCartEmpty,
      handlePlaceOrder,
      loading,
      initialItem,
      handleInitialItem,
      selectedItem,
      handleNavigateCheckout
   };
};
