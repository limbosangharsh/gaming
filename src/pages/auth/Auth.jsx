import React, { useEffect, useState } from "react";
import s from "./Auth.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { POINTS } from "../../utils/constants/Constants";
import { useAuthForm } from "../../hooks/authHooks/useAuthForm.hooks";
import CustomModal from "../../components/CustomModal/CustomModal.jsx";
import Icon from "../../utils/icons/Icons.jsx";

const Auth = ({ mode = "signup" }) => {
   const {
      formData,
      errors,
      touched,
      loading,
      handleChange,
      handleBlur,
      handleResetForm,
      formIsValid,
      handleSubmit,
      isSignup,
      navigate,
   } = useAuthForm();

   const [forgotModal, setForgotModal] = useState(false);
   const [forgotEmail, setForgotEmail] = useState("");
   const [forgotError, setForgotError] = useState("");
   const [forgotLoading, setForgotLoading] = useState(false);
   const [showProgress, setShowProgress] = useState(false);
   const [resetLinkSent, setResetLinkSent] = useState(false);

   const handleForgotPassword = (e) => {
      e.preventDefault();
      setForgotError("");

      const email = forgotEmail.trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         setForgotError("Please enter a valid email address.");
         return;
      }

      setForgotEmail(email);
      setForgotLoading(true);
      setShowProgress(true);
      setResetLinkSent(false);
      setForgotLoading(false);

      setTimeout(() => {
         setShowProgress(false);
         setResetLinkSent(true);
      }, 5000);
   };

   const closeForgotModal = () => {
      setForgotModal(false);
      setForgotEmail("");
      setForgotError("");
      setForgotLoading(false);
      setShowProgress(false);
      setResetLinkSent(false);
   };

   return (
      <div className={s.page}>
         <div className={s.overlay} />

         <div className={s.inner}>
            {/* ══ LEFT ══ */}
            <div className={s.left}>
               <a href="/" className={s.logo}>
                  <div className={s.logo_icon}>
                     <span className={s.logo_pulse} />
                  </div>
                  <span className={s.logo_text}>
                     SKIN<span className={s.logo_accent}>VAULT</span>
                  </span>
               </a>

               <div className={s.left_body}>
                  <h2 className={s.left_heading}>
                     The Ultimate <br />
                     Marketplace For <br />
                     <span className={s.left_accent}>Serious Traders</span>
                  </h2>
                  <p className={s.left_sub}>
                     The most trusted CS2 skin marketplace. Trade smarter, earn
                     more.
                  </p>

                  <div className={s.points}>
                     {POINTS.map((point, i) => (
                        <div key={i} className={s.point}>
                           <div className={s.point_icon_wrap}>
                              <span className={s.point_icon}>◈</span>
                           </div>
                           <p className={s.point_text}>
                              <span className={s.point_label}>
                                 {point.label}:
                              </span>{" "}
                              {point.desc}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className={s.stats}>
                  <div className={s.stat}>
                     <span className={s.stat_val}>$2.4B</span>
                     <span className={s.stat_label}>Total Traded</span>
                  </div>
                  <div className={s.stat_divider} />
                  <div className={s.stat}>
                     <span className={s.stat_val}>4.6M+</span>
                     <span className={s.stat_label}>Active Traders</span>
                  </div>
                  <div className={s.stat_divider} />
                  <div className={s.stat}>
                     <span className={s.stat_val}>12K+</span>
                     <span className={s.stat_label}>Daily Deals</span>
                  </div>
               </div>
            </div>

            {/* ══ RIGHT — CARD ══ */}
            <div className={s.card}>
               <div className={s.card_header}>
                  <h1 className={s.title}>
                     {isSignup ? (
                        <>
                           Register Your{" "}
                           <span className={s.title_accent}>Secure </span>
                           Account
                        </>
                     ) : (
                        <>
                           Welcome <span className={s.title_accent}>Back</span>
                        </>
                     )}
                  </h1>
                  <p className={s.subtitle}>
                     {!isSignup && "Sign in to continue trading on SkinVault"}
                  </p>
               </div>

               <div
                  className={`${s.form_body} ${!isSignup ? s.form_center : ""}`}
               >
                  <div className={s.fields}>
                     {isSignup && (
                        <div className={s.fields}>
                           <div className={s.fileds_1}>
                              <CustomInput
                                 label="First Name"
                                 placeholder="John"
                                 name="firstName"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 error={errors.firstName}
                                 reserveError
                                 autoComplete="off"
                              />
                              <CustomInput
                                 label="Last Name"
                                 placeholder="Doe"
                                 onChange={handleChange}
                                 name={"lastName"}
                                 onBlur={handleBlur}
                                 error={errors.lastName}
                                 reserveError
                                 autoComplete="off"
                              />
                           </div>
                           <div className={s.fileds_1}>
                              <CustomInput
                                 label="Contact Number"
                                 placeholder="999999999"
                                 name={"contact"}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 error={errors.contact}
                                 reserveError
                                 autoComplete="off"
                                 type="number"
                              />
                              <CustomInput
                                 label="Country"
                                 placeholder="India"
                                 name={"country"}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 error={errors.country}
                                 reserveError
                                 autoComplete="off"
                                 type="text"
                              />
                           </div>
                        </div>
                     )}
                     <CustomInput
                        label="Email"
                        placeholder="john@gmail.com"
                        icon="mail"
                        name={"email"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                        reserveError
                        autoComplete="off"
                     />
                     <CustomInput
                        label="Password"
                        placeholder="••••••••••"
                        type="password"
                        icon="lock"
                        name={"password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password}
                        reserveError
                        autoComplete="new-password"
                     />
                     {isSignup && (
                        <CustomInput
                           label="Confirm Password"
                           placeholder="••••••••••"
                           type="password"
                           icon="lock"
                           name={"confirmPassword"}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={errors.confirmPassword}
                           reserveError
                           autoComplete="new-password"
                        />
                     )}
                  </div>

                  {isSignup ? (
                     ""
                  ) : (
                     <span
                        type="button"
                        className={s.forgot}
                        onClick={() => setForgotModal(true)}
                     >
                        Forgot Your Password?
                     </span>
                  )}
                  <CustomModal
                     isOpen={forgotModal}
                     onClose={closeForgotModal}
                     title={
                        resetLinkSent ? "Check Your Email" : "Forgot Password?"
                     }
                     subTitle={
                        resetLinkSent
                           ? "We've received your password reset request."
                           : "Enter your registered email address to reset your password."
                     }
                     modalClassname={s.forgot_modal}
                  >
                     <div className={s.forgot_content}>
                        {!showProgress && !resetLinkSent && (
                           <form onSubmit={handleForgotPassword}>
                              <label
                                 className={s.forgot_label}
                                 htmlFor="forgot-email"
                              >
                                 Email Address
                              </label>

                              <input
                                 id="forgot-email"
                                 type="email"
                                 className={s.forgot_input}
                                 placeholder="john@gmail.com"
                                 value={forgotEmail}
                                 onChange={(e) =>
                                    setForgotEmail(e.target.value)
                                 }
                                 autoComplete="email"
                                 required
                              />

                              {forgotError && (
                                 <p className={s.forgot_error}>{forgotError}</p>
                              )}

                              <button
                                 type="submit"
                                 className={s.forgot_submit}
                                 disabled={forgotLoading}
                              >
                                 Send Reset Link
                              </button>
                           </form>
                        )}

                        {showProgress && (
                           <div className={s.forgot_loading}>
                              <p className={s.forgot_loading_title}>
                                 Processing your request...
                              </p>

                              <p className={s.forgot_loading_text}>
                                 Please wait while we prepare your password
                                 reset instructions.
                              </p>

                              <div className={s.forgot_progress_bar}>
                                 <div
                                    key="progress"
                                    className={s.forgot_progress_fill}
                                 />
                              </div>

                              <p className={s.forgot_loading_hint}>
                                 This will only take a few seconds.
                              </p>
                           </div>
                        )}

                        {resetLinkSent && (
                           <>
                              <p className={s.forgot_message}>
                                 If an account exists with{" "}
                                 <strong>{forgotEmail}</strong>, a password
                                 reset link will be sent to that email address.
                                 Please check your inbox and spam folder.
                              </p>

                              <button
                                 type="button"
                                 className={s.forgot_submit}
                                 onClick={closeForgotModal}
                              >
                                 Back to Sign In
                              </button>
                           </>
                        )}
                     </div>
                  </CustomModal>
                  <button
                     className={s.submit_btn}
                     onClick={handleSubmit}
                     disabled={!formIsValid || loading}
                  >
                     {loading ? (
                        <div className={s.loader} />
                     ) : isSignup ? (
                        "Sign up with Email"
                     ) : (
                        "Sign In"
                     )}
                  </button>
                  <p className={s.already}>
                     {isSignup
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                     <span
                        className={s.switch_link}
                        onClick={() =>
                           navigate(isSignup ? "/signin" : "/signup")
                        }
                     >
                        {isSignup ? "Sign In" : "Create New"}
                     </span>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Auth;
