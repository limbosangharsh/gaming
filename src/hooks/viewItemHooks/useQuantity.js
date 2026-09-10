// utils/hooks/useQuantity.js
import { useState } from "react";

const useQuantity = (initial = 1) => {
   const [quantity, setQuantity] = useState(initial);
   const increment = () => setQuantity((q) => q + 1);
   const decrement = () => setQuantity((q) => Math.max(1, q - 1));
   return { quantity, increment, decrement };
};

export default useQuantity;