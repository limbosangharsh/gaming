import React, { useEffect, useState } from "react";
import s from "./Navbar.module.css";
import { NavHeaders, INITIAL_DROPS } from "../../utils/constants/Constants";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Icon from "../../utils/icons/Icons";

const Navbar = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [drops] = useState(INITIAL_DROPS);
   const tickerItems = [...drops, ...drops, ...drops];
   const [cartCount, setCartCount] = useState(
      JSON.parse(localStorage.getItem("cart") || "[]").length,
   );

   const [dropdownOpen, setDropdownOpen] = useState(false);

   useEffect(() => {
      const updateCount = () => {
         setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);
      };

      window.addEventListener("cartUpdated", updateCount);
      return () => {
         window.removeEventListener("cartUpdated", updateCount);
      };
   }, []);

   const handleRouteSignup = () => {
      navigate("/signup");
   };

   const handleRouteSignin = () => {
      navigate("/signin");
   };

   const handleProfileRoutes = () => {
      navigate("/profile");
   };

   const [user, setUser] = useState(() =>
      JSON.parse(localStorage.getItem("skinvault_user")),
   );
   const handleLogout = () => {
      localStorage.removeItem("skinvault_user");
      localStorage.removeItem("orders");
      localStorage.removeItem("cart");
      setUser(null);
      setDropdownOpen(false);
      navigate("/signin");
   };

   useEffect(() => {
      const syncUser = () => {
         setUser(JSON.parse(localStorage.getItem("skinvault_user")));
      };

      window.addEventListener("userUpdated", syncUser);
      return () => window.removeEventListener("userUpdated", syncUser);
   }, []);



   return (
      <header className={s.header}>
         <nav className={s.container}>
            {/* ══ BRAND LOGO ══ */}
            <Link to="/" className={s.logo}>
               <div className={s.logoIcon}>
                  <span className={s.logoPulse}></span>
               </div>
               <span className={s.logoText}>
                  SKIN<span className={s.logoAccent}>VAULT</span>
               </span>
            </Link>

            {/* ══ NAVIGATION LINKS ══ */}
            <div className={s.middle}>
               {NavHeaders.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                     <Link
                        key={item.id}
                        to={item.path}
                        className={`${s.navLink} ${isActive ? s.activeLink : ""}`}
                     >
                        {item.label}
                        {isActive && <span className={s.activeIndicator} />}
                     </Link>
                  );
               })}
            </div>

            {/* ══ ACTION BUTTONS ══ */}
            <div className={s.end}>
               {user ? (
                  <div className={s.logged_nav}>
                     <div
                        className={s.cart_icon}
                        onClick={() => navigate("/cart")}
                     >
                        <Icon name={"cartIcon"} size={22} />
                        {cartCount > 0 && (
                           <span className={s.cart_badge}>{cartCount}</span>
                        )}
                     </div>
                     <div className={s.verticle_div}></div>

                     <span
                        className={s.user_initial}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                     >
                        <span className={s.user_letter}>
                           {user.firstName ? user.firstName[0] : user.email[0]}
                        </span>

                        <div
                           className={`${s.dropdown} ${dropdownOpen ? s.dropdown_open : ""}`}
                           onClick={(e) => e.stopPropagation()}
                        >
                           <div className={s.dropdown_header}>
                              <span className={s.dropdown_email}>
                                 {user.email}
                              </span>
                           </div>

                           <div className={s.dropdown_divider} />

                           <div
                              className={s.dropdown_item}
                              onClick={() => {
                                 navigate("/profile");
                                 setDropdownOpen(false);
                              }}
                           >
                              <Icon name="userIcon" size={14} />
                              My Profile
                           </div>
                           <div
                              className={s.dropdown_item}
                              onClick={() => {
                                 navigate("/cart");
                                 setDropdownOpen(false);
                              }}
                           >
                              <Icon name="cartIcon" size={14} />
                              Cart
                           </div>

                           <div className={s.dropdown_divider} />

                           <div
                              className={`${s.dropdown_item} ${s.dropdown_logout}`}
                              onClick={handleLogout}
                           >
                              <Icon name="logoutIcon" size={14} />
                              Log Out
                           </div>
                        </div>
                     </span>
                  </div>
               ) : (
                  <div>
                     <button className={s.btnGhost} onClick={handleRouteSignin}>
                        Sign In
                     </button>
                     <button className={s.btnSolid} onClick={handleRouteSignup}>
                        <span className={s.btnGlow}></span>
                        <span className={s.btnText}>Sign Up</span>
                     </button>
                  </div>
               )}
            </div>
         </nav>

         {/* ══ LIVE TICKER ══ */}
         <div className={s.liveTicker}>
            <div className={s.tickerTag}>
               <span className={s.livePulse}></span>
               <span>LIVE DROPS</span>
            </div>
            <div className={s.tickerWindow}>
               <div className={s.tickerTrack}>
                  {tickerItems.map((item, index) => (
                     <div key={`${item.id}-${index}`} className={s.tickerItem}>
                        <span
                           className={`${s.wearTag} ${s[item.wear.toLowerCase()]}`}
                        >
                           {item.wear}
                        </span>
                        <span className={s.itemName}>{item.name}</span>
                        <span className={s.itemPrice}>{item.price}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* ══ MOBILE BOTTOM NAV ══ */}
         <nav className={s.bottomNav}>
            <Link
               to="/"
               className={`${s.bottomNav_item} ${location.pathname === "/" ? s.bottomNav_item_active : ""}`}
            >
               <Icon name="homeIcon" size={20} />
               <span className={s.bottomNav_label}>Home</span>
            </Link>
            <Link
               to="/store"
               className={`${s.bottomNav_item} ${location.pathname === "/store" ? s.bottomNav_item_active : ""}`}
            >
               <Icon name="storeIcon" size={20} />
               <span className={s.bottomNav_label}>Store</span>
            </Link>
            <Link
               to="/cart"
               className={`${s.bottomNav_item} ${location.pathname === "/cart" ? s.bottomNav_item_active : ""}`}
            >
               <Icon name="cartIcon" size={20} />
               <span className={s.bottomNav_label}>Cart</span>
            </Link>
            <Link
               to="/contact"
               className={`${s.bottomNav_item} ${location.pathname === "/contact" ? s.bottomNav_item_active : ""}`}
            >
               <Icon name="contactIcon" size={20} />
               <span className={s.bottomNav_label}>Contact</span>
            </Link>
         </nav>
      </header>
   );
};

export default Navbar;
