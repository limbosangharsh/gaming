import { useState } from "react";
import { PROMO_CODES } from "../../utils/constants/Constants";

export const usePromo = () => {
  const [promo, setPromo] = useState("");
  const [validPromo, setValidPromo] = useState(false);
  const [invalidPromo, setInvalidPromo] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const resetPromoValues = () => {
    setValidPromo(false);
    setInvalidPromo(false);
    setDiscountPercentage(0);
  };
  const handlePromo = (name, value) => {
    setPromo(value);
    resetPromoValues();
  };

  const showCartIsEmpty = () => {
    window.dispatchEvent(
      new CustomEvent("showToast", {
        detail: {
          title: "Cart is Empty!",
          description: `Cart is Empty! Please add itmes in the cart`,
        },
      }),
    );
  };
  const handleApplyPromo = () => {
    let isPromoValid = PROMO_CODES[promo.toUpperCase()];
    if (isPromoValid) {
      setValidPromo(true);
      setDiscountPercentage(isPromoValid.discount);
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            title: "Coupon Code Activated!",
            description: `Enjoy Discount of ${isPromoValid.discount}%`,
          },
        }),
      );
    } else {
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            title: "Coupon Code Invalid or Expired!",
            description: `Try Different ones`,
          },
        }),
      );
      setInvalidPromo(true);
    }
  };

  const handleClearPromo = () => {
    setPromo("");
    resetPromoValues();
  };

  return {
    promo,
    handlePromo,
    handleApplyPromo,
    validPromo,
    invalidPromo,
    discountPercentage,
    handleClearPromo,
    showCartIsEmpty,
  };
};
