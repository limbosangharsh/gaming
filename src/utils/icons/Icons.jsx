import React from "react";

const icons = {
   eye: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
      </svg>
   ),
   eyeOff: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
      </svg>
   ),
   search: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <circle cx="11" cy="11" r="8" />
         <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
   ),
   cart: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <circle cx="9" cy="21" r="1" />
         <circle cx="20" cy="21" r="1" />
         <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
   ),
   heart: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
   ),
   arrow: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <line x1="5" y1="12" x2="19" y2="12" />
         <polyline points="12 5 19 12 12 19" />
      </svg>
   ),
   filter: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
   ),
   close: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <line x1="18" y1="6" x2="6" y2="18" />
         <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
   ),
   check: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <polyline points="20 6 9 17 4 12" />
      </svg>
   ),
   star: (
      <svg viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
      </svg>
   ),
   tag: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
         <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
   ),
   trending: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
         <polyline points="17 6 23 6 23 12" />
      </svg>
   ),
   lightning: (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
   ),
   star: (
      <svg
         fill="currentColor"
         viewBox="0 0 32 32"
         version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         stroke="currentColor"
      >
         <g id="SVGRepo_iconCarrier">
            <path d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path>
         </g>
      </svg>
   ),
   arrowDown: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
      </svg>
   ),
   arrowRange: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M280-280 80-480l200-200 56 56-103 104h494L624-624l56-56 200 200-200 200-56-56 103-104H233l103 104-56 56Z" />
      </svg>
   ),
   dollarIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" />
      </svg>
   ),
   addIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
   ),
   removeIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M200-440v-80h560v80H200Z" />
      </svg>
   ),
   walletIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-117.5-77.5Q700-455 700-480t-17.5-42.5Q665-540 640-540t-42.5 17.5Q580-505 580-480t17.5 42.5Q615-420 640-420t42.5-17.5Z" />
      </svg>
   ),
   creaditCardIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm40-40h400L400-680H200v400Zm320-320h240v-80H520v80ZM160-240v-480 480Z" />
      </svg>
   ),
   cryptoIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M360-120v-80H240v-80h80v-400h-80v-80h120v-80h80v80h80v-80h80v85q52 14 86 56.5t34 98.5q0 29-10 55.5T682-497q35 21 56.5 57t21.5 80q0 66-47 113t-113 47v80h-80v-80h-80v80h-80Zm40-400h160q33 0 56.5-23.5T640-600q0-33-23.5-56.5T560-680H400v160Zm0 240h200q33 0 56.5-23.5T680-360q0-33-23.5-56.5T600-440H400v160Z" />
      </svg>
   ),
   cartIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
      </svg>
   ),
   checkIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
   ),
   exclamationIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
   ),
   userIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" />
      </svg>
   ),
   homeIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
      </svg>
   ),
   storeIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="m40-240 20-80h220l-20 80H40Zm80-160 20-80h260l-20 80H120Zm623 240 20-160 29-240 10-79-59 479ZM240-80q-33 0-56.5-23.5T160-160h583l59-479H692l-11 85q-2 17-15 26.5t-30 7.5q-17-2-26.5-14.5T602-564l9-75H452l-11 84q-2 17-15 27t-30 8q-17-2-27-15t-8-30l9-74H220q4-34 26-57.5t54-23.5h80q8-75 51.5-117.5T550-880q64 0 106.5 47.5T698-720h102q36 1 60 28t19 63l-60 480q-4 30-26.5 49.5T740-80H240Zm220-640h159q1-33-22.5-56.5T540-800q-35 0-55.5 21.5T460-720Z" />
      </svg>
   ),
   contactIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
      </svg>
   ),
   filterIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
      </svg>
   ),
   arrowRightIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M400-280v-400l200 200-200 200Z" />
      </svg>
   ),
   contactUsIcon: (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor"
      >
         <path d="M280-160q-33 0-56.5-23.5T200-240v-370L40-800h760q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H280Zm-68-560 68 80v400h520v-480H212Zm328 460 56-56-44-44h168v-80H360l180 180ZM360-520h360L540-700l-56 56 44 44H360v80Zm146 40Z" />
      </svg>
   ),
   doneIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
   )
};

const Icon = ({ name, size = 16, className = "", style = {}, color }) => {
   const icon = icons[name];
   if (!icon) return null;

   return (
      <span
         className={className}
         style={{
            display: "inline-flex",
            alignItems: "center",
            width: size,
            height: size,
            flexShrink: 0,
            color: color,
            ...style,
         }}
      >
         {icon}
      </span>
   );
};

export default Icon;
