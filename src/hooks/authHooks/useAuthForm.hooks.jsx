import { useLocation, useNavigate } from "react-router-dom";
import {
   validateField,
   validateAll,
   isFormValid,
} from "../../utils/validation/Validation";
import { useState, useEffect } from "react";
import { STATIC_ORDERS } from "../../utils/constants/Constants";

export const useAuthForm = () => {
   const location = useLocation();
   const navigate = useNavigate();

   const isSignup = location.pathname === "/signup";

   // ── State ──────────────────────────────────────────────────────────────────

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      contact: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const [errors, setErrors] = useState({});
   const [touched, setTouched] = useState({});
   const [loading, setLoading] = useState(false);

   // ── Derived ────────────────────────────────────────────────────────────────

   const fieldsToValidate = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

   const formIsValid = isFormValid(validateAll(fieldsToValidate));

   // ── Handlers ───────────────────────────────────────────────────────────────

   const handleResetForm = () => {
      setFormData({
         firstName: "",
         lastName: "",
         contact: "",
         country: "",
         email: "",
         password: "",
         confirmPassword: "",
      });
      setErrors({});
      setTouched({});
      document.querySelectorAll("input").forEach((input) => {
         input.value = "";
      });
   };

   const handleChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
   };

   const handleBlur = (name) => {
      setTouched({ ...touched, [name]: true });
      setErrors({
         ...errors,
         [name]: validateField(name, formData[name], formData),
      });
   };

   const handleSubmit = () => {
      const allErrors = validateAll(fieldsToValidate);
      setErrors(allErrors);

      if (!isFormValid(allErrors)) return;

      if (isSignup) {
         localStorage.setItem(
            "skinvault_user",
            JSON.stringify({
               firstName: formData.firstName,
               lastName: formData.lastName,
               contact: formData.contact,
               country: formData.country,
               email: formData.email,
            }),
         );
         setLoading(true);
         setTimeout(() => {
            navigate("/signin");
            setLoading(false);
            window.dispatchEvent(
               new CustomEvent("showToast", {
                  detail: {
                     title: "Account created!",
                     description: "Sign in to enter the vault.",
                  },
               }),
            );
         }, 2000);
      } else {
         localStorage.setItem(
            "skinvault_user",
            JSON.stringify({ email: formData.email }),
         );
         const getOrders = localStorage.setItem(
            // only on login
            "orders",
            JSON.stringify(STATIC_ORDERS),
         );
         setLoading(true);
         setTimeout(() => {
            navigate("/");
            setLoading(false);

            window.dispatchEvent(
               new CustomEvent("showToast", {
                  detail: {
                     title: "Logged in successfully.",
                     description: "Find your next skin.",
                  },
               }),
            );
         }, 2000);
      }
   };

   // ── Effects ────────────────────────────────────────────────────────────────

   useEffect(() => {
      handleResetForm();
   }, [location.pathname]);

   // ── Return ─────────────────────────────────────────────────────────────────

   return {
      formData,
      errors,
      touched,
      loading,
      formIsValid,
      isSignup,
      navigate,
      handleChange,
      handleBlur,
      handleResetForm,
      handleSubmit,
   };
};
