export const paymentCardRules = (name, value, formData) => {
   switch (name) {
      case "cardName":
         if (!value.trim()) return "Required";
         if (value.length < 3) return "Min 3 Char Required";
         if (!/^[a-zA-Z\s]+$/.test(value)) return "Letters only";
         return "";

      case "cardNumber": {
         if (!value.trim()) return "Required";

         const digits = value.replace(/\s/g, "");

         if (digits.length !== 16) return "Invalid Card Number";
         if (!/^\d+$/.test(digits)) return "Numbers only";

         return "";
      }

      case "cardCvv":
         if (!value.trim()) return "Required";
         if (value.length !== 3) return "Invalid Cvv";
         if (!/^\d+$/.test(value)) return "Numbers only";

         return "";

      case "cardExpiry": {
         if (!value.trim()) return "Required";

         if (!/^\d{2}\/\d{2}$/.test(value)) {
            return "Format must be MM/YY";
         }

         const [month, year] = value.split("/");

         if (parseInt(month) < 1 || parseInt(month) > 12) {
            return "Invalid month";
         }

         const now = new Date();
         const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);

         if (expDate < now) return "Card expired";

         return "";
      }

      // -------------------------
      // PAYPAL
      // -------------------------

      case "paypalEmail":
         if (!value.trim()) return "Required";
         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Invalid Email";
         }
         return "";

      case "paypalAddress":
         if (!value.trim()) return "Required";
         if (value.trim().length < 5) return "Min 5 Characters Required";
         return "";

      case "paypalCity":
         if (!value.trim()) return "Required";
         if (!/^[a-zA-Z\s-]+$/.test(value)) return "Letters only";
         if (value.trim().length < 2) return "Min 2 Characters Required";
         return "";

      case "paypalZip":
         if (!value.trim()) return "Required";
         if (!/^\d+$/.test(value)) return "Numbers only";
         if (value.length < 4 || value.length > 10) {
            return "Invalid Zip Code";
         }
         return "";

      default:
         return "";
   }
};

export const validateAllPaymentCard = (formData) => {
   const errors = {};
   Object.keys(formData).forEach((item) => {
      // ["cardName", "cardNumber", "cardCvv"]
      errors[item] = paymentCardRules(item, formData[item]); // passing the key and formDtat key's value
   });

   return errors;
};
