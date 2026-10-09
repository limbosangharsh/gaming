import s from "./Cart.module.css";

import Icon from "../../utils/icons/Icons";

import { PAYMENT_PERKS } from "../../utils/constants/Constants";

import { useCartData } from "../../hooks/cartHooks/useCartData";

import OrderReceipt from "../../components/OrderReceipt/OrderReceipt.jsx";

import EmptyStore from "../../utils/emptyStore/EmptyStore.jsx";

const Cart = () => {
   const {
      isCartEmpty,
      selectedItem,
      cartItems,
      initialItem,
      handleInitialItem,
      handleIncrementQuantity,
      handleDecrementQuantity,
      handleRemoveFromCart,
      handlePlaceOrder,
      loading,
      handleNavigateCheckout
   } = useCartData();

   // console.log(selectedItem);

   return (
      <div className={s.page}>
         {/* ══ LEFT ══ */}
         <div className={s.left}>
            {/* selected image */}
            <h3 className={s.summary_title}>Item Details</h3>

            <div className={s.summary_divider}></div>

            {!isCartEmpty && selectedItem && (
               <div className={s.initial_img_div}>
                  <img
                     src={selectedItem?.image?.[0]}
                     className={`${s.initial_img} ${
                        selectedItem?.category === "gloves" ? s.img_gloves : ""
                     }`}
                     alt={selectedItem?.name}
                  />

                  <div className={s.img_rating_div}>
                     {Array.from({ length: 5 }, (_, i) => (
                        <Icon
                           key={i}
                           name="star"
                           size={12}
                           style={{
                              color:
                                 i < Math.floor(selectedItem?.rating ?? 0)
                                    ? "#f59e0b"
                                    : "#334155",
                           }}
                        />
                     ))}
                  </div>

                  <label className={s.weapon_name}>
                     {selectedItem?.weapon} | {selectedItem?.name}
                  </label>
               </div>
            )}

            {/* Stats */}
            {!isCartEmpty && selectedItem && (
               <div className={s.stats}>
                  <div className={s.stat_row}>
                     <span className={s.stat_key}>Condition</span>

                     <span className={s.stat_val}>
                        {selectedItem?.condition}
                     </span>
                  </div>

                  <div className={s.stat_row}>
                     <span className={s.stat_key}>Rarity</span>

                     <span className={s.stat_val}>{selectedItem?.rarity}</span>
                  </div>

                  <div className={s.stat_row}>
                     <span className={s.stat_key}>StatTrak</span>

                     <span className={s.stat_val}>
                        {selectedItem?.stattrak ? "Yes" : "No"}
                     </span>
                  </div>

                  <div className={s.stat_row}>
                     <span className={s.stat_key}>In Stock</span>

                     <span
                        className={`${s.stat_val} ${
                           selectedItem?.inStock ? s.in_stock : s.out_stock
                        }`}
                     >
                        {selectedItem?.inStock ? "Available" : "Out of Stock"}
                     </span>
                  </div>
               </div>
            )}

            {/* Description */}
            {!isCartEmpty && selectedItem && (
               <div className={s.desc}>{selectedItem?.description}</div>
            )}


            

            {/* Registry */}
            {!isCartEmpty && selectedItem && (
               <div className={s.registry}>
                  {/* info registry - static for now */}

                  <div className={s.registry_row}>
                     <span className={s.registry_key}>Pattern Index</span>

                     <label className={s.registry_val}>#661</label>
                  </div>

                  <div className={s.registry_row}>
                     <span className={s.registry_key}>Paint Seed</span>

                     <label className={s.registry_val}>887</label>
                  </div>

                  <div className={s.registry_row}>
                     <span className={s.registry_key}>Collection</span>

                     <label className={s.registry_val}>The Phoenix</label>
                  </div>

                  <div className={s.registry_row}>
                     <span className={s.registry_key}>Listed</span>

                     <label className={s.registry_val}>3 hours ago</label>
                  </div>
               </div>
            )}

            {/* Empty cart */}
            {isCartEmpty && (
               <div className={s.empty_store}>
                  <EmptyStore showBtn={false} />
               </div>
            )}

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
         <div className={s.right}>
            <OrderReceipt
               cartItems={cartItems}
               isCartEmpty={isCartEmpty}
               initialItem={initialItem}
               handleInitialItem={handleInitialItem}
               handleIncrementQuantity={handleIncrementQuantity}
               handleDecrementQuantity={handleDecrementQuantity}
               handleRemoveFromCart={handleRemoveFromCart}
               loading={loading}
               btnTitle="Secure Checkout"
               showPromo={false}
               onClick={handleNavigateCheckout}
               showPaymentPerks={true}
            />
         </div>
      </div>
   );
};

export default Cart;
