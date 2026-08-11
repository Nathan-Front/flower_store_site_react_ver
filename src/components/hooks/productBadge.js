export function getProductBadge(condition) {
  switch (condition) {
    case "new":
      return "New";
    case "best":
      return "Best Seller";
    case "limited":
      return "Limited";
    case "sale":
      return "Sale";
    default:
      return "";
  }
}
