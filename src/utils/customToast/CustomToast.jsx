import React, { useEffect, useState } from "react";
import s from "./CustomToast.module.css";
import Icon from "../icons/Icons";

const CustomToast = ({
   title,
   description,
   showCloseIcon = true,
   toastTimer = 5000,
   prefixToastIcon,
   prefixToastIconSize,
   prefixToastIconColor,
   toastType = "cart",
   open = false,
   onClose,
   bottomOffset = 24, // ← add this
}) => {
   const [openToast, setOpenToast] = useState(false);
   const [hide, setHide] = useState(false);
   const [toastData, setToastData] = useState({ title: "", description: "" });

   useEffect(() => {
      if (open) {
         setHide(false);
         setOpenToast(true);
      }
   }, [open]);

   const handleOnClose = () => {
      setHide(true);
   };

   const handleAnimationEnd = () => {
      if (hide) {
         setOpenToast(false);
         setHide(false);
         if (onClose) onClose();
      }
   };

   useEffect(() => {
      const handler = (e) => {
         setToastData(e.detail);
         setShowToast(true);
      };
      window.addEventListener("showToast", handler);
      return () => window.removeEventListener("showToast", handler);
   }, []);

   useEffect(() => {
      if (openToast) {
         const timer = setTimeout(() => handleOnClose(), toastTimer);
         return () => clearTimeout(timer);
      }
   }, [openToast]);

   return (
      <>
         {openToast && (
            <div
               className={`${s.wrapper} ${hide ? s.hide : ""}`}
               style={{ "--bottom-offset": `${bottomOffset}px` }}
               onAnimationEnd={handleAnimationEnd}
            >
               <div className={s.hold_content}>
                  <span className={s.typeIcon}>
                     <Icon name={"cartIcon"} size={18} />
                  </span>
                  <div className={s.content}>
                     <label className={s.title}>{title}</label>
                     <span className={s.desc}>{description}</span>
                  </div>
               </div>

               {showCloseIcon && (
                  <span className={s.close_icon} onClick={handleOnClose}>
                     <Icon name={"close"} />
                  </span>
               )}
            </div>
         )}
      </>
   );
};

export default CustomToast;
