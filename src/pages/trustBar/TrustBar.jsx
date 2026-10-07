import React from "react";
import s from "./TrustBar.module.css";

const TRUST_ITEMS = [
  {
    id: 1,
    icon: "★",
    value: "21,918 Reviews",
    label: "Excellent",
    highlight: true,
  },
  {
    id: 2,
    icon: "⚡",
    value: "Fees As Low",
    label: "As 2%",
  },
  {
    id: 3,
    icon: "%",
    value: "Up To 50% Off",
    label: "Steam Prices",
  },
  {
    id: 4,
    icon: "🗡",
    value: "Explore 1.3M+",
    label: "Skins",
  },
  // {
  //   id: 5,
  //   icon: "◉",
  //   value: "Happy 4.6M",
  //   label: "Customers",
  // },
];

const TrustBar = () => {
  return (
    <div className={s.trustBar}>
      {TRUST_ITEMS.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={`${s.trustItem} ${item.highlight ? s.highlight : ""}`}>
            {/* <span className={s.icon}>{item.icon}</span> */}
            <div className={s.text}>
              <span className={s.value}>{item.value}</span>
              <span className={s.label}>{item.label}</span>
            </div>
          </div>
          {index < TRUST_ITEMS.length - 1 && (
            <div className={s.divider} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TrustBar;