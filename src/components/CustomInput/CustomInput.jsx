import React, { useState } from "react";
import s from "./CustomInput.module.css";
import Icon from "../../utils/icons/Icons";

const CustomInput = ({
   label,
   placeholder,
   type = "text",
   value,
   onChange,
   onBlur,
   icon,
   error,
   maxLength,
   className,
   wrapperClassname,
   name,
   disabled,
   suffixIcon = null,
   onSuffixClick,
   iconColor = "#737373",
   iconSize = 16,
   iconClassname,
   inputMode,
   autoComplete = "off",
}) => {
   const [showPassword, setShowPassword] = useState(false);

   const inputType = type === "password" && showPassword ? "text" : type;
   const [focused, setFocused] = useState(false);

   return (
      <div className={s.wrapper}>
         {label && <label className={s.label}>{label}</label>}
         <div
            className={`${s.input_wrap} ${wrapperClassname || ""}  ${focused ? s.focused : ""} ${error ? s.error : ""}`}
         >
            {icon && (
               <span className={`${s.icon} ${iconClassname || ""}`}>
                  <Icon name={icon} size={iconSize} />
               </span>
            )}

            <input type="text" style={{ display: "none" }} />
            <input type="password" style={{ display: "none" }} />
            <input
               type={inputType}
               value={value}
               onChange={(e) => onChange(name, e.target.value)}
               onFocus={() => setFocused(true)}
               onBlur={() => {
                  setFocused(false);
                  if (onBlur) onBlur(name);
               }}
               placeholder={placeholder}
               className={`${s.input} ${className || ""}`}
               maxLength={maxLength}
               name={name}
               disabled={disabled}
               inputMode={inputMode}
               autoComplete={autoComplete}
            />

            {suffixIcon && (
               <span
                  style={{ color: iconColor }}
                  className={`${s.icon_span} ${iconClassname || ""}`}
                  onClick={onSuffixClick}
               >
                  <Icon name={suffixIcon} size={iconSize} />
               </span>
            )}

            {type === "password" && (
               <button
                  type="button"
                  className={s.toggle}
                  onClick={() => setShowPassword(!showPassword)}
               >
                  <Icon
                     name={showPassword ? "eyeOff" : "eye"}
                     size={16}
                     color="#737373"
                  />
               </button>
            )}
         </div>
         {error && (
            <span className={s.error_msg}>
               <Icon name={"exclamationIcon"} size={12} />
               {error}
            </span>
         )}
      </div>
   );
};

export default CustomInput;
