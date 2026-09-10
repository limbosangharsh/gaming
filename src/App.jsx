import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Hero from "./pages/hero/Hero";
import TrustBar from "./pages/trustBar/TrustBar";
import TrendingCards from "./components/TrendingCards/TrendingCards";
import WhyUs from "./pages/whyUs/WhyUs";
import Footer from "./pages/footer/Footer";
import { ak47, gloves, knives, snipers } from "./utils/constants/Constants";
import "./styles/Variable.css";
import "./styles/Global.css";
import s from "./App.module.css";
import Auth from "./pages/auth/Auth";
import Store from "./pages/store/Store";
import ViewItem from "./pages/viewItem/ViewItem";
import Cart from "./pages/cart/Cart";
import CustomToast from "./utils/customToast/CustomToast";
import Orders from "./pages/orders/Orders";
import Home from "./pages/home/Home";

const ScrollToTop = () => {
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);
   return null;
};

const App = () => {
   const location = useLocation();
   const hideLayout = ["/signup", "/signin"].includes(location.pathname);
   const [toasts, setToasts] = useState([]);

   const removeToast = (id) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
   };

   useEffect(() => {
      const handler = (e) => {
         const id = Date.now();
         setToasts((prev) => [...prev, { id, ...e.detail }]);
      };
      window.addEventListener("showToast", handler);
      return () => window.removeEventListener("showToast", handler);
   }, []);

   return (
      <div className={s.wrapper}>
         <ScrollToTop />
         {toasts.map((toast, index) => (
            <CustomToast
               key={toast.id}
               open={true}
               onClose={() => removeToast(toast.id)}
               title={toast.title}
               description={toast.description}
               bottomOffset={24 + index * 80}
            />
         ))}
         {!hideLayout && <Navbar />}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
            <Route path="/signin" element={<Auth mode="signin" />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/:category" element={<Store />} />
            <Route path="/store/item/:id" element={<ViewItem />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Orders />} />
         </Routes>
         {/* {!hideLayout && <Footer />} */}
      </div>
   );
};

export default App;
