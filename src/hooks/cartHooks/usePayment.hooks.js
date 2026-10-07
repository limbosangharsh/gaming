import { useEffect, useState } from "react";

import { validateAllPaymentCard } from "../../utils/validation/validatePayment";

export const usePayment = () => {
   const [paymentModal, setPaymentModal] = useState({
      open: false,
      success: false,
   });

   const [processingModal, setProcessingModal] = useState(false); // for processing purpose
   const [selectedPayment, setSelectedPayment] = useState("card");

   const [selectedCoin, setSelectedCoin] = useState("BTC");

   const [cardDetails, setCardDetails] = useState({
      cardName: "John Doe",
      cardNumber: "4242 4242 4242 4242",
      cardExpiry: "12/30",
      cardCvv: "123",
   });

   const [paypalDetails, setPaypalDetails] = useState({
      paypalEmail: "",
      paypalAddress: "",
      paypalCity: "",
      paypalZip: "",
   });

   const [errors, setErrors] = useState({});

   const getCart = JSON.parse(localStorage.getItem("cart"));

   const formatCardNumber = (value) => {
      const digits = value.replace(/\D/g, "").slice(0, 16);

      return digits.replace(/(.{4})/g, "$1 ").trim();
   };

   const formatExpiry = (value) => {
      const digits = value.replace(/\D/g, "").slice(0, 4);

      if (digits.length > 2) {
         return digits.slice(0, 2) + "/" + digits.slice(2);
      }

      return digits;
   };

   const payMethod = selectedPayment === "card" ? cardDetails : paypalDetails;

   const handlePaymentSelect = (id) => {
      setSelectedPayment(id);
      setErrors({});
   };

   // --------------------------------
   // Modal
   // --------------------------------

   // --------------------------------
   // CHANGE
   // --------------------------------

   // console.log("paymentModal open is ", paymentModal.open);
   // console.log("paymentModal success is ", paymentModal.success);
   const handleCardChange = (name, value) => {
      const formatted =
         name === "cardNumber"
            ? formatCardNumber(value)
            : name === "cardExpiry"
              ? formatExpiry(value)
              : value;

      setCardDetails((prev) => ({
         ...prev,
         [name]: formatted,
      }));

      setErrors((prev) => {
         const updatedErrors = { ...prev };
         delete updatedErrors[name];
         return updatedErrors;
      });
   };

   // --------------------------------
   // PAYPAL CHANGE
   // --------------------------------

   const handlePaypalChange = (name, value) => {
      setPaypalDetails((prev) => ({
         ...prev,
         [name]: value,
      }));

      setErrors((prev) => {
         const updaedErrorsPaypal = { ...prev };
         delete updaedErrorsPaypal[name];
         return updaedErrorsPaypal;
      });
   };

   // --------------------------------
   // BLUR
   // --------------------------------

   const handleBlur = (name) => {
      const validationErrors = validateAllPaymentCard(payMethod);

      const fieldError = validationErrors[name];

      setErrors((prev) => {
         const updatedErrors = { ...prev };

         if (fieldError) {
            updatedErrors[name] = fieldError;
         } else {
            delete updatedErrors[name];
         }

         return updatedErrors;
      });
   };

   // --------------------------------
   // SUBMIT
   // --------------------------------

   const handleModal = () => {
      console.log("handleModal run ");
      const success = Math.random() < 0.5;

      setPaymentModal({
         open: true,
         success,
      });

      return success;
   };

   const handleSubmit = (handlePlaceOrder) => {
      console.log("click this shit");

      const newErrors = validateAllPaymentCard(payMethod);

      const filteredErrors = Object.fromEntries(
         Object.entries(newErrors).filter(([, value]) => value !== ""),
      );

      setErrors(filteredErrors);

      const isValid = Object.keys(filteredErrors).length === 0;

      if (!isValid) {
         return false;
      }

      const paymentSuccess = handleModal();

      console.log("paymentSuccess:", paymentSuccess);

      if (paymentSuccess) {
         handlePlaceOrder();
      } else {
         setTimeout(() => {
            window.dispatchEvent(
               new CustomEvent("showToast", {
                  detail: {
                     title: "Unable to Place Order, Payment Failed!",
                     description:
                        "Please try again or use a different payment method.",
                  },
               }),
            );
         }, 6000);
      }

      return isValid;
   };

   useEffect(() => {
      if (!paymentModal.open) return;

      setProcessingModal(true);

      const processingModalTimer = setTimeout(() => {
         setProcessingModal(false);
         const timer = setTimeout(() => {
            setPaymentModal({
               open: false,
               success: false,
            });
         }, 3000);

         return () => clearTimeout(timer);
      }, 3000);

      return () => clearTimeout(processingModalTimer);
   }, [paymentModal.open]);

   // console.log('payment modal is ', paymentModal)

   return {
      selectedPayment,
      paymentModal,

      setCardDetails,
      setPaypalDetails,
      setSelectedCoin,

      selectedCoin,

      paypalDetails,
      cardDetails,

      handlePaymentSelect,
      handleCardChange,
      handleBlur,
      handlePaypalChange,
      handleSubmit,

      errors,
      setErrors,

      handleModal,
      processingModal,
   };
};
