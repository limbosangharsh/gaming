import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allSkins } from "../../utils/constants/Constants";

export const useSort = (category) => {
   const [activeCategories, setActiveCategories] = useState(
      category ? [category] : [],
   );
   const [activeConditions, setActiveConditions] = useState([]);
   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
   const [showCategories, setShowCategories] = useState(true);
   const [showPrice, setShowPrice] = useState(true);
   const [showConditions, setShowConditions] = useState(true);
   const [minFocused, setMinFocused] = useState(false);
   const [openSidebar, setOpenSidebar] = useState(false);
   const [deviceFilter, setDeviceFilter] = useState(true);

   const toggleCategory = (id) => {
      if (id === "all") {
         setActiveCategories([]);
         return;
      }
      const isAlreadySelected = activeCategories.includes(id);
      if (isAlreadySelected) {
         setActiveCategories(activeCategories.filter((c) => c !== id));
      } else {
         setActiveCategories([...activeCategories, id]);
      }
   };

   const toggleCondition = (id) => {
      const isAlreadySelected = activeConditions.includes(id);
      if (isAlreadySelected) {
         setActiveConditions(activeConditions.filter((c) => c !== id));
      } else {
         setActiveConditions([...activeConditions, id]);
      }
   };

   const filtered = allSkins.filter((skin) => {
      if (
         activeCategories.length > 0 &&
         !activeCategories.includes(skin.category)
      )
         return false;
      if (
         activeConditions.length > 0 &&
         !activeConditions.includes(skin.condition)
      )
         return false;
      if (skin.price < priceRange.min || skin.price > priceRange.max)
         return false;
      return true;
   });

   const handleResetFilter = () => {
      setActiveCategories([]);
      setActiveConditions([]);
      setPriceRange({ min: 0, max: 1000 });
   };

   const toggleSidebar = () => {
      setOpenSidebar((prev) => {
         const newValue = !prev;

         document.dispatchEvent(
            new CustomEvent("sidebar-toggled", {
               detail: {
                  openSidebar: newValue,
               },
            }),
         );

         return newValue;
      });
   };

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [activeCategories, activeConditions, priceRange]);

   useEffect(() => {
      if (window.innerWidth > 768) {
         setDeviceFilter(true);
         return;
      }

      let lastScrollY = window.scrollY;

      const handleScroll = () => {
         const currentScrollY = window.scrollY;

         if (currentScrollY <= 0) {
            setDeviceFilter(true);
         } else if (currentScrollY > lastScrollY) {
            setDeviceFilter(false);
         } else if (currentScrollY < lastScrollY) {
            setDeviceFilter(true);
         }

         lastScrollY = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return {
      activeCategories,
      activeConditions,
      priceRange,
      setPriceRange,
      showCategories,
      setShowCategories,
      showPrice,
      setShowPrice,
      showConditions,
      setShowConditions,
      minFocused,
      setMinFocused,
      filtered,
      toggleCategory,
      toggleCondition,
      handleResetFilter,
      openSidebar,
      toggleSidebar,
      deviceFilter,
   };
};
