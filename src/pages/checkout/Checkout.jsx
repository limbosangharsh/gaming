import s from "./Checkout.module.css";
import { PAYMENT_METHODS } from "../../utils/constants/Constants";
import { usePayment } from "../../hooks/cartHooks/usePayment.hooks";
import Icon from "../../utils/icons/Icons";
import CustomInput from "../../components/CustomInput/CustomInput";
import OrderReceipt from "../../components/OrderReceipt/OrderReceipt";
import { useCartData } from "../../hooks/cartHooks/useCartData";

const Checkout = () => {
   // =========================
   // PAYMENT
   // =========================

   const {
      selectedPayment,
      paypalDetails,
      cardDetails,
      handlePaymentSelect,
      handleCardChange,
      handlePaypalChange,
      handleSubmit,
      errors,
      handleBlur,
      paymentModal,
      setPaymentModal,
      handleModal,
      processingModal,
   } = usePayment();

   // =========================
   // CART
   // =========================

   const {
      cartItems,
      isCartEmpty,
      initialItem,
      handleInitialItem,
      handleIncrementQuantity,
      handleDecrementQuantity,
      handleRemoveFromCart,
      handlePlaceOrder,
      loading,
   } = useCartData();

   // console.log("checkout payment modal is ", paymentModal);
   return (
      <div className={s.page}>
         {/* ═════════════════════════════
             LEFT — ORDER RECEIPT
         ═════════════════════════════ */}
         <div className={s.left}>
            <OrderReceipt
               cartItems={cartItems}
               isCartEmpty={isCartEmpty}
               initialItem={initialItem}
               handleInitialItem={handleInitialItem}
               handleIncrementQuantity={handleIncrementQuantity}
               handleDecrementQuantity={handleDecrementQuantity}
               handleRemoveFromCart={handleRemoveFromCart}
               handlePlaceOrder={handlePlaceOrder}
               loading={loading}
               showBtns={false}
               showRemoveCartOption={false}
               disabledIncrementDecrement={true}
               showPaymentPerks={true}
               showSummaryBlock={true}
               showTotal={true}
            />
         </div>
         {/* ═════════════════════════════
             RIGHT — PAYMENT
         ═════════════════════════════ */}
         <div className={s.right}>
            <OrderReceipt
               cartItems={cartItems}
               isCartEmpty={isCartEmpty}
               initialItem={initialItem}
               handleInitialItem={handleInitialItem}
               loading={loading}
               showItems={false}
               showSummaryBlock={false}
               showTrustBlock={false}
               showBtns={true}
               errors={errors}
               onClick={() => handleSubmit(handlePlaceOrder)}
               paymentModal={paymentModal}
               setPaymentModal={setPaymentModal}
            >
               {/* ═════════════════════════════
                   PAYMENT METHODS
               ═════════════════════════════ */}

               {!isCartEmpty && (
                  <div className={s.payment_grid}>
                     {PAYMENT_METHODS.map((method) => {
                        const isActive = selectedPayment === method.id;

                        return (
                           <div
                              key={method.id}
                              className={`${s.payment_card} ${
                                 isActive ? s.payment_active : ""
                              }`}
                              onClick={() => handlePaymentSelect(method.id)}
                           >
                              {/* ═════════════════════
                                  PAYMENT HEADER
                              ═════════════════════ */}

                              <div className={s.payment_header_row}>
                                 <div className={s.payment_icon_wrap}>
                                    <Icon name={method.icon} size={24} />
                                 </div>

                                 <div className={s.payment_info}>
                                    <span className={s.payment_label}>
                                       {method.label}
                                    </span>

                                    <span className={s.payment_sub}>
                                       {method.sub}
                                    </span>
                                 </div>
                              </div>

                              {/* ═════════════════════
                                  PAYMENT FORM
                              ═════════════════════ */}

                              {isActive && (
                                 <div
                                    className={s.payment_form}
                                    onClick={(e) => e.stopPropagation()}
                                 >
                                    {/* ═══════════════
                                        CARD
                                    ═══════════════ */}

                                    {method.id === "card" && (
                                       <div className={s.hold_form}>
                                          <CustomInput
                                             label="Cardholder Name"
                                             placeholder="JOHN DOE"
                                             value={cardDetails.cardName}
                                             name="cardName"
                                             onChange={handleCardChange}
                                             onBlur={handleBlur}
                                             className={s.card_name}
                                             error={errors.cardName}
                                          />

                                          <CustomInput
                                             label="Card Number"
                                             placeholder="1234 5678 9012 3456"
                                             value={cardDetails.cardNumber}
                                             onChange={handleCardChange}
                                             onBlur={handleBlur}
                                             name="cardNumber"
                                             type="text"
                                             inputMode="numeric"
                                             maxLength={19}
                                             error={errors.cardNumber}
                                          />

                                          <div className={s.card_row}>
                                             <CustomInput
                                                label="Expiry"
                                                placeholder="MM / YY"
                                                value={cardDetails.cardExpiry}
                                                onChange={handleCardChange}
                                                onBlur={handleBlur}
                                                name="cardExpiry"
                                                error={errors.cardExpiry}
                                             />

                                             <CustomInput
                                                label="CVV"
                                                placeholder="···"
                                                type="password"
                                                inputMode="numeric"
                                                value={cardDetails.cardCvv}
                                                name="cardCvv"
                                                onChange={handleCardChange}
                                                onBlur={handleBlur}
                                                maxLength={3}
                                                error={errors.cardCvv}
                                             />
                                          </div>
                                       </div>
                                    )}

                                    {/* ═══════════════
                                        PAYPAL
                                    ═══════════════ */}

                                    {method.id === "paypal" && (
                                       <div className={s.hold_form}>
                                          <CustomInput
                                             label="PayPal Email"
                                             placeholder="john@gmail.com"
                                             value={paypalDetails.email}
                                             name="paypalEmail"
                                             onChange={handlePaypalChange}
                                             onBlur={handleBlur}
                                             error={errors.paypalEmail}
                                          />

                                          <CustomInput
                                             label="Billing Address"
                                             placeholder="123 Main Street"
                                             value={paypalDetails.address}
                                             name="paypalAddress"
                                             onChange={handlePaypalChange}
                                             onBlur={handleBlur}
                                             error={errors.paypalAddress}
                                          />

                                          <div className={s.card_row}>
                                             <CustomInput
                                                label="City"
                                                placeholder="New York"
                                                value={paypalDetails.city}
                                                name="paypalCity"
                                                onChange={handlePaypalChange}
                                                onBlur={handleBlur}
                                                error={errors.paypalCity}
                                             />

                                             <CustomInput
                                                label="ZIP Code"
                                                placeholder="10001"
                                                value={paypalDetails.zip}
                                                name="paypalZip"
                                                onChange={handlePaypalChange}
                                                onBlur={handleBlur}
                                                error={errors.paypalZip}
                                             />
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </div>
               )}
               {/* <button onClick={handleModal}>toogle paymentMOdal</button> */}
            </OrderReceipt>
         </div>

         {paymentModal.open && (
            <div className={s.modal}>
               <div className={s.paymentContent}>
                  {processingModal ? (
                     <>
                        <div className={s.processingIcon}>
                           <svg
                              width="64"
                              height="64"
                              viewBox="0 0 64 64"
                              fill="none"
                           >
                              <circle
                                 cx="32"
                                 cy="32"
                                 r="28"
                                 stroke="currentColor"
                                 strokeWidth="3"
                                 strokeDasharray="8 6"
                              />
                           </svg>
                        </div>

                        <h2 className={s.modal_header}>
                           Payment processingModal
                        </h2>

                        <p className={s.modal_desc}>
                           Please wait while we process your payment.
                        </p>
                     </>
                  ) : paymentModal.success ? (
                     <>
                        <div className={s.successIcon}>
                           <svg
                              width="64"
                              height="64"
                              viewBox="0 0 64 64"
                              fill="none"
                           >
                              <circle
                                 cx="32"
                                 cy="32"
                                 r="28"
                                 stroke="currentColor"
                                 strokeWidth="3"
                              />

                              <path
                                 d="M20 32L28 40L44 24"
                                 stroke="currentColor"
                                 strokeWidth="4"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              />
                           </svg>
                        </div>

                        <h2 className={s.modal_header}>Payment Successful</h2>

                        <p className={s.modal_desc}>
                           Your payment has been successfully completed.
                        </p>
                     </>
                  ) : (
                     <>
                        <div className={s.failedIcon}>
                           <svg
                              width="64"
                              height="64"
                              viewBox="0 0 64 64"
                              fill="none"
                           >
                              <circle
                                 cx="32"
                                 cy="32"
                                 r="28"
                                 stroke="currentColor"
                                 strokeWidth="3"
                              />

                              <path
                                 d="M23 23L41 41M41 23L23 41"
                                 stroke="currentColor"
                                 strokeWidth="4"
                                 strokeLinecap="round"
                              />
                           </svg>
                        </div>

                        <h2 className={s.modal_header}>Payment Failed</h2>

                        <p className={s.modal_desc}>
                           Unfortunately, your payment could not be completed.
                        </p>
                     </>
                  )}

                  {/* Progress bar */}
                  {processingModal && (
                     <div className={s.progressTrack}>
                        <div
                           className={`${s.progressBar} ${
                              processingModal
                                 ? s.processingProgress
                                 : paymentModal.success
                                   ? s.successProgress
                                   : s.failedProgress
                           }`}
                        />
                     </div>
                  )}
               </div>
            </div>
         )}
         {/* ═════════════════════════════
             PAYMENT DESCRIPTION
         ═════════════════════════════ */}
         {/*
         <div className={s.payment_desc_box}>
            <p className={s.payment_desc}>
               {PAYMENT_DESCRIPTIONS[selectedPayment]}
            </p>
         </div>
         */}
      </div>
   );
};

export default Checkout;
