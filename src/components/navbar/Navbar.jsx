import React, { useEffect, useState } from "react";
import s from "./Navbar.module.css";
import { NavHeaders, INITIAL_DROPS } from "../../utils/constants/Constants";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../../utils/icons/Icons";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { useSort } from "../../hooks/storeHooks/useSort.hooks";

const Navbar = () => {
   const { openSidebar, deviceFilter, toggleSidebar } = useSort();
   const navigate = useNavigate();
   const location = useLocation();
   const [drops] = useState(INITIAL_DROPS);
   const tickerItems = [...drops, ...drops, ...drops];
   const [cartCount, setCartCount] = useState(
      JSON.parse(localStorage.getItem("cart") || "[]").length,
   );

   const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleRouteSignup = () => {
      navigate("/signup");
   };

   const handleRouteSignin = () => {
      navigate("/signin");
   };

   const handleProfileRoutes = () => {
      navigate("/orders");
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

   const handleFilterClick = () => {
      toggleSidebar();
   };

   useEffect(() => {
      const updateCount = () => {
         setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);
      };

      window.addEventListener("cartUpdated", updateCount);
      return () => {
         window.removeEventListener("cartUpdated", updateCount);
      };
   }, []);

   useEffect(() => {
      const syncUser = () => {
         setUser(JSON.parse(localStorage.getItem("skinvault_user")));
      };

      window.addEventListener("userUpdated", syncUser);
      return () => window.removeEventListener("userUpdated", syncUser);
   }, []);

   useEffect(() => {
      const handleBodyClick = () => {
         setDropdownOpen(false);
      };

      document.body.addEventListener("click", handleBodyClick);

      return () => {
         document.body.removeEventListener("click", handleBodyClick);
      };
   }, []);

   const filterClass =
      location.pathname === "/store" ? s.storeFilter : s.otherFilter;

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
                        onClick={(e) => {
                           (setDropdownOpen(!dropdownOpen),
                              e.stopPropagation());
                        }}
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
                                 navigate("/orders");
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
         {(location.pathname === "/" ||
            (location.pathname.startsWith("/store") &&
               !location.pathname.startsWith("/store/item/"))) && (
            <div className={s.liveTicker}>
               <div className={s.tickerTag}>
                  <span className={s.livePulse}></span>
                  <span>LIVE DROPS</span>
               </div>

               <div className={s.tickerWindow}>
                  <div className={s.tickerTrack}>
                     {tickerItems.map((item, index) => (
                        <div
                           key={`${item.id}-${index}`}
                           className={s.tickerItem}
                        >
                           <span
                              className={`${s.wearTag} ${
                                 s[item.wear.toLowerCase()]
                              }`}
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
         )}

         {location.pathname !== "/" && (
            <div
               className={`${s.device_filter} ${
                  deviceFilter ? s.showFilter : s.hideFilter
               } ${filterClass}`}
            >
               <span className={s.route_store}>
                  <BreadCrumb />
               </span>

               {location.pathname.startsWith("/store") && (
                  <span
                     className={`${s.filterIcon} ${
                        openSidebar ? s.activeFilter : ""
                     }`}
                     onClick={toggleSidebar}
                  >
                     {/* <span>Filters</span> */}
                     <Icon name="filterIcon" size={20} />
                  </span>
               )}
            </div>
         )}

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
               to="/orders"
               onClick={handleFilterClick}
               className={`${s.bottomNav_item} ${location.pathname === "/orders" ? s.bottomNav_item_active : ""}`}
            >
               <Icon name="userIcon" size={20} />
               <span className={s.bottomNav_label}>Profile</span>
            </Link>
         </nav>
      </header>
   );
};

export default Navbar;
