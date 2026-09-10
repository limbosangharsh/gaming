import React, { useEffect } from "react";
import s from "./Auth.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { POINTS } from "../../utils/constants/Constants";
import { useAuthForm } from "../../hooks/authHooks/useAuthForm.hooks";

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
                     <span className={s.forgot}>Forgot Your Password?</span>
                  )}
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