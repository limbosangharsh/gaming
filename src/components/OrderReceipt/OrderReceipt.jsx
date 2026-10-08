import s from "./OrderReceipt.module.css";
import { usePromo } from "../../hooks/cartHooks/usePromo.hooks";
import CustomInput from "../CustomInput/CustomInput";
import Icon from "../../utils/icons/Icons";
import EmptyStore from "../../utils/emptyStore/EmptyStore";
import { rarities, PAYMENT_PERKS } from "../../utils/constants/Constants";
import { useLocation } from "react-router-dom";
const RARITY_COLOR = Object.fromEntries(rarities.map((r) => [r.id, r.color]));

const OrderReceipt = ({
   children,
   btnTitle = "Place Order",

   // Display controls
   showItems = true,
   showSummaryBlock = true,
   showTrustBlock = true,
   showBtns = true,
   showRemoveCartOption = true,
   disabledIncrementDecrement = false,
   showPaymentPerks = false,
   showPromo = true,

   // Cart data
   cartItems = [],
   isCartEmpty = true,

   // Cart handlers
   handleIncrementQuantity,
   handleDecrementQuantity,
   handleRemoveFromCart,

   // Selected item
   initialItem,
   handleInitialItem,
   showTotal = true,
   // Loading
   loading = false,

   // errors
   errors,
   onClick,
}) => {
   const location = useLocation();
   // =========================
   // PROMO
   // =========================

   const {
      promo,
      handlePromo,
      handleApplyPromo,
      handleClearPromo,
      validPromo,
      invalidPromo,
      discountPercentage,
      showCartIsEmpty,
   } = usePromo();

   // =========================
   // PAYMENT
   // =========================

   // =========================
   // CALCULATIONS
   // =========================

   const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
   );

   const discountAmount = subtotal * (discountPercentage / 100);

   const platformFee = (subtotal - discountAmount) * 0.02;

   const total = subtotal - discountAmount + platformFee;

   // =========================
   // PROMO INPUT
   // =========================

   const promoInputProps = {
      wrapperClassname: invalidPromo
         ? s.invalid_promo
         : validPromo
           ? s.valid_promo
           : "",

      suffixIcon: validPromo ? "close" : invalidPromo ? "exclamationIcon" : "",

      iconColor: invalidPromo ? "#e05a5a" : validPromo ? "#22c55e" : "#737373",

      iconClassname: invalidPromo
         ? s.invalid_icon
         : validPromo
           ? s.valid_icon
           : "",

      onSuffixClick: invalidPromo ? undefined : handleClearPromo,
   };

   // =========================
   // JSX
   // =========================

   const doesWeHaveErrors = errors ? Object.keys(errors).length : 0;
   // console.log(doesWeHaveErrors)
   return (
      <div className={s.cart_right}>
         {/* =========================
             TITLE
         ========================= */}
         {location.pathname !== "/checkout" && (
            <h3 className={s.summary_title}>Order Receipt</h3>
         )}
         {location.pathname !== "/checkout" && (
            <div className={s.summary_divider} />
         )}
         {/* =========================
             CART ITEMS
         ========================= */}
         <div className={s.hold_items}>
            {isCartEmpty && <EmptyStore />}

            {showItems &&
               cartItems.map((item) => (
                  <div
                     key={item.id}
                     className={`${s.receipt_row} ${
                        initialItem === item.id ? s.initialItem : ""
                     }`}
                     onClick={() => handleInitialItem?.(item.id)}
                     style={{
                        "--rarity-color":
                           RARITY_COLOR[item.rarity] ?? "#ffffff",
                     }}
                  >
                     {/* LEFT */}
                     <div className={s.receipt_row_left}>
                        <img
                           src={item.image?.[0]}
                           className={s.cart_thumb}
                           alt={item.name}
                        />

                        <span className={s.receipt_name}>
                           <div className={s.receipt_name_row}>
                              {item.weapon} | {item.name}
                           </div>

                           <span className={s.receipt_condition}>
                              {item.condition}
                           </span>
                        </span>
                     </div>

                     {/* RIGHT */}
                     <div className={s.receipt_row_right}>
                        {/* QUANTITY */}
                        <div className={s.quantity_ctrl}>
                           {!disabledIncrementDecrement && (
                              <>
                                 {/* DECREMENT */}
                                 <button
                                    className={`${s.qty_btn} ${
                                       item.quantity === 1
                                          ? s.qty_btn_disabled
                                          : ""
                                    }`}
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       handleDecrementQuantity?.(item.id);
                                    }}
                                    disabled={item.quantity === 1}
                                 >
                                    <Icon name="removeIcon" size={12} />
                                 </button>
                              </>
                           )}

                           {/* VALUE */}
                           <span className={s.qty_val}>{item.quantity}</span>

                           {!disabledIncrementDecrement && (
                              <>
                                 {/* INCREMENT */}
                                 <button
                                    className={s.qty_btn}
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       handleIncrementQuantity?.(item.id);
                                    }}
                                 >
                                    <Icon name="addIcon" size={12} />
                                 </button>
                              </>
                           )}
                        </div>

                        {/* PRICE */}
                        <span className={s.receipt_price}>
                           {/* ${item.price.toFixed(2)} */}
                           ${item.quantity * item.price.toFixed(2)}
                        </span>

                        {/* REMOVE */}
                        {showRemoveCartOption && (
                           <span
                              className={s.close_span}
                              onClick={(e) => {
                                 e.stopPropagation();

                                 handleRemoveFromCart?.(item.id);
                              }}
                           >
                              <Icon name="close" size={12} />
                           </span>
                        )}
                     </div>
                  </div>
               ))}

            {/* Additional JSX */}
            {children}
         </div>
         <div className={s.space_up} />
         <div className={s.summary_divider} />
         {/* =========================
             SUMMARY
         ========================= */}
         {showSummaryBlock && (
            <div className={s.hold_math}>
               {/* SUBTOTAL */}
               <div className={s.summary_row}>
                  <span className={s.summary_label}>Subtotal</span>

                  <span className={s.summary_val}>${subtotal.toFixed(2)}</span>
               </div>

               {/* DISCOUNT */}
               <div className={s.summary_row}>
                  <span className={s.summary_label}>
                     Discount ({discountPercentage}%)
                  </span>

                  <span className={s.summary_discount}>
                     ${discountAmount.toFixed(2)}
                  </span>
               </div>

               {/* PLATFORM FEE */}
               <div className={s.summary_row}>
                  <span className={s.summary_label}>Platform Fee (2%)</span>

                  <span className={s.summary_val}>
                     ${platformFee.toFixed(2)}
                  </span>
               </div>

               {/* TRADE LOCK */}
               <div className={s.summary_row}>
                  <span className={s.summary_label}>Trade Lock</span>

                  <span className={`${s.summary_val} ${s.trade_ok}`}>
                     {cartItems.every((item) => !item.tradeLock)
                        ? "None"
                        : "Applied"}
                  </span>
               </div>
            </div>
         )}
         {showSummaryBlock && <div className={s.summary_divider} />}

         {showPromo && showBtns && (
            <div className={s.promo_wrap}>
               <CustomInput
                  type="text"
                  placeholder="Promo code"
                  name="promo"
                  value={promo}
                  onChange={handlePromo}
                  className={s.promo_input}
                  error={invalidPromo ? " " : ""}
                  iconSize={18}
                  iconClassname={s.invalid_icon}
                  {...promoInputProps}
                  disabled={isCartEmpty}
               />

               <button
                  className={`${s.promo_btn} ${
                     invalidPromo ? s.invalid_promo : ""
                  } ${validPromo ? s.valid_promo : ""} ${
                     isCartEmpty ? s.promo_btn_disabled : ""
                  }`}
                  onClick={
                     isCartEmpty
                        ? showCartIsEmpty
                        : validPromo
                          ? handleClearPromo
                          : handleApplyPromo
                  }
               >
                  {validPromo ? "Applied" : "Apply"}
               </button>
            </div>
         )}
         {/* =========================
             TOTAL
         ========================= */}
         {showTotal && (
            <div className={s.summary_row}>
               <span className={s.summary_total_label}>Total</span>

               <span className={s.summary_total_val}>${total.toFixed(2)}</span>
            </div>
         )}
         {/* =========================
             PROMO + CHECKOUT
         ========================= */}
         {showBtns && (
            <>
               {/* PROMO */}

               {/* CHECKOUT */}
               {/* CHECKOUT */}
               <button
                  className={`${s.checkout_btn} ${
                     loading
                        ? s.loading
                        : isCartEmpty
                          ? s.checkout_btn_disabled
                          : //   : doesWeHaveErrors !== 0 ? s.checkout_btn_disabled : ""
                            ""
                  }`}
                  onClick={onClick}
               >
                  {loading ? "Processing Payment..." : btnTitle}
               </button>
            </>
         )}
         {/* =========================
             PAYMENT PERKS
         ========================= */}
         {showPaymentPerks && (
            <div className={s.perks_grid}>
               {PAYMENT_PERKS.map((i, index) => (
                  <div key={index} className={s.perks_box}>
                     <label className={s.perk_label}>{i.label}</label>

                     <p className={s.perk_desc}>{i.desc}</p>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default OrderReceipt;
