import React, { useState } from "react";
import s from "./Orders.module.css";
import { useOrdersStats } from "../../hooks/ordersHooks/useOrderStats.hooks";
import CustomInput from "../../components/CustomInput/CustomInput";

const MOCK_ORDERS = [
  {
    id: "ORD-8F3K-99RT",
    items: [
      { name: "AK-47", image: null },
      { name: "AWP", image: null },
      { name: "Karambit", image: null },
    ],
    extraCount: 1,
    itemNames: "AK-47, AWP, Karambit",
    date: "Sep 5, 2026",
    total: 1224.89,
    status: "delivered",
  },
  {
    id: "ORD-2L91-KX07",
    items: [
      { name: "M4A4", image: null },
      { name: "Glock-18", image: null },
    ],
    extraCount: 0,
    itemNames: "M4A4, Glock-18",
    date: "Aug 29, 2026",
    total: 312.4,
    status: "delivering",
  },
  {
    id: "ORD-9RZP-A44M",
    items: [{ name: "Butterfly Knife", image: null }],
    extraCount: 0,
    itemNames: "Butterfly Knife | Fade",
    date: "Aug 21, 2026",
    total: 1640.0,
    status: "delivered",
  },
  {
    id: "ORD-4TQW-B71C",
    items: [
      { name: "Sport Gloves", image: null },
      { name: "USP-S", image: null },
    ],
    extraCount: 2,
    itemNames: "Sport Gloves, USP-S",
    date: "Aug 12, 2026",
    total: 2980.15,
    status: "delivered",
  },
  {
    id: "ORD-1MXE-773D",
    items: [{ name: "Desert Eagle", image: null }],
    extraCount: 0,
    itemNames: "Desert Eagle | Blaze",
    date: "Jul 30, 2026",
    total: 96.0,
    status: "refunded",
  },
];

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

  const getUser = JSON.parse(localStorage.getItem("skinvault_user"));

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesTab =
      activeTab === "All" || order.status === activeTab.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.itemNames.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const delivering = MOCK_ORDERS.filter(
    (o) => o.status === "delivering",
  ).length;

  return (
    <div className={s.wrapper}>
      {/* ══ HEADER ══ */}
      <div className={s.profile}>
        <div className={s.profile_info_container}>
          <span className={s.initial}>{getUser.email[0]}</span>
          <div className={s.hold_names}>
            <div className={s.emailtradecontainer}>
              <span className={s.email}>{getUser.email}</span>
              <span className={s.trades}>{totalOrders} Trades</span>
            </div>
          </div>
        </div>
        <div className={s.editBtn}>
          <span
            className={s.edit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <span>Edit button </span>
          </span>
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
            {delivering}
          </span>
        </div>
        <div className={s.stat_card}>
          <span className={s.stat_label}>Items Purchased</span>
          <span className={s.stat_value}>{totalItems}</span>
        </div>
      </div>

      {/* ══ FILTERS ══ */}
      <div className={s.filters_row}>
        <CustomInput
          wrapperClassname={s.search_input_wrapper}
          className={s.search_input}
          placeholder="Search by order ID or item name"
        />
      </div>

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

        {getOrderedItems.map((order) => (
          <div key={order.id} className={s.order_row}>
            <span className={s.order_id}>{order.id}</span>

            <div className={s.items_cell}>
              {order.items.map((item, index) => (
                <div key={index} className={s.item_pill}>
                  <img src={item.image[0]} className={s.thumb} />
                  <span className={s.item_name}>{item.name}</span>
                  {item.quantity > 1 && (
                    <span className={s.item_qty}>×{item.quantity}</span>
                  )}
                </div>
              ))}
            </div>

            <span className={s.date_cell}>{formatDate(order.placedAt)}</span>

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
      <div className={s.footer}>
        <span className={s.footer_item}>Secured by SkinVault</span>
        <span className={s.footer_dot}>·</span>
        <span className={s.footer_item}>256-bit SSL</span>
        <span className={s.footer_dot}>·</span>
        <span className={s.footer_item}>Instant Delivery</span>
        <span className={s.footer_dot}>·</span>
        <span className={s.footer_item}>Buyer Protection</span>
      </div>
    </div>
  );
};

export default Orders;
