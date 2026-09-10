import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = ({
  count = 4,
  img_height = "150px",
  showPrice = true,
}) => {
  return Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      style={{
        padding: "12px",
        border: "1px solid #FFFFFF14",
        borderRadius: "4px",
      }}
    >
      <Skeleton
        height={14}
        width={80}
        baseColor="#111111"
        highlightColor="#2a2a2a"
      />
      <Skeleton
        height={10}
        width={50}
        baseColor="#111111"
        highlightColor="#2a2a2a"
        style={{ marginTop: "6px" }}
      />
      <Skeleton
        height={img_height}
        baseColor="#111111"
        highlightColor="#2a2a2a"
        style={{ marginBlock: "8px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton
          height={16}
          width={30}
          baseColor="#111111"
          highlightColor="#2a2a2a"
        />
        <Skeleton
          height={12}
          width={80}
          baseColor="#111111"
          highlightColor="#2a2a2a"
        />
      </div>
      {showPrice && (
        <Skeleton
          height={18}
          width={60}
          baseColor="#111111"
          highlightColor="#2a2a2a"
          style={{ marginTop: "8px" }}
        />
      )}
    </div>
  ));
};

export default CardSkeleton;
