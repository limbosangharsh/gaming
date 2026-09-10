import React from "react";
import s from "./EmptyStore.module.css";
import Icon from "../icons/Icons";
import { useNavigate } from "react-router-dom";

const EmptyStore = ({
   icon = "cartIcon",
   title = "Your cart is empty",
   desc = "Browse the store and add a skin to see it here.",
   btnLabel = "BROWSE STORE",
   btnLink = "/store",
}) => {
   const navigate = useNavigate();

   return (
      <div className={s.wrapper}>
         <div className={s.icon_wrap}>
            <Icon name={icon} size={32} color="#525252" />
         </div>
         <h3 className={s.title}>{title}</h3>
         <p className={s.desc}>{desc}</p>
         <button className={s.btn} onClick={() => navigate(btnLink)}>
            {btnLabel}
         </button>
      </div>
   );
};

export default EmptyStore;
