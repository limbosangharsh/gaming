/* Spinner.jsx */
import s from "./Spinner.module.css";

const Spinner = ({ size = 20, color = "#000000" }) => (
   <div
      className={s.spinner}
      style={{ 
         width: size, 
         height: size, 
         borderColor: `rgba(0, 0, 0, 0.2)`,
         borderTopColor: color 
      }}
   />
);

export default Spinner;
