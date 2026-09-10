import React, { useState } from "react";
import s from "./Cart.module.css";
import { rarities } from "../../utils/constants/Constants";
import Icon from "../../utils/icons/Icons";
import CustomInput from "../../components/CustomInput/CustomInput";
import {
  PAYMENT_PERKS,
  PAYMENT_METHODS,
  PAYMENT_DESCRIPTIONS,
} from "../../utils/constants/Constants";
import EmptyStore from "../../utils/emptyStore/EmptyStore";
const RARITY_COLOR = Object.fromEntries(rarities.map((r) => [r.id, r.color]));
import { useCartData } from "../../hooks/cartHooks/useCartData";
import { usePromo } from "../../hooks/cartHooks/usePromo.hooks";
import { usePayment } from "../../hooks/cartHooks/usePayment.hooks";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utils/loader/Loader.jsx";

const Cart = () => {
  const {
    cartData,
    cartItems,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveFromCart,
    isCartEmpty,
    handlePlaceOrder,
    loading,
  } = useCartData();

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

  const {
    selectedPayment,
    setCardDetails,
    setPaypalDetails,
    setSelectedCoin,
    selectedCoin,
    paypalDetails,
    cardDetails,
    handlePaymentSelect,
    handleCardChange,
    handlePaypalChange,
    handleSubmit,
    errors,
    setErrors
  } = usePayment();

  const navigate = useNavigate("");
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * (discountPercentage / 100);
  const platformFee = (subtotal - discountAmount) * 0.02;
  const total = subtotal - discountAmount + platformFee;

  const promoInputProps = {
    wrapperClassname: invalidPromo
      ? s.invalid_promo
      : validPromo
        ? s.valid_promo
        : "",
    suffixIcon: validPromo
      ? "close"
      : validPromo
        ? "checkIcon"
        : invalidPromo
          ? "exclamationIcon"
          : "",
    iconColor: invalidPromo ? "#e05a5a" : validPromo ? "#22c55e" : "#737373",
    iconClassname: invalidPromo
      ? s.invalid_icon
      : validPromo
        ? s.valid_icon
        : "",
    onSuffixClick: invalidPromo ? undefined : handleClearPromo,
    //   disabled: validPromo
  };

  

  return (
    <div className={s.container}>
      {/* ══ LEFT ══ */}
      <div className={s.cart_left}>
        {/* Payment Methods — inline accordion */}
        <div className={s.payment_grid}>
          {PAYMENT_METHODS.map((method) => {
            const isActive = selectedPayment === method.id;
            return (
              <div
                key={method.id}
                className={`${s.payment_card} ${isActive ? s.payment_active : ""}`}
                onClick={() => handlePaymentSelect(method.id)}
              >
                {/* Card Header Row */}
                <div className={s.payment_header_row}>
                  <div className={s.payment_icon_wrap}>
                    <Icon name={method.icon} size={18} />
                  </div>
                  <div className={s.payment_info}>
                    <span className={s.payment_label}>{method.label}</span>
                    <span className={s.payment_sub}>{method.sub}</span>
                  </div>
                </div>

                {/* Inline Expanded Form */}
                {isActive && (
                  <div
                    className={s.payment_form}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* <div className={s.payment_divider} /> */}

                    {method.id === "card" && (
                      <>
                        <CustomInput
                          label="Cardholder Name"
                          placeholder="JOHN DOE"
                          value={cardDetails.cardName}
                          name={"cardName"}
                          onChange={handleCardChange}
                          className={s.card_name}
                          error={errors.cardName}
                        />
                        <CustomInput
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={handleCardChange}
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
                            name={"cardExpiry"}
                            error={errors.cardExpiry}
                          />
                          <CustomInput
                            label="CVC"
                            placeholder="···"
                            type="password"
                            inputMode="numeric"
                            value={cardDetails.cvv}
                            name="cardCvv"
                            onChange={handleCardChange}
                            maxLength={3}
                            error={errors.cardCvv}
                          />
                        </div>
                      </>
                    )}

                    {method.id === "crypto" && (
                      <div className={s.crypto_wrap}>
                        {/* Currency tabs */}
                        <div className={s.crypto_tabs}>
                          {["BTC", "ETH", "USDT"].map((coin) => (
                            <button
                              key={coin}
                              className={`${s.crypto_tab} ${selectedCoin === coin ? s.crypto_tab_active : ""}`}
                              onClick={() => setSelectedCoin(coin)}
                            >
                              {coin}
                            </button>
                          ))}
                        </div>

                        <span className={s.crypto_label}>
                          Send payment to this address
                        </span>
                        <div className={s.crypto_address}>
                          <span className={s.crypto_addr_text}>
                            0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                          </span>
                          {/* <button
                            className={`${s.crypto_copy} ${copied ? s.crypto_copy_done : ""}`}
                            onClick={() =>
                              handleCopy(
                                "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                              )
                            }
                          >
                            {copied ? "✓ Copied" : "Copy"}
                          </button> */}
                        </div>
                        <span className={s.crypto_amount}>
                          0.00023 {selectedCoin} ≈ $
                          {(
                            cartItems.reduce(
                              (acc, item) => acc + item.price * item.quantity,
                              0,
                            ) * 1.02
                          ).toFixed(2)}
                        </span>

                        <div className={s.crypto_info}>
                          <div className={s.crypto_info_row}>
                            <span className={s.crypto_info_label}>Network</span>
                            <span className={s.crypto_info_val}>ERC-20</span>
                          </div>
                          <div className={s.crypto_info_row}>
                            <span className={s.crypto_info_label}>
                              Confirmations
                            </span>
                            <span className={s.crypto_info_val}>
                              3 required
                            </span>
                          </div>
                          <div className={s.crypto_info_row}>
                            <span className={s.crypto_info_label}>
                              Expires in
                            </span>
                            <span
                              className={s.crypto_info_val}
                              style={{
                                color: "#f59e0b",
                              }}
                            >
                              14:32
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {method.id === "paypal" && (
                      <div className={s.paypal_wrap}>
                        <CustomInput
                          label="PayPal Email"
                          placeholder="john@gmail.com"
                          value={paypalDetails.email}
                          name={"paypalEmail"}
                          onChange={handlePaypalChange}
                        />
                        <CustomInput
                          label="Billing Address"
                          placeholder="123 Main Street"
                          value={paypalDetails.address}
                          name={"paypalAddress"}
                          onChange={handlePaypalChange}
                        />
                        <div className={s.card_row}>
                          <CustomInput
                            label="City"
                            placeholder="New York"
                            value={paypalDetails.city}
                            name={"paypalCity"}
                            onChange={handlePaypalChange}
                          />
                          <CustomInput
                            label="ZIP Code"
                            placeholder="10001"
                            value={paypalDetails.zip}
                            name={"paypalZip"}
                            onChange={handlePaypalChange}
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

        <div className={s.payment_desc_box}>
          <p className={s.payment_desc}>
            {PAYMENT_DESCRIPTIONS[selectedPayment]}
          </p>
        </div>

        {/* Trust Perks */}
        <div className={s.perks_grid}>
          {PAYMENT_PERKS.map((i, index) => (
            <div key={index} className={s.perks_box}>
              <label className={s.perk_label}>{i.label}</label>
              <p className={s.perk_desc}>{i.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ RIGHT ══ */}
      <div className={s.cart_right}>
        <h3 className={s.summary_title}>Order Receipt</h3>

        <div className={s.summary_divider} />

        {isCartEmpty && <EmptyStore />}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className={s.receipt_row}
            style={{
              "--rarity-color": RARITY_COLOR[item.rarity] ?? "#ffffff",
            }}
          >
            <div className={s.receipt_row_left}>
              <span className={s.receipt_name}>
                <div className={s.receipt_name_row}>
                  {item.weapon} | {item.name}
                </div>
                <span className={s.receipt_condition}>{item.condition}</span>
              </span>
            </div>
            <div className={s.quantity_ctrl}>
              <button
                className={`${s.qty_btn} ${item.quantity === 1 ? s.qty_btn_disabled : ""}`}
                onClick={() => handleDecrementQuantity(item.id)}
              >
                <Icon name={"removeIcon"} size={12} />
              </button>
              <span className={s.qty_val}>{item.quantity}</span>
              <button
                className={s.qty_btn}
                onClick={() => handleIncrementQuantity(item.id)}
              >
                <Icon name={"addIcon"} size={12} />
              </button>
            </div>
            <span className={s.receipt_price}>${item.price.toFixed(2)}</span>
            <span
              className={s.close_span}
              onClick={() => handleRemoveFromCart(item.id, setErrors)}
            >
              <Icon name={"close"} size={12} />
            </span>
          </div>
        ))}

        {/* <div className={s.summary_divider} /> */}
        <div className={s.space_up}></div>
        <div className={s.summary_divider} />

        <div className={s.hold_math}>
          <div className={s.summary_row}>
            <span className={s.summary_label}>Subtotal</span>
            <span className={s.summary_val}>${subtotal.toFixed(2)}</span>
          </div>
          {/* {cartItems.some((item) => item.discount > 0) && ( */}
          <div className={s.summary_row}>
            <span className={s.summary_label}>
              Discount ( {discountPercentage}% )
            </span>
            <span className={s.summary_discount}>
              ${discountAmount.toFixed(2)}
            </span>{" "}
          </div>
          {/* )} */}
          <div className={s.summary_row}>
            <span className={s.summary_label}>Platform Fee ( 2% )</span>
            <span className={s.summary_val}>${platformFee.toFixed(2)}</span>
          </div>
          <div className={s.summary_row}>
            <span className={s.summary_label}>Trade Lock</span>
            <span className={`${s.summary_val} ${s.trade_ok}`}>
              {cartItems.every((item) => !item.tradeLock) ? "None" : "Applied"}
            </span>
          </div>
        </div>

        <div className={s.summary_divider} />

        <div className={s.summary_row}>
          <span className={s.summary_total_label}>Total</span>
          <span className={s.summary_total_val}>${total.toFixed(2)}</span>
        </div>

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
          />
          <button
            className={`${s.promo_btn} ${invalidPromo ? s.invalid_promo : ""}  ${validPromo ? s.valid_promo : ""} ${isCartEmpty ? s.promo_btn_disabled : ""} `}
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

        <button
          className={`${s.checkout_btn} ${loading ? s.loading : ""}`}
          onClick={() => handleSubmit(handlePlaceOrder)}
          disabled={isCartEmpty}
        >
          {loading ? "Processing Payment..." : "Place Order"}
        </button>

        <div className={s.trust}>
          <span className={s.trust_item}>🔒 Secure Payment</span>
          <span className={s.trust_item}>⚡ Instant Delivery</span>
          <span className={s.trust_item}>✓ Buyer Protection</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
