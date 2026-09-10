import React from "react";
import s from "./WhyUs.module.css";

import { FEATURES } from "../../utils/constants/Constants";


const featuredFeature = FEATURES.find((a) => a.featured);
const sideFeatures = FEATURES.filter((a) => !a.featured);

const WhyUs = () => {
  return (
    <section className={s.container}>
      <div className={s.header}>
        <h2 className={s.title}>Why Choose SkinVault</h2>
      </div>

      <div className={s.grid}>
        <div className={s.featured}>
          <div className={s.featured_img_wrap}>
            <img
              src={featuredFeature.image}
              alt={featuredFeature.title}
              className={s.featured_img}
            />
            <div className={s.featured_overlay} />
            <div className={s.featured_tag}>{featuredFeature.tag}</div>
          </div>
          <div className={s.featured_body}>
            <span className={s.date}>{featuredFeature.date}</span>
            <h3 className={s.featured_title}>{featuredFeature.title}</h3>
            <p className={s.featured_desc}>{featuredFeature.description}</p>
          </div>
        </div>

        <div className={s.side_list}>
          {sideFeatures.map((feature) => (
            <div key={feature.id} className={s.side_item}>
              <div className={s.side_img_wrap}>
                <img src={feature.image} alt="" />
              </div>
              <div className={s.side_body}>
                <span className={s.side_tag}>{feature.tag}</span>
                <h4 className={s.side_title}>{feature.title}</h4>
                <p className={s.side_desc}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;