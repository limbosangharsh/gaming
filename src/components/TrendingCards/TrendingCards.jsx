import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import s from "./TrendingCards.module.css";
import { rarities } from "../../utils/constants/Constants";
import Icon from "../../utils/icons/Icons";
import CarouselModule from "react-multi-carousel";
import { useLocation, useNavigate } from "react-router-dom";
const Carousel = CarouselModule.default || CarouselModule;
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../../utils/skeleton/Skelton";
import useCart from "../../hooks/viewItemHooks/useCart";

const renderStars = (rating) => {
  const roundedRating = Math.round(rating * 2) / 2;

  return Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;

    const isFull = roundedRating >= starValue;
    const isHalf =
      roundedRating >= starValue - 0.5 &&
      roundedRating < starValue;

    return (
      <span
        key={i}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "12px",
          height: "12px",
          lineHeight: 0,
        }}
      >
        {/* Empty star */}
        <Icon
          name="star"
          size={12}
          style={{
            color: "#334155",
            display: "block",
          }}
        />

        {/* Full star */}
        {isFull && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="star"
              size={12}
              style={{
                color: "#f59e0b",
                display: "block",
              }}
            />
          </span>
        )}

        {/* Half star */}
        {isHalf && (
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "12px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "12px",
                minWidth: "12px",
                height: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="star"
                size={12}
                style={{
                  color: "#f59e0b",
                  display: "block",
                }}
              />
            </span>
          </span>
        )}
      </span>
    );
  });
};


const RARITY_COLOR = Object.fromEntries(rarities.map((r) => [r.id, r.color]));

const TrendingCards = ({
   skins = [],
   columns = "repeat(4, 1fr)",
   title = "",
   subtitle = "",
   showViewMore = false,
   viewMoreLink = "/store",
   autoPlay = false,
   autoPlaySpeed = 2000,
   pageSize = 4,
   img_height = "150px",
   showPrice = true,
   showFloatBar = true,
   cardContainerClass,
   showWeaponName = true,
   ShowWeaponSkin = true,
   mobileSize = 2,

   loading = false,
}) => {
   const { addToCart } = useCart();

   const navigate = useNavigate();
   const location = useLocation();
   const responsive = {
      desktop: {
         breakpoint: { max: 3000, min: 1024 },
         items: pageSize,
      },
      tablet: {
         breakpoint: { max: 1024, min: 570 },
         items: 3,
      },
      mobile: {
         breakpoint: { max: 570, min: 0 },
         items: mobileSize ?? 2,
      },
   };

   const handleViewMoreRouting = () => {
      // console.log('click ', viewMoreLink)
      navigate(`${viewMoreLink}`);
   };

   const handleViewItem = (skin) => {
      // console.log(skin.id)
      navigate(`/store/item/${skin.id}`);
   };

   const renderCard = (skin) => {
      return (
         <div
            key={skin.id}
            className={s.card}
            style={{ "--rarity-color": RARITY_COLOR[skin.rarity] ?? "#ffffff" }}
            onClick={() => handleViewItem(skin)}
         >
            <div className={s.trending_label}>{skin.condition}</div>
            <div className={s.card_body}>
               {showWeaponName && <label className={s.name}>{skin.name}</label>}
               {ShowWeaponSkin && (
                  <label className={s.weapon}>{skin.weapon}</label>
               )}
               <div
                  className={`${s.img_wrap} ${location.pathname.includes("/store") ? s.img_wrap_store : autoPlay ? s.carousal_img_wrap : ""}`}
                  style={{
                     height: img_height,
                  }}
               >
                  <img
                     src={skin?.image[0]}
                     alt={`${skin.weapon} ${skin.name}`}
                     loading="lazy"
                     className={`${s.card_img} ${skin.category === "gloves" ? s.card_img_gloves : ""}`}
                  />
                  {/* <button
                     className={s.add_to_cart}
                     onClick={(e) => {
                        addToCart(skin, 1);
                        // console.log(skin)
                        e.stopPropagation();
                     }}
                  >
                     <Icon name="cart" size={16} />
                     Add to Cart
                  </button> */}
               </div>
               <div className={s.meta}>
                  <div className={s.meta_left}>
                     <span className={s.condition}>{skin.condition}</span>
                     {skin.stattrak && <span className={s.st}>ST</span>}
                  </div>
                  <div className={s.stars}>
                     {renderStars(skin.rating)}
                     <span className={s.rating_val}>{skin.rating}</span>
                  </div>
               </div>
               {showFloatBar && (
                  <div className={s.float_row}>
                     <div className={s.float_bar}>
                        <div
                           className={s.float_fill}
                           style={{ width: `${skin.float * 100}%` }}
                        />
                     </div>
                     <span className={s.float_val}>{skin.float}</span>
                  </div>
               )}
               {showPrice && (
                  <div className={s.price_row}>
                     <span className={s.price}>${skin.price.toFixed(2)}</span>
                     {skin.discount > 0 && (
                        <>
                           <span className={s.original}>
                              ${skin.originalPrice.toFixed(2)}
                           </span>
                           <span className={s.discount}>-{skin.discount}%</span>
                        </>
                     )}
                  </div>
               )}
            </div>
         </div>
      );
   };

   return (
      <div className={s.container}>
         {title && (
            <div className={s.header}>
               <div className={s.header_left}>
                  <h1 className={s.header_left_title}>{title}</h1>
                  {subtitle && (
                     <span className={s.header_left_subtitle}>{subtitle}</span>
                  )}
               </div>
               {showViewMore && (
                  <span onClick={handleViewMoreRouting} className={s.view_more}>
                     View More
                  </span>
               )}
            </div>
         )}

         {autoPlay ? (
            <Carousel
               responsive={responsive}
               infinite={true}
               autoPlay={autoPlay}
               autoPlaySpeed={autoPlaySpeed}
               keyBoardControl={true}
               removeArrowOnDeviceType={["mobile", "desktop", "tablet"]}
               itemClass={s.slide_wrap}
               className={s.parent_slide_wrap}
            >
               {loading
                  ? Array.from({ length: pageSize }).map((_, i) => (
                       <div key={i}>
                          <CardSkeleton
                             count={1}
                             img_height={img_height}
                             showPrice={showPrice}
                          />
                       </div>
                    ))
                  : skins.map((skin) => (
                       <div key={skin.id}>{renderCard(skin)}</div>
                    ))}
            </Carousel>
         ) : (
            <div
               className={`${s.card_container} ${cardContainerClass || ""}`}
               style={{ gridTemplateColumns: columns }}
            >
               {loading ? (
                  <CardSkeleton
                     count={pageSize}
                     img_height={img_height}
                     showPrice={showPrice}
                  />
               ) : (
                  skins.map((skin) => renderCard(skin))
               )}
            </div>
         )}
      </div>
   );
};

export default React.memo(TrendingCards);
