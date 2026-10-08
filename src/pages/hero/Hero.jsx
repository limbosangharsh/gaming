import React from "react";
import s from "./Hero.module.css";
import AnimatedNumber from "../../utils/animatedNumber/AnimatedNumber";

const Hero = () => {
   return (
      <section className={s.hero}>
         <div className={s.inner}>
            {/* ══ LEFT ══ */}
            <div className={s.left}>
               <div className={s.eyebrow}>
                  <span className={s.eyebrowDot} />
                  LIVE MARKET
                  <span className={s.animated_num}>
                     <AnimatedNumber target={2400} suffix="+" />
                  </span>
                  &nbsp;SKINS LISTED
               </div>

               <h1 className={s.heading}>
                  <span className={s.headWhite}>TRADE SKINS</span>
                  <br />
                  <span className={s.headWhite}>AT REAL</span>
                  <br />
                  <span className={s.headCyan}>MARKET PRICE</span>
               </h1>

               <p className={s.sub}>
                  Buy CS2 skins instantly. No middleman, no fees — just live
                  market prices and instant delivery.
               </p>

               <div className={s.ctaRow}>
                  <a href="/store" className={s.btnPrimary}>
                     Browse Market
                  </a>
                  <a href="/signup" className={s.btnGhost}>
                     Connect Steam
                     <svg className={s.arrow} viewBox="0 0 16 16" fill="none">
                        <path
                           d="M3 8h10M9 4l4 4-4 4"
                           stroke="currentColor"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </a>
               </div>

               <div className={s.stats}>
                  <div className={s.stat}>
                     <span className={s.statVal}>
                        <AnimatedNumber target={293} suffix="+" />{" "}
                     </span>
                     <span className={s.statLabel}>Traded Everyday</span>
                  </div>
                  <div className={s.statDivider} />
                  <div className={s.stat}>
                     <span className={s.statVal}>
                        <AnimatedNumber target={750} suffix="+" />
                     </span>
                     <span className={s.statLabel}>Active Users</span>
                  </div>
                  <div className={s.statDivider} />
                  <div className={s.stat}>
                     <span className={s.statVal}>
                        <AnimatedNumber target={105000} suffix="+" />{" "}
                     </span>
                     <span className={s.statLabel}>Traded Every Year</span>
                  </div>
               </div>
            </div>

            {/* ══ RIGHT (coming soon) ══ */}
         </div>
      </section>
   );
};

export default Hero;
