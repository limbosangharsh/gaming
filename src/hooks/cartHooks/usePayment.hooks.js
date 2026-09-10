import { useState } from "react";
import { validateAllPaymentCard } from "../../utils/validation/validatePayment";

export const usePayment = () => {
   const [selectedPayment, setSelectedPayment] = useState("card");
   const [selectedCoin, setSelectedCoin] = useState("BTC");
   const [cardDetails, setCardDetails] = useState({
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
   });

   const [paypalDetails, setPaypalDetails] = useState({
      paypalEmail: "",
      paypalAddress: "",
      paypalCity: "",
      paypalZip: "",
   });

   const [errors, setErrors] = useState({});
   const getCart  = JSON.parse(localStorage.getItem("cart"));

   console.log(getCart)

   const formatCardNumber = (value) => {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      return digits.replace(/(.{4})/g, "$1 ").trim();
   };

   const formatExpiry = (value) => {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
      return digits;
   };

   const handlePaymentSelect = (id) => {
      setSelectedPayment(id);
   };

   const handleCardChange = (name, value) => {
      const formatted =
         name === "cardNumber"
            ? formatCardNumber(value)
            : name === "cardExpiry"
              ? formatExpiry(value)
              : value;
      setCardDetails({ ...cardDetails, [name]: formatted });
      setErrors({
         ...errors,
         [name]: "",
      });
   };

   const handlePaypalChange = (name, value) => {
      setPaypalDetails({
         ...paypalDetails,
         [name]: value,
      });
   };

   const handleSubmit = (handlePlaceOrder) => {
      const newError = validateAllPaymentCard(cardDetails);
      const filteredErrors = Object.fromEntries(
         Object.entries(newError).filter(([key, value]) => value !== ""),
      );


      setErrors(filteredErrors);

      if (Object.keys(filteredErrors).length === 0) {
         handlePlaceOrder();
      }
   };


   // console.log(errors)
   return {
      selectedPayment,
      setCardDetails,
      setPaypalDetails,
      setSelectedCoin,
      selectedCoin,
      paypalDetails,
      cardDetails,
      handlePaymentSelect,
      handleCardChange,
      handlePaypalChange,
      handleSubmit,
      errors,
      setErrors
   };
};
