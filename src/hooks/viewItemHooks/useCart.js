// utils/hooks/useCart.js
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCart = (id) => {
   const navigate = useNavigate();
   const timerRef = useRef(null);
   const [animateCart, setAnimateCart] = useState(false);

   const addToCart = (skin, quantity) => {
      const user = localStorage.getItem("skinvault_user");
      if (!user) { navigate("/signin"); return; }

      window.dispatchEvent(
         new CustomEvent("showToast", {
            detail: {
               title: "Added to Cart",
               description: `${skin.weapon} | ${skin.name} — $${skin.price.toFixed(2)}`,
               onClick: () =>  navigate('/cart')
            },
         })
      );

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find((i) => i.id === skin.id);

      const updated = existing
         ? cart.map((item) =>
              item.id === skin.id
                 ? { ...item, quantity: item.quantity + quantity }
                 : item
           )
         : [...cart, { id: skin.id, quantity }];

      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));

      setAnimateCart(true);
      timerRef.current = setTimeout(() => setAnimateCart(false), 5000);
   };

   useEffect(() => {
      setAnimateCart(false);
      if (timerRef.current) clearTimeout(timerRef.current);
   }, [id]);

   return { animateCart, addToCart };
};

export default useCart;