import { useLocation } from "react-router-dom";

import Icon from "../../utils/icons/Icons";

import s from "./Breadcrumb.module.css";
import { useNavigate } from "react-router-dom";

const PATHS = [
   { path: "/", label: "Home" },

   { path: "/store", label: "Store" },

   { path: "/cart", label: "Cart" },

   { path: "/checkout", label: "Checkout" },

   { path: "/orders", label: "Orders" },
];

const BreadCrumb = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const currentPage = PATHS.find((item) => item.path === location.pathname);

   const isItemPage = location.pathname.startsWith("/store/");

   const itemId = isItemPage ? location.pathname.split("/").pop() : null;

   const isCheckoutPage = location.pathname === "/checkout";

   const handlRouteHome = () => {
      navigate("/");
   };

   const handleRouteStore = () => {
      navigate("/store");
   };

   const handleRouteCart = () => {
      navigate("/cart");
   };

   return (
      <div className={s.page}>
         {/* Home */}
         <span onClick={handlRouteHome}>Home</span>

         {/* Everything after Home */}
         {location.pathname !== "/" && (
            <>
               <div className={s.hold_whit}>
                  <Icon name="arrowRightIcon" size={16} />
               </div>

               <div className={s.hold_whit}>
                  <span
                     onClick={
                        isItemPage
                           ? handleRouteStore
                           : isCheckoutPage
                             ? handleRouteCart
                             : undefined
                     }
                     className={isItemPage || isCheckoutPage ? s.clickable : ""}
                  >
                     {isItemPage
                        ? "Store"
                        : isCheckoutPage
                          ? "Cart"
                          : currentPage?.label}
                  </span>
               </div>
            </>
         )}

         {/* Item page */}
         {isItemPage && (
            <>
               <div className={s.hold_whit}>
                  <Icon name="arrowRightIcon" size={16} />
               </div>

               <div className={s.hold_whit}>
                  <span>{itemId}</span>
               </div>
            </>
         )}

         {/* Checkout page */}
         {isCheckoutPage && (
            <>
               <div className={s.hold_whit}>
                  <Icon name="arrowRightIcon" size={16} />
               </div>

               <div className={s.hold_whit}>
                  <span>Checkout</span>
               </div>
            </>
         )}
      </div>
   );
};

export default BreadCrumb;
