import React from "react";
import s from "./Footer.module.css";
import {
  FooterQuickLinks,
  FooterLegalLinks,
  FooterStatsLinks,
  FooterCategories,
} from "../../utils/constants/Constants";

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.top_container}>

        {/* ══ COL 1 — BRAND ══ */}
        <div className={s.footer_row1}>
          <a href="/" className={s.logo}>
            <div className={s.logo_icon}>
              <span className={s.logo_pulse}></span>
            </div>
            <span className={s.logo_text}>
              SKIN<span className={s.logo_accent}>VAULT</span>
            </span>
          </a>
          <p className={s.tagline}>
            Buy and sell CS2 skins instantly. No middleman, no hidden fees — just live market prices.
          </p>
          <div className={s.socials}>
            <a href="#" className={s.social_link}>Steam</a>
            <a href="#" className={s.social_link}>Discord</a>
            <a href="#" className={s.social_link}>Twitter</a>
          </div>
        </div>

        {/* ══ COL 2 — QUICK LINKS ══ */}
        <div className={s.footer_row2}>
          <h4 className={s.col_title}>Quick Links</h4>
          <ul className={s.link_list}>
            {FooterQuickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ══ COL 3 — CATEGORIES ══ */}
        <div className={s.footer_row3}>
          <h4 className={s.col_title}>Categories</h4>
          <ul className={s.link_list}>
            {FooterCategories.map((cat) => (
              <li key={cat}>
                <a href={`/browse?cat=${cat.toLowerCase()}`}>{cat}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ══ COL 4 — LEGAL ══ */}
        <div className={s.footer_row4}>
          <h4 className={s.col_title}>Legal</h4>
          <ul className={s.link_list}>
            {FooterLegalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className={s.bottom_container}>
        <p className={s.copyright}>
          © 2026 SkinVault. Not affiliated with Valve Corporation.
        </p>
        <div className={s.stats}>
          {FooterStatsLinks.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <span className={s.stat}>
                <span className={s.stat_val}>{stat.value}</span>
                <span className={s.stat_label}>{stat.label}</span>
              </span>
              {i < FooterStatsLinks.length - 1 && <span className={s.dot}>·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;