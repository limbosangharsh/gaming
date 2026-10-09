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
         // Get existing users
         const existingUsers = JSON.parse(
            localStorage.getItem("skinvault_users") || "[]",
         );

         // Check if email is already registered
         const userExists = existingUsers.some(
            (user) => user.email === formData.email,
         );

         if (userExists) {
            setErrors({
               email: "An account already exists with this email.",
            });

            window.dispatchEvent(
               new CustomEvent("showToast", {
                  detail: {
                     title: "Account already exists",
                     description:
                        "An account is already registered with this email.",
                  },
               }),
            );

            return;
         }

         // Create new user
         const newUser = {
            id: Date.now(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            contact: formData.contact,
            country: formData.country,
            email: formData.email,
            password: formData.password,
         };

         // Add new user to existing users
         const updatedUsers = [...existingUsers, newUser];

         localStorage.setItem("skinvault_users", JSON.stringify(updatedUsers));

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
         // Get ALL registered users
         const existingUsers = JSON.parse(
            localStorage.getItem("skinvault_users") || "[]",
         );

         // Find user by email
         const storedUser = existingUsers.find(
            (user) => user.email === formData.email,
         );

         // User doesn't exist
         if (!storedUser) {
            setErrors({
               email: "No account found with this email.",
            });

            window.dispatchEvent(
               new CustomEvent("showToast", {
                  detail: {
                     title: "Account not found",
                     description: "No account exists with this email address.",
                  },
               }),
            );

            return;
         }

         // Checking password
         if (storedUser.password !== formData.password) {
            setErrors({
               password: "Incorrect password.",
            });

            window.dispatchEvent(
               new CustomEvent("showToast", {
                  detail: {
                     title: "Incorrect password",
                     description:
                        "The password you entered is incorrect. Please try again.",
                  },
               }),
            );

            return;
         }

         // Login successful
         setLoading(true);

         localStorage.setItem("logged_user", JSON.stringify(storedUser)); // current logged in user

         localStorage.setItem("orders", JSON.stringify([]));

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
