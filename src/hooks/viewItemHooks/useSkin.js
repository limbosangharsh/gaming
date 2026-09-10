// utils/hooks/useSkin.js
import { allSkins } from "../../utils/constants/Constants";
const useSkin = (id) => {
   const skin = allSkins.find((item) => item.id === id);
   const similarSkins = skin
      ? allSkins
           .filter((s) => s.category === skin.category && s.id !== skin.id)
           .slice(0, 4)
      : [];
   return { skin, similarSkins };
};

export default useSkin;
