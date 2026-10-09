import React, { useEffect, useState } from "react";
import s from "./Orders.module.css";
import { useOrdersStats } from "../../hooks/ordersHooks/useOrderStats.hooks";
import CustomInput from "../../components/CustomInput/CustomInput";
import { MOCK_ORDERS } from "../../utils/constants/Constants";

const statusBadgeClass = {
   delivered: s.badge_delivered,
   delivering: s.badge_delivering,
   refunded: s.badge_refunded,
};

const statusLabel = {
   delivered: "Delivered",
   delivering: "Delivering",
   refunded: "Refunded",
};

const Orders = () => {
   const { totalSpent, totalItems, totalOrders, getOrderedItems, formatDate } =
      useOrdersStats();

   const [itemModal, setItemModal] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);

   const handleOpenModal = (order) => {
      setSelectedOrder(order);
      setItemModal(true);
   };

   const handleCloseModal = () => {
      setItemModal(false);
      setSelectedOrder(null);
   };

   const getUser = JSON.parse(localStorage.getItem("logged_user"));

   const [search, setSearch] = useState("");

   const filteredOrders = getOrderedItems.filter((order) => {
      const matchesSearch =
         order.id.toLowerCase().includes(search.toLowerCase()) ||
         order.items.some((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
         );

      return matchesSearch;
   });

   // console.log(getOrderedItems);
   const delivering = MOCK_ORDERS.filter(
      (o) => o.status === "delivering",
   ).length;

   useEffect(() => {
      if (itemModal) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }

      return () => {
         document.body.style.overflow = "";
      };
   }, [itemModal]);

   // console.log(itemModal);

   //  console.log(filteredOrders);
   return (
      <div className={s.page}>
         {/* ══ HEADER ══ */}
         <div className={s.profile}>
            <div className={s.profile_info_container}>
               <span className={s.initial}>{getUser?.email[0]}</span>
               <div className={s.hold_names}>
                  <div className={s.emailtradecontainer}>
                     <span className={s.email}>{getUser?.email}</span>
                  </div>
               </div>
            </div>
            <div className={s.editBtn}>
               <span className={s.trades}>{totalOrders} Trades</span>
            </div>
         </div>
         {/* <div className={s.header}> */}
         {/* <h1 className={s.title}>Order History</h1> */}
         {/* <span className={s.order_count}>{totalOrders} helleo</span> */}
         {/* </div> */}

         {/* ══ STATS ══ */}
         <div className={s.stats_row}>
            <div className={s.stat_card}>
               <span className={s.stat_label}>Total Spent</span>
               <span className={`${s.stat_value} ${s.stat_value_accent}`}>
                  $
                  {totalSpent.toLocaleString("en-US", {
                     minimumFractionDigits: 2,
                  })}
               </span>
            </div>
            <div className={s.stat_card}>
               <span className={s.stat_label}>Total Orders</span>
               <span className={s.stat_value}>{totalOrders}</span>
            </div>
            <div className={s.stat_card}>
               <span className={s.stat_label}>Delivering</span>
               <span className={`${s.stat_value} ${s.stat_value_delivering}`}>
                  {  delivering}
                  {/* 0 */}
               </span>
            </div>
            <div className={s.stat_card}>
               <span className={s.stat_label}>Items Purchased</span>
               <span className={s.stat_value}>{totalItems}</span>
            </div>
         </div>

         {/* ══ FILTERS ══ */}
         {/* <div className={s.filters_row}>
            <CustomInput
               name={"search"}
               wrapperClassname={s.search_input_wrapper}
               className={s.search_input}
               placeholder="Search by order ID or item name"
               value={search}
               onChange={(_, value) => setSearch(value)}
            />
         </div> */}

         {/* ══ TABLE ══ */}
         <div className={s.table_wrap}>
            <div className={s.table_head}>
               <span className={s.th}>Order ID</span>
               <span className={s.th}>Items</span>
               <span className={s.th}>Date</span>
               <span className={s.th}>Payment</span>
               <span className={s.th}>Total</span>
               <span className={s.th}>Status</span>
               <span className={s.th}></span>
            </div>

            {filteredOrders?.map((order) => (
               <div key={order.id} className={s.order_row}>
                  <span className={s.order_id}>{order.id}</span>
                  <div className={s.items_cell}>
                     {order.items.length > 0 && (
                        <>
                           <div className={s.item_pill}>
                              <img
                                 src={order.items[0]?.image?.[0]}
                                 className={s.thumb}
                                 alt={order.items[0]?.name}
                              />

                              <span className={s.item_name}>
                                 {order.items[0]?.name}
                              </span>

                              {order.items[0]?.quantity > 1 && (
                                 <span className={s.item_qty}>
                                    ×{order.items[0].quantity}
                                 </span>
                              )}
                           </div>

                           {order.items.length > 1 && (
                              <div
                                 className={s.modal_btn}
                                 onClick={() => handleOpenModal(order)}
                              >
                                 +{order.items.length - 1}
                              </div>
                           )}
                        </>
                     )}
                  </div>

                  {itemModal && selectedOrder && (
                     <div
                        className={s.item_modal_overlay}
                        onClick={(e) => {
                           if (e.target === e.currentTarget) {
                              handleCloseModal();
                           }
                        }}
                     >
                        <div className={s.item_modal}>
                           <div className={s.modal_header}>
                              <div>
                                 <span className={s.modal_label}>
                                    ORDER ITEMS
                                 </span>
                                 <h2>Order #{selectedOrder.id}</h2>
                              </div>

                              <button
                                 className={s.modal_close}
                                 onClick={handleCloseModal}
                              >
                                 ×
                              </button>
                           </div>

                           <div className={s.modal_items}>
                              {selectedOrder.items.map((item, index) => (
                                 <div className={s.modal_item} key={index}>
                                    <img
                                       src={item?.image?.[0]}
                                       alt={item?.name}
                                       className={s.modal_thumb}
                                    />

                                    <div className={s.modal_item_info}>
                                       <span className={s.modal_item_name}>
                                          {item?.name}
                                       </span>

                                       <span className={s.modal_item_qty}>
                                          Quantity ×{item?.quantity ?? 1}
                                       </span>
                                    </div>

                                    <span className={s.modal_item_number}>
                                       #{index + 1}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}
                  <span className={s.date_cell}>
                     {formatDate(order.placedAt)}
                  </span>

                  <span className={s.date_cell}>Credit Card</span>

                  <span className={s.total_cell}>
                     $
                     {order.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                     })}
                  </span>

                  <div className={s.status_cell}>
                     <span className={`${s.badge}`}>
                        {/* {statusLabel[order.status]} */}
                        Delivered
                     </span>
                  </div>

                  {/* <div className={s.view_cell}>
                     <button className={s.view_link}>View →</button>
                  </div> */}
               </div>
            ))}
         </div>

         {/* ══ FOOTER ══ */}
         {/* <div className={s.footer}>
            <span className={s.footer_item}>Secured by SkinVault</span>
            <span className={s.footer_dot}>·</span>
            <span className={s.footer_item}>256-bit SSL</span>
            <span className={s.footer_dot}>·</span>
            <span className={s.footer_item}>Instant Delivery</span>
            <span className={s.footer_dot}>·</span>
            <span className={s.footer_item}>Buyer Protection</span>
         </div> */}
      </div>
   );
};

export default Orders;
