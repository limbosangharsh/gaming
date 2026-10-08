import React, { useState, useRef } from "react";
import s from "./ViewItem.module.css";
import { useParams } from "react-router-dom";
import CarouselModule from "react-multi-carousel";
import TrendingCard from "../../components/TrendingCards/TrendingCards";
import Icon from "../../utils/icons/Icons";
import useSkin from "../../hooks/viewItemHooks/useSkin";
import useCart from "../../hooks/viewItemHooks/useCart";
import useQuantity from "../../hooks/viewItemHooks/useQuantity";

const Carousel = CarouselModule.default || CarouselModule;

const CONDITION_MAP = {
   FN: "Factory New",
   MW: "Minimal Wear",
   FT: "Field-Tested",
   WW: "Well-Worn",
   BS: "Battle-Scarred",
};

const responsive = {
   desktop: { breakpoint: { max: 3000, min: 0 }, items: 1 },
};

const ViewItem = () => {
   const { id } = useParams();
   const { skin, similarSkins } = useSkin(id);
   const { animateCart, addToCart } = useCart(id);
   const { quantity, increment, decrement } = useQuantity();

   const [activeImage, setActiveImage] = useState(0);
   const carouselRef = useRef(null);

   if (!skin) return <div>Skin not found</div>;

   const totalPriceAfterQuantiy = skin.price.toFixed(2) * quantity
   // console.log(animateCart)
   return (
      <div className={s.wrapper}>
         <div className={s.top}>
            <div className={s.top_left}>
               <div className={s.img_wrap}>
                  <span className={s.watermark}>{skin.name}</span>
                  <span className={s.img_rarity}>{skin.rarity}</span>
                  <span className={s.img_float}>Float {skin.float}</span>
                  <Carousel
                     ref={carouselRef}
                     responsive={responsive}
                     infinite={true}
                     autoPlay={true}
                     showDots={true}
                     dotListClass={s.dot_list}
                     keyBoardControl={true}
                     removeArrowOnDeviceType={[]}
                     itemClass={s.slide_wrap}
                     containerClass={s.carousel_container}
                     afterChange={(prev, { currentSlide }) =>
                        setActiveImage(currentSlide)
                     }
                  >
                     {skin.image.map((img, i) => (
                        <img
                           key={i}
                           src={img}
                           alt={`${skin.weapon} ${skin.name}`}
                           className={s.main_img}
                           draggable={false}
                        />
                     ))}
                  </Carousel>
                  <div className={s.inspect_bar}>
                     <span className={s.inspect_btn}>Inspect in Game</span>
                     <span className={s.inspect_dot}>·</span>
                     <span className={s.inspect_btn}>Screenshot</span>
                     <span className={s.inspect_dot}>·</span>
                     <span className={s.inspect_btn}>Wear Preview</span>
                  </div>
               </div>
               <div className={s.description}>
                  <h3 className={s.section_title}>Description</h3>
                  <div className={s.divider} />
                  <p className={s.desc_text}>{skin.description}</p>
               </div>
            </div>

            <div className={s.top_right}>
               <div className={s.item_header}>
                  <span className={s.weapon}>{skin.weapon}</span>
                  <h1 className={s.name}>{skin.name}</h1>
                  <div className={s.tags}>
                     {skin.tags.map((tag) => (
                        <span key={tag} className={s.tag}>
                           {tag}
                        </span>
                     ))}
                     <div className={s.img_rating_div}>
                        {Array.from({ length: 5 }, (_, i) => (
                           <Icon
                              key={i}
                              name="star"
                              size={12}
                              style={{
                                 color:
                                    i < Math.floor(skin.rating)
                                       ? "#f59e0b"
                                       : "#334155",
                              }}
                           />
                        ))}
                        <span className={s.hello}>{skin.rating}</span>
                     </div>
                  </div>
               </div>

               <div className={s.divider} />

               <div className={s.stats}>
                  <div className={s.stat_row}>
                     <span className={s.stat_key}>Condition</span>
                     <span className={s.stat_val}>
                        {CONDITION_MAP[skin.condition]}
                     </span>
                  </div>
                  <div className={s.stat_row}>
                     <span className={s.stat_key}>Rarity</span>
                     <span className={s.stat_val}>{skin.rarity}</span>
                  </div>
                  <div className={s.stat_row}>
                     <span className={s.stat_key}>StatTrak</span>
                     <span className={s.stat_val}>
                        {skin.stattrak ? "Yes" : "No"}
                     </span>
                  </div>
                  <div className={s.stat_row}>
                     <span className={s.stat_key}>In Stock</span>
                     <span
                        className={`${s.stat_val} ${skin.inStock ? s.in_stock : s.out_stock}`}
                     >
                        {skin.inStock ? "Available" : "Out of Stock"}
                     </span>
                  </div>
               </div>

               <div className={s.float_section}>
                  <div className={s.float_labels}>
                     <span className={s.float_key}>Float Value</span>
                     <span className={s.float_num}>{skin.float}</span>
                  </div>
                  <div className={s.float_bar}>
                     <div
                        className={s.float_fill}
                        style={{ width: `${skin.float * 100}%` }}
                     />
                  </div>
                  <div className={s.float_range}>
                     <span>0.00</span>
                     <span>FN</span>
                     <span>MW</span>
                     <span>FT</span>
                     <span>WW</span>
                     <span>BS</span>
                     <span>1.00</span>
                  </div>
               </div>

               <div className={s.divider} />

               <div className={s.price_wrap}>
                  <span className={s.price}>${totalPriceAfterQuantiy}</span>
                  {skin.discount > 0 && (
                     <div className={s.price_meta}>
                        <span className={s.original}>
                           ${skin.originalPrice.toFixed(2)}
                        </span>
                        <span className={s.discount}>-{skin.discount}%</span>
                     </div>
                  )}
               </div>
               <div className={s.cart_row}>
                  <div className={s.quantity_ctrl}>
                     <button className={s.qty_btn} onClick={decrement}>
                        −
                     </button>
                     <span className={s.qty_val}>{quantity}</span>
                     <button className={s.qty_btn} onClick={increment}>
                        +
                     </button>
                  </div>
                  <button
                     className={`${s.btn_primary} ${animateCart ? s.added_cart : ""}`}
                     onClick={() => addToCart(skin, quantity)}
                     style={{ opacity: animateCart ? 0.9 : 1 }}
                  >
                     {animateCart ? "✓ Added To Cart" : "Add to Cart"}
                  </button>
               </div>

               <div className={s.registry}>
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

               <div className={s.guarantee_strip}>
                  <span>
                     <Icon name="shieldIcon" size={12} color="#22c55e" />{" "}
                     Verified
                  </span>
                  <span className={s.guarantee_dot}>·</span>
                  <span>
                     <Icon name="boltIcon" size={12} color="#22c55e" /> Instant
                     delivery
                  </span>
                  <span className={s.guarantee_dot}>·</span>
                  <span>
                     <Icon name="returnIcon" size={12} color="#22c55e" /> 7-day
                     returns
                  </span>
               </div>
            </div>
         </div>

         <div className={s.similar_skins}>
            {similarSkins.length > 0 && (
               <div className={s.similar}>
                  <TrendingCard
                     skins={similarSkins}
                     autoPlay={true}
                     img_height="140px"
                     pageSize={4}
                     showWeaponName={false}
                     ShowWeaponSkin={false}
                     showFloatBar={false}
                     showPrice={false}
                     title={`Explore ${skin.category} Collection`}
                     subtitle="Discover related finishes and popular alternative skins for this weapon."
                  />
               </div>
            )}
         </div>
      </div>
   );
};

export default ViewItem;
