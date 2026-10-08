import React, { useEffect } from "react";
import s from "./CustomModal.module.css";
import Icon from "../../utils/icons/Icons";

const CustomModal = ({
   isOpen = false,
   onClose,
   title,
   subTitle,
   topDivider = true,
   bottomDivider = true,
   closeIcon = true,
   modalClassname = "",
   children,
}) => {
   useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e) => {
         if (e.key === "Escape") {
            onClose?.();
         }
      };

      document.addEventListener("keydown", handleEscape);

      document.body.style.overflow = "hidden";

      return () => {
         document.removeEventListener("keydown", handleEscape);
         document.body.style.overflow = "";
      };
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose?.();
      }
   };

   return (
      <div
         className={s.overlay}
         onMouseDown={handleOverlayClick}
         role="dialog"
         aria-modal="true"
         aria-labelledby={title ? "modal-title" : undefined}
      >
         <div className={`${s.modal} ${modalClassname}`}>
            {/* ══ HEADER ══ */}
            {(title || subTitle || closeIcon) && (
               <>
                  <div className={s.header}>
                     <div className={s.heading}>
                        {title && (
                           <h2 id="modal-title" className={s.title}>
                              {title}
                           </h2>
                        )}

                        {subTitle && <p className={s.subTitle}>{subTitle}</p>}
                     </div>

                     {closeIcon && (
                        <span className={s.closeIcon} onClick={onClose}>
                           <Icon name={"close"} size={20} />
                        </span>
                     )}
                  </div>

                  {topDivider && <div className={s.divider} />}
               </>
            )}

            {/* ══ CONTENT ══ */}
            <div className={s.content}>{children}</div>

            {/* ══ BOTTOM DIVIDER ══ */}
            {bottomDivider && <div className={s.divider} />}
         </div>
      </div>
   );
};

export default CustomModal;
