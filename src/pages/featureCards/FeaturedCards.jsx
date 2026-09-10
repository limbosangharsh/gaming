import React, { useState, useEffect } from "react";
import s from "./FeaturedCards.module.css";
import Icon from "../../utils/icons/Icons";
import AkImg from "../../media/images/elite_build.avif";
import AwpImg from "../../media/images/elite_build.avif";
import KnifeImg from "../../media/images/elite_build.avif";

const FeaturedCards = () => {
  // ══ LIVE STATE FOR VIEWS & PRICES ══
  const [cardsData, setCardsData] = useState({
    big: { views: 1204, price: 11450.00, flash: null },
    rifle: { views: 593, price: 850.00, flash: null },
    knife: { views: 318, price: 620.00, flash: null }
  });

  // ══ SIMULATE REAL-TIME MARKET ACTIVITY ══
  useEffect(() => {
    // Random view count ticker
    const viewInterval = setInterval(() => {
      const keys = ["big", "rifle", "knife"];
      const target = keys[Math.floor(Math.random() * keys.length)];
      setCardsData(prev => ({
        ...prev,
        [target]: {
          ...prev[target],
          views: prev[target].views + Math.floor(Math.random() * 3) + 1
        }
      }));
    }, 3000);

    // Random price fluctuation ticker
    const priceInterval = setInterval(() => {
      const keys = ["big", "rifle", "knife"];
      const target = keys[Math.floor(Math.random() * keys.length)];
      const isUp = Math.random() > 0.4;
      const delta = (Math.random() * 2.5 + 0.5) * (isUp ? 1 : -1);

      setCardsData(prev => {
        const newPrice = Math.max(10, prev[target].price + delta);
        return {
          ...prev,
          [target]: {
            ...prev[target],
            price: newPrice,
            flash: isUp ? s.priceUp : s.priceDown
          }
        };
      });

      // Clear price flash highlight after animation
      setTimeout(() => {
        setCardsData(prev => ({
          ...prev,
          [target]: { ...prev[target], flash: null }
        }));
      }, 1000);
    }, 5500);

    return () => {
      clearInterval(viewInterval);
      clearInterval(priceInterval);
    };
  }, []);

  return (
    <div className={s.featRow}>
      {/* ══ BIG FEATURED CARD ══ */}
      <a href="/browse/awp-dragon-lore" className={s.featBig}>
        <div className={s.featBigBg} />

        <div className={s.featBigTop}>
          <div className={s.liveStatusBadge}>
            <span className={s.pulseDot} />
            <span className={s.pulseRing} />
            <span className={s.statusText}>HOT LISTING</span>
          </div>

          <span className={`${s.featViews} ${s.liveViews}`}>
            <Icon name="eye" size={12} className={s.eyeIcon} />
            {cardsData.big.views.toLocaleString()}
          </span>
        </div>

        <div className={s.featBigImgWrap}>
          <div className={s.glowAura} />
          <img
            src={AwpImg || AkImg}
            alt="AWP Dragon Lore"
            className={s.featBigImg}
          />
        </div>

        <div className={s.featBigLabel}>
          <span>LEGENDARY SKINS</span>
          <span className={s.demandTag}>🔥 98% DEMAND</span>
        </div>

        <div className={s.featBigFooter}>
          <div>
            <div className={s.featBigName}>AWP | Dragon Lore</div>
            <div className={s.featBigSub}>Factory New • Souvenir</div>
          </div>
          <div className={`${s.featCount} ${cardsData.big.flash || ''}`}>
            <span className={s.liveDot} />
            ${cardsData.big.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </a>

      {/* ══ SMALL FEATURED CARDS STACKED ══ */}
      <div className={s.featSmallCol}>
        {/* Rifle Card */}
        <a
          href="/browse/ak47-fire-serpent"
          className={`${s.featSmall} ${s.cardGreen}`}
        >
          <div className={s.featSmallTop}>
            <div className={s.labelGroup}>
              <span className={s.featSmallLabel}>FEATURED RIFLE</span>
              <span className={s.tradeVolBadge}>12 Trades Today</span>
            </div>
            <span className={`${s.featViews} ${s.liveViews}`}>
              <Icon name="eye" size={10} className={s.eyeIcon} />
              {cardsData.rifle.views.toLocaleString()}
            </span>
          </div>

          <div className={s.smallImgWrap}>
            <div className={s.glowAura} />
            <img
              src={AkImg}
              alt="AK-47 Fire Serpent"
              className={s.featSmallImg}
            />
          </div>

          <div className={s.featSmallFooter}>
            <div>
              <div className={s.featSmallName}>AK-47 | Fire Serpent</div>
              <div className={s.featSmallSub}>Field-Tested • Covert</div>
            </div>
            <div className={`${s.featCount} ${cardsData.rifle.flash || ''}`}>
              <span className={s.liveDot} />
              ${cardsData.rifle.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </a>

        {/* Knife Card */}
        <a
          href="/browse/karambit-case-hardened"
          className={`${s.featSmall} ${s.cardBlue}`}
        >
          <div className={s.featSmallTop}>
            <div className={s.labelGroup}>
              <span className={s.featSmallLabel}>FEATURED KNIFE</span>
              <span className={s.rareTag}>RARE PATTERN</span>
            </div>
            <span className={`${s.featViews} ${s.liveViews}`}>
              <Icon name="eye" size={10} className={s.eyeIcon} />
              {cardsData.knife.views.toLocaleString()}
            </span>
          </div>

          <div className={s.smallImgWrap}>
            <div className={s.glowAura} />
            <img
              src={KnifeImg || AkImg}
              alt="Karambit Case Hardened"
              className={s.featSmallImg}
            />
          </div>

          <div className={s.featSmallFooter}>
            <div>
              <div className={s.featSmallName}>Karambit | Case Hardened</div>
              <div className={s.featSmallSub}>Minimal Wear • Blue Gem</div>
            </div>
            <div className={`${s.featCount} ${cardsData.knife.flash || ''}`}>
              <span className={s.liveDot} />
              ${cardsData.knife.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FeaturedCards;