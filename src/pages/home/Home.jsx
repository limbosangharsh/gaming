import React, { useEffect, useState } from "react";
import Hero from "../hero/Hero";
import TrustBar from "../trustBar/TrustBar";
import TrendingCards from "../../components/TrendingCards/TrendingCards";
import WhyUs from "../whyUs/WhyUs";
import { ak47, gloves, knives, snipers } from "../../utils/constants/Constants";

const Home = () => {
   const [screenSize, setScreenSize] = useState("desktop");

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth <= 570) {
            setScreenSize("small");
         } else if (window.innerWidth <= 768) {
            setScreenSize("mobile");
         } else if (window.innerWidth <= 1024) {
            setScreenSize("desktop");
         } else {
            setScreenSize("large");
         }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const [showInitialSkeleton, setShowInitialSkeleton] = useState(
      () => !sessionStorage.getItem("firstTimeLoading"),
   );

   useEffect(() => {
      if (!showInitialSkeleton) return;

      const timer = setTimeout(() => {
         sessionStorage.setItem("firstTimeLoading", "true");
         setShowInitialSkeleton(false);
      }, 5000);

      return () => clearTimeout(timer);
   }, [showInitialSkeleton]);

   return (
      <>
         <Hero />
         <TrustBar />
         <div className={"home_container"}>
            <TrendingCards
               skins={knives}
               title="Top Knives"
               subtitle="Hand-picked rare blades · updated daily"
               showViewMore={true}
               viewMoreLink="/store/knife"
               autoPlay={true}
               pageSize={5}
               autoPlaySpeed={2000}
               loading={showInitialSkeleton}
               mobileSize={1}
            />
            <TrendingCards
               title="Top Snipers"
               subtitle="Best AWP & scout skins · live pricing"
               skins={
                  screenSize === "large"
                     ? snipers.slice(2, 6)
                     : screenSize === "desktop"
                       ? snipers.slice(2, 5)
                       : snipers
               }
               columns="1fr 1.5fr 1.5fr 1fr"
               showViewMore={true}
               viewMoreLink="/store/sniper"
               img_height="200px"
               loading={showInitialSkeleton}
               autoPlay={screenSize !== "desktop"}
               autoPlaySpeed={10000}
            />
            <TrendingCards
               skins={ak47}
               title="Top Rifles"
               subtitle="Best AK-47 rifle skins · live pricing"
               showViewMore={true}
               viewMoreLink="/store/rifle"
               autoPlay={true}
               pageSize={4}
               loading={showInitialSkeleton}
            />
            <TrendingCards
               skins={gloves}
               title="Top Gloves"
               subtitle="Rarest glove skins · live pricing"
               showViewMore={true}
               viewMoreLink="/store/gloves"
               autoPlay={true}
               pageSize={4}
               img_height="190px"
               loading={showInitialSkeleton}
            />
         </div>
         <WhyUs />
      </>
   );
};

export default React.memo(Home);
