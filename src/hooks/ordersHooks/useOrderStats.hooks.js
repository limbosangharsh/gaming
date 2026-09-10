export const useOrdersStats = () => {
   const getOrderedItems = JSON.parse(localStorage.getItem("orders") || "[]");

   const totalSpent = getOrderedItems.reduce(
      (acc, order) => acc + order.total,
      0,
   );

   const totalItems = getOrderedItems.reduce(
      (acc, order) => acc + order.items.length,
      0,
   );

   const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString("en-GB", {
         day: "2-digit",
         month: "2-digit",
         year: "2-digit",
      });

   const totalOrders = getOrderedItems.length;

   return { totalSpent, totalItems, totalOrders, getOrderedItems, formatDate };
};
