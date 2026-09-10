export const validateField = (name, value, formData) => {
   // initial state
   switch (name) {
      case "firstName":
      case "lastName":
         if (!value.trim()) return "Required!";
         if (value.length < 2) return "Min 2 Characters";
         if (!/^[a-zA-Z]+$/.test(value)) return "Letters only";
         return "";

      case "contact":
         if (!value.trim()) return "Required!";
         if (value.length < 10) return "Must be 10 Digits";
         return "";

      case "country":
         if (!value.trim()) return "Required!";
         return "";

      case "email":
         if (!value.trim()) return "Required!";
         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
         return "";

      case "password":
         if (!value) return "Required";
         if (value.length < 8) return "Min 8 characters";
         if (!/[A-Z]/.test(value)) return "Need 1 uppercase letter";
         if (!/[0-9]/.test(value)) return "Need 1 number";
         return "";

      case "confirmPassword":
         if (!value) return "Required";
         if (value !== formData.password) return "Passwords don't match";
         return "";

      case "cardName":
         if (!value) return "Required";
         if (value.length < 3) return "need at least 3 chars";

      default:
         return "";
   }
};

export const validateAll = (formData) => {
   // blur shit
   const errors = {};
   Object.keys(formData).forEach((item) => {
      errors[item] = validateField(item, formData[item], formData);
   });
   return errors;
};

export const isFormValid = (errors) => {
   // disable & enable
   return Object.values(errors).every((e) => e === "");
};
