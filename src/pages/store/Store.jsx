import React, { useEffect, useState } from "react";
import s from "./Store.module.css";
import { useParams } from "react-router-dom";
import { allSkins, filters } from "../../utils/constants/Constants";
import TrendingCard from "../../components/TrendingCards/TrendingCards";
import Icon from "../../utils/icons/Icons";

const Store = () => {
  const { category } = useParams();

  const [activeCategories, setActiveCategories] = useState(
    category ? [category] : [],
  );
  const [activeConditions, setActiveConditions] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showCategories, setShowCategories] = useState(true);
  const [minFocused, setMinFocused] = useState(false);
  const [showPrice, setShowPrice] = useState(true);
  const [showConditions, setShowConditions] = useState(true);

  const toggleCategory = (id) => {
    if (id === "all") {
      setActiveCategories([]);
      return;
    }
    const isAlreadySelected = activeCategories.includes(id);
    if (isAlreadySelected) {
      setActiveCategories(activeCategories.filter((c) => c !== id));
    } else {
      setActiveCategories([...activeCategories, id]);
    }
  };

  const toggleCondition = (id) => {
    const isAlreadySelected = activeConditions.includes(id);
    if (isAlreadySelected) {
      setActiveConditions(activeConditions.filter((c) => c !== id));
    } else {
      setActiveConditions([...activeConditions, id]);
    }
  };

  const filtered = allSkins.filter((skin) => {
    if (
      activeCategories.length > 0 &&
      !activeCategories.includes(skin.category)
    )
      return false;
    if (
      activeConditions.length > 0 &&
      !activeConditions.includes(skin.condition)
    )
      return false;
    if (skin.price < priceRange.min || skin.price > priceRange.max)
      return false;
    return true;
  });

  const handleResetFilter = () => {
    setActiveCategories([]);
    setActiveConditions([]);
    setPriceRange({ min: 0, max: 1000 });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategories, activeConditions, priceRange]);

  return (
    <div className={s.page}>
      <div className={s.sidebar}>
        <h3 className={s.sidebar_title}>Filters</h3>

        {/* CATEGORY */}
        <div className={s.filter_group}>
          <div className={s.filter_header}>
            <h4 className={s.filter_label}>Category</h4>
            <span
              onClick={() => setShowCategories(!showCategories)}
              className={s.filter_span}
            >
              <Icon
                name={"arrowDown"}
                className={`${s.arrowDown} ${!showCategories ? s.arrowUp : ""}`}
                color={"#737373"}
                size={16}
              />
            </span>
          </div>
          <div
            className={`${s.filter_content} ${showCategories ? s.filter_open : ""}`}
          >
            {filters.categories.map((cat) => (
              <div key={cat.id} className={s.filter_item}>
                <input
                  type="checkbox"
                  className={s.checkbox}
                  id={cat.id}
                  checked={
                    cat.id === "all"
                      ? activeCategories.length === 0
                      : activeCategories.includes(cat.id)
                  }
                  onChange={() => toggleCategory(cat.id)}
                />
                <label
                  htmlFor={cat.id}
                  className={`${s.checkbox_label} ${
                    cat.id === "all"
                      ? activeCategories.length === 0
                        ? s.label_active
                        : ""
                      : activeCategories.includes(cat.id)
                        ? s.label_active
                        : ""
                  }`}
                >
                  {cat.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* PRICE RANGE */}
        <div className={s.filter_group}>
          <div className={s.filter_header}>
            <h4 className={s.filter_label}>Price Range</h4>
            <span
              onClick={() => setShowPrice(!showPrice)}
              className={s.filter_span}
            >
              <Icon
                name={"arrowDown"}
                className={`${s.arrowDown} ${!showPrice ? s.arrowUp : ""}`}
                color={"#737373"}
                size={16}
              />
            </span>
          </div>
          <div
            className={`${s.filter_content} ${showPrice ? s.filter_open : ""}`}
          >
            <div className={s.price_range}>
              <div className={s.price_inputs}>
                <div className={s.price_input_wrap}>
                  <span className={s.price_symbol}>
           <Icon name={"dollarIcon"} color={priceRange.min > 0 ? "#ffffff" : "#737373"} />
                  </span>{" "}
                  <input
                    type="number"
                    className={s.price_input}
                    placeholder="0"
                    min="0"
                    max="1000"
                    value={priceRange.min === 0 ? "" : priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value) || 0,
                      })
                    }
                    onFocus={() => setMinFocused(true)}
                    onBlur={() => setMinFocused(false)}
                  />
                </div>
                <span className={s.price_separator}>
                  <Icon name={"arrowRange"} size={16} color={"#737373"} />
                </span>
                <div className={s.price_input_wrap}>
                  <span className={s.price_symbol}>
                    <Icon name={"dollarIcon"} color={"#ffffff"} />
                  </span>
                  <input
                    type="number"
                    className={s.price_input}
                    placeholder="1000"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value) || 1000,
                      })
                    }
                  />
                </div>
              </div>

              {/* ══ DUAL RANGE ══ */}
              <div
                className={s.range_wrap}
                style={{
                  "--min": `${(priceRange.min / 1000) * 100}%`,
                  "--max": `${(priceRange.max / 1000) * 100}%`,
                }}
              >
                <div className={s.range_track} />
                <input
                  type="range"
                  className={s.range_slider}
                  min="0"
                  max="1000"
                  value={priceRange.min}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val < priceRange.max) {
                      setPriceRange({ ...priceRange, min: val });
                    }
                  }}
                />
                <input
                  type="range"
                  className={s.range_slider}
                  min="0"
                  max="1000"
                  value={priceRange.max}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > priceRange.min) {
                      setPriceRange({ ...priceRange, max: val });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CONDITION */}
        <div className={s.filter_group}>
          <div className={s.filter_header}>
            <h4 className={s.filter_label}>Condition</h4>
            <span
              onClick={() => setShowConditions(!showConditions)}
              className={s.filter_span}
            >
              <Icon
                name={"arrowDown"}
                className={`${s.arrowDown} ${!showConditions ? s.arrowUp : ""}`}
                color={"#737373"}
                size={16}
              />
            </span>
          </div>
          <div
            className={`${s.filter_content} ${showConditions ? s.filter_open : ""}`}
          >
            {filters.conditions.map((c) => (
              <div key={c.id} className={s.filter_item}>
                <input
                  type="checkbox"
                  className={s.checkbox}
                  id={c.id}
                  checked={activeConditions.includes(c.id)}
                  onChange={() => toggleCondition(c.id)}
                />
                <label
                  htmlFor={c.id}
                  className={`${s.checkbox_label} ${activeConditions.includes(c.id) ? s.label_active : ""}`}
                >
                  {c.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button className={s.reset_btn} onClick={handleResetFilter}>
          Reset Filters
        </button>
      </div>

      <div className={s.main}>
        <div className={s.space_top}></div>
        <TrendingCard skins={filtered} columns="repeat(4, 1fr)" pageSize={filtered.length} cardContainerClass={s.store_card_container}/>
      </div>
    </div>
  );
};

export default Store;
